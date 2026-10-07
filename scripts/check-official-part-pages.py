"""Read exact JLCPCB product pages and their official read-only detail API.

Parse Next.js Flight JSON without executing page scripts. Derive the internal
LCSC ID from the exact SKU, then assert that the detail response has that SKU.
Original responses stay private because they contain expiring signed asset URLs.
Public evidence contains only supplier identity, stock, assembly and price fields.
"""
import concurrent.futures
import hashlib
import json
import re
import sys
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

FIELDS = [
    'componentCode', 'lcscComponentId', 'componentModelEn', 'componentBrandEn',
    'componentSpecificationEn', 'componentLibraryType', 'componentSource',
    'stockCount', 'overseasStockCount', 'canPresaleNumber', 'assemblyMode',
    'assemblyModeBatch', 'assemblyProcess', 'componentProductType',
    'assemblyComponentFlag', 'leastPatchNumber', 'minPurchaseNum', 'lossNumber',
    'fixtureFlag', 'xrayFlag', 'specialComponentFee', 'componentStatus',
    'isBuyComponent', 'noBuyReason', 'preferredComponentFlag',
]


def collect_exact_objects(candidate, part):
    if isinstance(candidate, dict):
        exact = [candidate] if candidate.get('componentCode') == part else []
        return exact + [row for child in candidate.values() for row in collect_exact_objects(child, part)]
    if isinstance(candidate, list):
        return [row for child in candidate for row in collect_exact_objects(child, part)]
    return []


def find_official_id(html, part):
    chunks = []
    for match in re.finditer(r'self\.__next_f\.push\((\[.*?\])\)</script>', html):
        chunk = json.loads(match.group(1))
        if len(chunk) > 1 and chunk[0] == 1 and isinstance(chunk[1], str):
            chunks.append(chunk[1])
    exact_objects = []
    for row in ''.join(chunks).splitlines():
        _, _, body = row.partition(':')
        # Flight also contains typed non-JSON module/string rows. Only complete
        # JSON objects/lists can supply a manufacturer SKU/internal ID.
        if not body.startswith(('{', '[')):
            continue
        try:
            parsed = json.loads(body)
        except json.JSONDecodeError:
            continue
        exact_objects.extend(collect_exact_objects(parsed, part))
    ids = {row['lcscComponentId'] for row in exact_objects if isinstance(row.get('lcscComponentId'), int)}
    if len(ids) != 1:
        raise ValueError(f'{part}: no unique internal ID in exact official page objects')
    return ids.pop()


def fetch_url(url):
    with urllib.request.urlopen(url, timeout=35) as response:
        if response.status != 200:
            raise ValueError(f'HTTP {response.status}')
        return response.read()


def check_part(request, context):
    part, slug = request
    page_url = 'https://jlcpcb.com/partdetail/' + urllib.parse.quote(slug, safe='/')
    try:
        html_bytes = fetch_url(page_url)
        (context / f'{part}-page.html').write_bytes(html_bytes)
        offers = []
        for match in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', html_bytes.decode()):
            product = json.loads(match.group(1))
            if product.get('@type') == 'Product' and product.get('sku') == part:
                offers.append(product['offers'])
        if len(offers) != 1 or offers[0].get('priceCurrency') != 'USD':
            raise ValueError('No unique exact-SKU USD product offer')
        official_id = find_official_id(html_bytes.decode(), part)
        detail_url = 'https://jlcpcb.com/api/overseas-pcb-order/v1/shoppingCart/smtGood/getComponentDetail?' + urllib.parse.urlencode({'componentLcscId': official_id})
        detail_bytes = fetch_url(detail_url)
        (context / f'{part}-detail.json').write_bytes(detail_bytes)
        response = json.loads(detail_bytes)
        if response.get('code') != 200:
            raise ValueError('Official detail application code ' + str(response.get('code')))
        detail = response['data']
        if detail.get('componentCode') != part or detail.get('lcscComponentId') != official_id:
            raise ValueError('Official detail SKU/internal ID mismatch')
        prices = {}
        for field in ['prices', 'buyPrices', 'jlcPrices']:
            price_rows = detail.get(field)
            if price_rows is not None:
                if not isinstance(price_rows, list):
                    raise ValueError('Unexpected price schema: ' + field)
                prices[field] = [{key: row[key] for key in ['componentCode', 'startNumber', 'endNumber', 'productPrice'] if key in row} for row in price_rows]
        return {
            'part': part, 'checked_at_utc': datetime.now(timezone.utc).isoformat(),
            'page_url': page_url, 'detail_url': detail_url,
            'page_sha256': hashlib.sha256(html_bytes).hexdigest(),
            'detail_sha256': hashlib.sha256(detail_bytes).hexdigest(),
            'price_currency': offers[0]['priceCurrency'],
            'exact_match': {key: detail[key] for key in FIELDS if key in detail},
            **prices,
        }
    except (ValueError, KeyError, OSError) as error:
        return {'part': part, 'page_url': page_url, 'error': str(error)}


def main():
    if len(sys.argv) != 4:
        raise SystemExit('Supply slug manifest, private response directory and new evidence output')
    requests = json.loads(Path(sys.argv[1]).read_text())
    private_directory = Path(sys.argv[2])
    output_path = Path(sys.argv[3])
    if output_path.exists() or private_directory.exists():
        raise ValueError('Use new output paths; preserve earlier checks')
    private_directory.mkdir(parents=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
        records = list(executor.map(lambda request: check_part(request, private_directory), sorted(requests.items())))
    errors = [row for row in records if row.get('error')]
    absent = [row['part'] for row in records if not row.get('error') and row['exact_match'].get('stockCount', 0) <= 0]
    report = {
        'checked_at_utc': datetime.now(timezone.utc).isoformat(),
        'source': 'Official JLCPCB product-page exact SKU/internal ID and frontend read-only GET detail API',
        'scope': 'Public supplier stock and assembly product modes; no stock reservation, customer assembly allocation, fabrication quote or order',
        'price_currency': 'USD; independently checked in every exact-SKU product structured offer',
        'part_count': len(records), 'records': records, 'errors': errors,
        'parts_without_stock': absent, 'order_allocation_confirmed': False,
        'passed': not errors and not absent,
    }
    output_path.write_text(json.dumps(report, indent=2)+'\n')
    print(json.dumps({'part_count': len(records), 'errors': len(errors), 'parts_without_stock': absent}))
    if errors or absent:
        raise SystemExit(1)


if __name__ == '__main__':
    main()

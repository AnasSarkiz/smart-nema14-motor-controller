export interface NativeRoutingLink {
  from: string
  to: string
}

/** Explicit pending trunks, without assigning every contact on their net to
 * the selected phase. The native router and all-net checks retain ownership
 * of routing and physical completion. Enabled only by bounded Cloud helpers.
 */
export function NativeRoutingLinks({ links }: { links: NativeRoutingLink[] }) {
  return (
    <>
      {links.map((link, index) => (
        <trace
          key={`${link.from}:${link.to}`}
          name={`SELECTED_SIGNAL_LINK_${index}`}
          from={link.from}
          to={link.to}
          thickness="0.15mm"
          routingPhaseIndex={1}
        />
      ))}
    </>
  )
}

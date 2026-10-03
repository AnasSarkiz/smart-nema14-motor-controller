/** Reserve L2 copper beneath the manually placed L1 USB pair.
 * The remaining L2 area is filled after routing. These regions prohibit
 * signal-via antipads under the pair; actual continuity still requires review.
 */
export function UsbReference() {
  const regions = [
    {
      name: "USB_CONTACT_REFERENCE",
      left: -1.6,
      right: 2.15,
      bottom: -10.65,
      top: -9.1,
    },
    {
      name: "USB_CONNECTOR_REFERENCE",
      left: 0.4,
      right: 1.55,
      bottom: -9.15,
      top: -6.3,
    },
    {
      name: "USB_ESD_REFERENCE",
      left: 1.4,
      right: 4.2,
      bottom: -7.75,
      top: -6.25,
    },
    {
      name: "USB_PAIR_REFERENCE",
      left: 2.12,
      right: 3.23,
      bottom: -6.45,
      top: 6.35,
    },
    {
      name: "USB_MCU_REFERENCE",
      left: 2.12,
      right: 7.65,
      bottom: 5.15,
      top: 7.78,
    },
  ]
  return regions.map(({ name, left, right, bottom, top }) => (
    <copperpour
      name={name}
      layer="inner1"
      connectsTo="net.GND"
      unbroken
      outline={[
        { x: left - 0.15, y: bottom - 0.15 },
        { x: right + 0.15, y: bottom - 0.15 },
        { x: right + 0.15, y: top + 0.15 },
        { x: left - 0.15, y: top + 0.15 },
      ]}
      clearance="0.15mm"
      useThermalReliefs={false}
    />
  ))
}

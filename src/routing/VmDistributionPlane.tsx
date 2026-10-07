/** Qualified native VM distribution copper; loaded current/thermal review pending. */
export function VmDistributionPlane() {
  return (
    <>
      <via
        name="GND_STITCH_VM_BULK_RETURN"
        pcbX={-5.25}
        pcbY={8}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.45mm"
        connectsTo="net.GND"
      />
      <copperpour
        name="L3_VM_DISTRIBUTION"
        layer="inner2"
        connectsTo="net.VM"
        clearance="0.155mm"
        boardEdgeMargin="0.3mm"
        cutoutMargin="0.31mm"
        useThermalReliefs={false}
      />
    </>
  )
}

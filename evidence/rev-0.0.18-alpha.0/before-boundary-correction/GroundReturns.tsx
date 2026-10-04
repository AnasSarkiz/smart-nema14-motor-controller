import { Fragment } from "react"
/** Native filled returns and reviewed through-stitches; routing prototype. */
export function GroundReturns() {
  return (
    <>
      <copperpour
        name="EFUSE_RTN_CONTROL_ISLAND"
        layer="bottom"
        connectsTo="net.EFUSE_RTN"
        clearance="0.155mm"
        useThermalReliefs={false}
        outline={[
          { x: -7.5, y: -13 },
          { x: 1.0, y: -13 },
          { x: 1.0, y: -4.3 },
          { x: -2.8, y: -4.3 },
          { x: -2.8, y: -0.7 },
          { x: -7.5, y: -0.7 },
        ]}
      />
      <copperpour
        name="TOP_GND_RETURN"
        layer="top"
        connectsTo="net.GND"
        clearance="0.155mm"
        boardEdgeMargin="0.3mm"
        cutoutMargin="0.3mm"
        useThermalReliefs={false}
      />
      {[
        ["LEFT", -17.2, -7.8, -17.2, 17.2],
        ["RIGHT", 1.3, 17.2, -17.2, 17.2],
        ["UPPER", -7.8, 1.3, -0.4, 17.2],
        ["LOWER", -7.8, 1.3, -17.2, -13.3],
      ].map(([name, left, right, bottom, top]) => (
        <Fragment key={name}>
          <copperpour
            name={`BOTTOM_GND_${name}`}
            layer="bottom"
            connectsTo="net.GND"
            clearance="0.155mm"
            boardEdgeMargin="0.3mm"
            cutoutMargin="0.3mm"
            useThermalReliefs={false}
            outline={[
              { x: Number(left), y: Number(bottom) },
              { x: Number(right), y: Number(bottom) },
              { x: Number(right), y: Number(top) },
              { x: Number(left), y: Number(top) },
            ]}
          />
        </Fragment>
      ))}
      <via
        name="GND_STITCH_NORTH"
        pcbX={2}
        pcbY={10.1}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <via
        name="GND_STITCH_MCU"
        pcbX={7}
        pcbY={7.7}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <copperpour
        name="BULK_CAPACITOR_GND"
        layer="bottom"
        connectsTo="net.GND"
        clearance="0.155mm"
        useThermalReliefs={false}
        outline={[
          { x: -1.3, y: -11.8 },
          { x: 1.3, y: -11.8 },
          { x: 1.3, y: -10.75 },
          { x: -1.3, y: -10.75 },
        ]}
      />
      <via
        name="GND_STITCH_BULK"
        pcbX={0}
        pcbY={-11.4}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <via
        name="GND_STITCH_TVS"
        pcbX={-7.2}
        pcbY={-14.5}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <via
        name="GND_STITCH_BUCK"
        pcbX={-12}
        pcbY={14}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <via
        name="GND_STITCH_INTERFACE"
        pcbX={-9.5}
        pcbY={7}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <trace
        name="U9_GROUND_ESCAPE"
        from=".GND_STITCH_INTERFACE > .bottom"
        to=".U9 > .pin2"
        thickness="0.15mm"
        pcbPathRelativeTo=".GND_STITCH_INTERFACE > .bottom"
        pcbPath={[
          { x: 1.25, y: -1.000127 },
          { x: 1.7500142, y: -1.000127 },
        ]}
      />
      <via
        name="GND_STITCH_EFUSE"
        pcbX={-4}
        pcbY={-5}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <trace
        name="EFUSE_GROUND_ESCAPE"
        from=".GND_STITCH_EFUSE > .bottom"
        to=".U10 > .pin17"
        thickness="0.15mm"
        pcbPathRelativeTo=".GND_STITCH_EFUSE > .bottom"
        pcbPath={[{ x: 0, y: -0.84246 }]}
      />
      <copperpour
        name="ENCODER_DNP_GND_REGION"
        layer="bottom"
        connectsTo="net.GND"
        clearance="0.155mm"
        useThermalReliefs={false}
        outline={[
          { x: -2.8, y: -3.9 },
          { x: -0.6, y: -3.9 },
          { x: -0.6, y: 0.2 },
          { x: -2.8, y: 0.2 },
        ]}
      />
      <trace
        name="INTERFACE_MODE_GROUND_ESCAPE"
        from=".R46 > .pin2"
        to="net.GND"
        thickness="0.15mm"
        pcbPathRelativeTo=".R46 > .pin2"
        pcbPath={[{ x: -1.2, y: 0 }]}
      />
      <via
        name="GND_STITCH_ENCODER"
        pcbX={-1}
        pcbY={-1}
        fromLayer="top"
        toLayer="bottom"
        tented
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
    </>
  )
}

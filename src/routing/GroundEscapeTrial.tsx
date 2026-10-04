/** Manual ground escape from the MCU's unused PA10 pad; prototype trial. */
export function GroundEscapeTrial() {
  return (
    <>
      <via
        name="GND_PA10_ESCAPE"
        pcbX={7.0}
        pcbY={7.7}
        fromLayer="top"
        toLayer="bottom"
        holeDiameter="0.30mm"
        outerDiameter="0.60mm"
        connectsTo="net.GND"
      />
      <trace
        name="PA10_GROUND_ESCAPE"
        from=".GND_PA10_ESCAPE > .top"
        to=".U1 > .pin32"
        thickness="0.15mm"
        pcbPathRelativeTo=".GND_PA10_ESCAPE > .top"
        pcbPath={[
          { x: 0, y: -0.3 },
          { x: 0.749938, y: -0.3 },
          { x: 0.749938, y: -2.150072 },
        ]}
      />
    </>
  )
}

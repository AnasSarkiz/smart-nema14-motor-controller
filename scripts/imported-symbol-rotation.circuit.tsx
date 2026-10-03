import { ESDA25P35_1U1M } from "../imports/ESDA25P35_1U1M/ESDA25P35_1U1M"
/** Reproducer uses the official definition unchanged. */
export default function ImportedSymbolRotation() {
  return (
    <board
      width="25mm"
      height="15mm"
      routingDisabled
      schLayout={{ layoutMode: "none" }}
    >
      <net name="VBUS" isPowerNet />
      <net name="GND" isGroundNet />
      <schematicsheet name="ImportedSymbolRotation" sheetSize="A4">
        <ESDA25P35_1U1M
          name="D_ZERO"
          schX={-5}
          schY={0}
          pcbX={-5}
          pcbY={0}
          schRotation={0}
          connections={{ pin1: "net.VBUS", pin2: "net.GND" }}
        />
        <ESDA25P35_1U1M
          name="D_ROTATED"
          schX={5}
          schY={0}
          pcbX={5}
          pcbY={0}
          schRotation={270}
          connections={{ pin1: "net.VBUS", pin2: "net.GND" }}
        />
      </schematicsheet>
    </board>
  )
}

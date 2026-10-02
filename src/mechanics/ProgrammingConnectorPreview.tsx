import { StandardJstSwdResetSide } from "@tsci/tscircuit.standard-jst-programmer"

/** Envelope only: VOUT power integration still gates functional instantiation. */
export function ProgrammingConnectorPreview() {
  return (
    <schematicsheet name="MechanicalConnector" sheetSize="A4" sheetIndex={7}>
      <StandardJstSwdResetSide
        name="J_SWD_ENVELOPE"
        pcbX={14.4}
        pcbY={-12.8}
        pcbRotation={90}
        schX={0}
        schY={0}
        noConnect={["VOUT", "SWDIO", "GND", "SWCLK", "NRST"]}
      />
      <schematictext
        text="MECHANICAL FIXTURE ONLY: official C136657; programmer power integration unqualified."
        schX={0}
        schY={-4}
        fontSize={0.2}
      />
    </schematicsheet>
  )
}

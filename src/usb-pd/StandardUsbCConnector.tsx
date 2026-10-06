import type { ReactElement } from "react"
import { USB4110_GF_A } from "../../imports/USB4110_GF_A/USB4110_GF_A"

type ImportedUsbProps = Parameters<typeof USB4110_GF_A>[0]

/** Native USB-C schematic with the exact official supplier footprint and pins. */
export function StandardUsbCConnector(props: ImportedUsbProps) {
  const importedConnector: ReactElement<ImportedUsbProps> = USB4110_GF_A(props)
  return (
    <connector
      {...importedConnector.props}
      standard="usb_c"
      schWidth={1.7}
      // The official import calls D- DN1/DN2; the standard calls them DM1/DM2.
      // Keep the purchased pin aliases and explicitly include both D- terminals.
      schPinArrangement={{
        rightSide: [
          "VBUS1",
          "VBUS2",
          "CC1",
          "CC2",
          "DP1",
          "DP2",
          "DN1",
          "DN2",
          "SBU1",
          "SBU2",
          "GND1",
          "GND2",
          "SHELL1",
          "SHELL2",
          "SHELL3",
          "SHELL4",
        ],
      }}
    />
  )
}

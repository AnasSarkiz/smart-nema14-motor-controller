import { USB4110_GF_A } from "../imports/USB4110_GF_A/USB4110_GF_A"
import { STL11N3LLH6 } from "../imports/STL11N3LLH6/STL11N3LLH6"
import { TPD2EUSB30ADRTR } from "../imports/TPD2EUSB30ADRTR/TPD2EUSB30ADRTR"
import { ESDA25P35_1U1M } from "../imports/ESDA25P35_1U1M/ESDA25P35_1U1M"
import { TCC0402COG331J500AT } from "../imports/TCC0402COG331J500AT/TCC0402COG331J500AT"
import { RT0402BRD07100KL } from "../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { RT0402BRD076K04L } from "../imports/RT0402BRD076K04L/RT0402BRD076K04L"
import { UMK107BBJ225KA_T } from "../imports/UMK107BBJ225KA_T/UMK107BBJ225KA_T"

// Isolated supplier geometry only; these coordinates are not motor-board placement.
export default function UsbImportAudit() {
  return (
    <board
      width="80mm"
      height="30mm"
      layers={4}
      routingDisabled
      schLayout={{ layoutMode: "none" }}
    >
      <net name="AUDIT_DRAIN" />
      <net name="AUDIT_SOURCE" />
      <schematicsheet name="UsbImportAudit" sheetSize="A4">
        <USB4110_GF_A
          name="J_USB"
          pcbX={-28}
          pcbY={-9.4}
          schX={-14.0}
          schY={0}
        />
        <STL11N3LLH6
          name="Q_PD"
          connections={{
            D1: "net.AUDIT_DRAIN",
            D2: "net.AUDIT_DRAIN",
            D3: "net.AUDIT_DRAIN",
            D4: "net.AUDIT_DRAIN",
            D5: "net.AUDIT_DRAIN",
            S1: "net.AUDIT_SOURCE",
            S2: "net.AUDIT_SOURCE",
            S3: "net.AUDIT_SOURCE",
          }}
          pcbX={-14}
          pcbY={0}
          schX={-7.0}
          schY={0}
        />
        <TPD2EUSB30ADRTR name="D_USB" pcbX={-4} pcbY={0} schX={-2.0} schY={0} />
        <ESDA25P35_1U1M name="D_VBUS" pcbX={4} pcbY={0} schX={2.0} schY={0} />
        <TCC0402COG331J500AT
          name="C_CC"
          pcbX={12}
          pcbY={0}
          schX={6.0}
          schY={0}
        />
        <RT0402BRD07100KL
          name="R_TOP"
          pcbX={20}
          pcbY={0}
          schX={10.0}
          schY={0}
        />
        <RT0402BRD076K04L
          name="R_BOTTOM"
          pcbX={28}
          pcbY={0}
          schX={14.0}
          schY={0}
        />
        <UMK107BBJ225KA_T
          name="C_INPUT"
          pcbX={12}
          pcbY={8}
          schX={6.0}
          schY={8}
        />
      </schematicsheet>
    </board>
  )
}

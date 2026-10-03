// Isolated official-import audit fixture; these are not production coordinates.
import { TCPP01_M12 } from "../imports/TCPP01_M12/TCPP01_M12"
import { A_0402WGF1001TCE } from "../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { SM712_TCT } from "../imports/SM712_TCT/SM712_TCT"
import { SN65HVD230DR } from "../imports/SN65HVD230DR/SN65HVD230DR"
import { CL31A106KBHNNNE } from "../imports/CL31A106KBHNNNE/CL31A106KBHNNNE"
import { TPD4E05U06DQAR } from "../imports/TPD4E05U06DQAR/TPD4E05U06DQAR"
import { CC0603KRX7R9BB104 } from "../imports/CC0603KRX7R9BB104/CC0603KRX7R9BB104"
import { CL05B104KO5NNNC } from "../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { SM10B_SRSS_TB_LF__SN_ } from "../imports/SM10B_SRSS_TB_LF__SN_/SM10B_SRSS_TB_LF__SN_"
import { A_0402WGF0000TCE } from "../imports/A_0402WGF0000TCE/A_0402WGF0000TCE"
import { EEEFPV101XAP } from "../imports/EEEFPV101XAP/EEEFPV101XAP"
import { ESDA25P35_1U1M } from "../imports/ESDA25P35_1U1M/ESDA25P35_1U1M"
import { SRN6028C_3R9M } from "../imports/SRN6028C_3R9M/SRN6028C_3R9M"
import { CL05A475MP5NRNC } from "../imports/CL05A475MP5NRNC/CL05A475MP5NRNC"
import { A_0402WGF1000TCE } from "../imports/A_0402WGF1000TCE/A_0402WGF1000TCE"
import { A_0402WGF1200TCE } from "../imports/A_0402WGF1200TCE/A_0402WGF1200TCE"
import { A_0402WGF1002TCE } from "../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { A_0402WGF2203TCE } from "../imports/A_0402WGF2203TCE/A_0402WGF2203TCE"
import { A_0402WGF4702TCE } from "../imports/A_0402WGF4702TCE/A_0402WGF4702TCE"
import { A_0402WGF4701TCE } from "../imports/A_0402WGF4701TCE/A_0402WGF4701TCE"
import { SM04B_GHS_TB_LF__SN_ } from "../imports/SM04B_GHS_TB_LF__SN_/SM04B_GHS_TB_LF__SN_"
import { TMUX1511RSVR } from "../imports/TMUX1511RSVR/TMUX1511RSVR"
import { UMK107BBJ225KA_T } from "../imports/UMK107BBJ225KA_T/UMK107BBJ225KA_T"
import { STM32G0B1CBT6 } from "../imports/STM32G0B1CBT6/STM32G0B1CBT6"
import { TMP112AIDRLR } from "../imports/TMP112AIDRLR/TMP112AIDRLR"
import { STL11N3LLH6 } from "../imports/STL11N3LLH6/STL11N3LLH6"
import { CL05B223KB5VPNC } from "../imports/CL05B223KB5VPNC/CL05B223KB5VPNC"
import { TPS259470LRPWR } from "../imports/TPS259470LRPWR/TPS259470LRPWR"
import { A_0402WGF6651TCE } from "../imports/A_0402WGF6651TCE/A_0402WGF6651TCE"
import { CL21A226MAQNNNE } from "../imports/CL21A226MAQNNNE/CL21A226MAQNNNE"
import { TMC2209_LA } from "../imports/TMC2209_LA/TMC2209_LA"
import { HoLRT1206_1W_180mR_1_ } from "../imports/HoLRT1206_1W_180mR_1_/HoLRT1206_1W_180mR_1_"
import { USB4110_GF_A } from "../imports/USB4110_GF_A/USB4110_GF_A"
import { TLV803EA30DBZR } from "../imports/TLV803EA30DBZR/TLV803EA30DBZR"
import { RT1206BRD071RL } from "../imports/RT1206BRD071RL/RT1206BRD071RL"
import { TCC0402COG331J500AT } from "../imports/TCC0402COG331J500AT/TCC0402COG331J500AT"
import { AP63203WU_7 } from "../imports/AP63203WU_7/AP63203WU_7"
import { AS5600_ASOM } from "../imports/AS5600_ASOM/AS5600_ASOM"
import { BSS138LT1G } from "../imports/BSS138LT1G/BSS138LT1G"
import { RT0402BRD07100KL } from "../imports/RT0402BRD07100KL/RT0402BRD07100KL"
import { RT0402BRD076K04L } from "../imports/RT0402BRD076K04L/RT0402BRD076K04L"
import { TPD2EUSB30ADRTR } from "../imports/TPD2EUSB30ADRTR/TPD2EUSB30ADRTR"
import { XL_1608SYGC_06 } from "../imports/XL_1608SYGC_06/XL_1608SYGC_06"
import { CL21A475KBQNNNE } from "../imports/CL21A475KBQNNNE/CL21A475KBQNNNE"

export default function AllImportsAudit() {
  return (
    <board
      width="210mm"
      height="170mm"
      layers={4}
      routingDisabled
      schLayout={{ layoutMode: "none" }}
    >
      <net name="GND" isGroundNet />
      <net name="V3V3" isPowerNet />
      <net name="AUDIT_DRAIN" />
      <net name="AUDIT_SOURCE" />
      <net name="AUDIT_GATE" />
      <TCPP01_M12
        name="AUDIT_C1121848"
        pcbX={-84}
        pcbY={-72}
        schX={-84}
        schY={-72}
      />
      <A_0402WGF1001TCE
        name="AUDIT_C11702"
        pcbX={-56}
        pcbY={-72}
        schX={-56}
        schY={-72}
      />
      <SM712_TCT
        name="AUDIT_C12067"
        pcbX={-28}
        pcbY={-72}
        schX={-28}
        schY={-72}
      />
      <SN65HVD230DR
        name="AUDIT_C12084"
        pcbX={0}
        pcbY={-72}
        schX={0}
        schY={-72}
      />
      <CL31A106KBHNNNE
        name="AUDIT_C13585"
        pcbX={28}
        pcbY={-72}
        schX={28}
        schY={-72}
      />
      <TPD4E05U06DQAR
        name="AUDIT_C138714"
        pcbX={56}
        pcbY={-72}
        schX={56}
        schY={-72}
      />
      <CC0603KRX7R9BB104
        name="AUDIT_C14663"
        pcbX={84}
        pcbY={-72}
        schX={84}
        schY={-72}
      />
      <CL05B104KO5NNNC
        name="AUDIT_C1525"
        pcbX={-84}
        pcbY={-48}
        schX={-84}
        schY={-48}
      />
      <SM10B_SRSS_TB_LF__SN_
        name="AUDIT_C160409"
        pcbX={-56}
        pcbY={-48}
        schX={-56}
        schY={-48}
      />
      <A_0402WGF0000TCE
        name="AUDIT_C17168"
        pcbX={-28}
        pcbY={-48}
        schX={-28}
        schY={-48}
      />
      <EEEFPV101XAP
        name="AUDIT_C178585"
        pcbX={0}
        pcbY={-48}
        schX={0}
        schY={-48}
      />
      <ESDA25P35_1U1M
        name="AUDIT_C1974707"
        pcbX={28}
        pcbY={-48}
        schX={28}
        schY={-48}
      />
      <SRN6028C_3R9M
        name="AUDIT_C19947652"
        pcbX={56}
        pcbY={-48}
        schX={56}
        schY={-48}
      />
      <CL05A475MP5NRNC
        name="AUDIT_C23733"
        pcbX={84}
        pcbY={-48}
        schX={84}
        schY={-48}
      />
      <A_0402WGF1000TCE
        name="AUDIT_C25076"
        pcbX={-84}
        pcbY={-24}
        schX={-84}
        schY={-24}
      />
      <A_0402WGF1200TCE
        name="AUDIT_C25079"
        pcbX={-56}
        pcbY={-24}
        schX={-56}
        schY={-24}
      />
      <A_0402WGF1002TCE
        name="AUDIT_C25744"
        pcbX={-28}
        pcbY={-24}
        schX={-28}
        schY={-24}
      />
      <A_0402WGF2203TCE
        name="AUDIT_C25767"
        pcbX={0}
        pcbY={-24}
        schX={0}
        schY={-24}
      />
      <A_0402WGF4702TCE
        name="AUDIT_C25792"
        pcbX={28}
        pcbY={-24}
        schX={28}
        schY={-24}
      />
      <A_0402WGF4701TCE
        name="AUDIT_C25900"
        pcbX={56}
        pcbY={-24}
        schX={56}
        schY={-24}
      />
      <SM04B_GHS_TB_LF__SN_
        name="AUDIT_C189895"
        pcbX={84}
        pcbY={-24}
        schX={84}
        schY={-24}
      />
      <TMUX1511RSVR
        name="AUDIT_C2673275"
        pcbX={-84}
        pcbY={0}
        schX={-84}
        schY={0}
      />
      <UMK107BBJ225KA_T
        name="AUDIT_C268016"
        pcbX={-56}
        pcbY={0}
        schX={-56}
        schY={0}
      />
      <STM32G0B1CBT6
        name="AUDIT_C2847904"
        connections={{
          VDD: "net.V3V3",
          VREF_POS: "net.V3V3",
          VBAT: "net.V3V3",
          VSS: "net.GND",
        }}
        pcbX={-28}
        pcbY={0}
        schX={-28}
        schY={0}
      />
      <TMP112AIDRLR name="AUDIT_C28927" pcbX={0} pcbY={0} schX={0} schY={0} />
      <STL11N3LLH6
        name="AUDIT_C2965326"
        connections={{
          S1: "net.AUDIT_SOURCE",
          S2: "net.AUDIT_SOURCE",
          S3: "net.AUDIT_SOURCE",
          G: "net.AUDIT_GATE",
          D1: "net.AUDIT_DRAIN",
          D2: "net.AUDIT_DRAIN",
          D3: "net.AUDIT_DRAIN",
          D4: "net.AUDIT_DRAIN",
          D5: "net.AUDIT_DRAIN",
        }}
        pcbX={28}
        pcbY={0}
        schX={28}
        schY={0}
      />
      <CL05B223KB5VPNC
        name="AUDIT_C307335"
        pcbX={56}
        pcbY={0}
        schX={56}
        schY={0}
      />
      <TPS259470LRPWR
        name="AUDIT_C3662793"
        pcbX={84}
        pcbY={0}
        schX={84}
        schY={0}
      />
      <A_0402WGF6651TCE
        name="AUDIT_C45194"
        pcbX={-84}
        pcbY={24}
        schX={-84}
        schY={24}
      />
      <CL21A226MAQNNNE
        name="AUDIT_C45783"
        pcbX={-56}
        pcbY={24}
        schX={-56}
        schY={24}
      />
      <TMC2209_LA
        name="AUDIT_C465949"
        pcbX={-28}
        pcbY={24}
        schX={-28}
        schY={24}
      />
      <HoLRT1206_1W_180mR_1_
        name="AUDIT_C5127775"
        pcbX={0}
        pcbY={24}
        schX={0}
        schY={24}
      />
      <USB4110_GF_A
        name="AUDIT_C5143397"
        pcbX={28}
        pcbY={24}
        schX={28}
        schY={24}
      />
      <TLV803EA30DBZR
        name="AUDIT_C5218924"
        pcbX={56}
        pcbY={24}
        schX={56}
        schY={24}
      />
      <TCC0402COG331J500AT
        name="AUDIT_C5448795"
        pcbX={84}
        pcbY={24}
        schX={84}
        schY={24}
      />
      <AP63203WU_7
        name="AUDIT_C780769"
        pcbX={-84}
        pcbY={48}
        schX={-84}
        schY={48}
      />
      <AS5600_ASOM
        name="AUDIT_C79815"
        pcbX={-56}
        pcbY={48}
        schX={-56}
        schY={48}
      />
      <BSS138LT1G
        name="AUDIT_C82045"
        pcbX={-28}
        pcbY={48}
        schX={-28}
        schY={48}
      />
      <RT0402BRD07100KL
        name="AUDIT_C852472"
        pcbX={0}
        pcbY={48}
        schX={0}
        schY={48}
      />
      <RT0402BRD076K04L
        name="AUDIT_C852895"
        pcbX={28}
        pcbY={48}
        schX={28}
        schY={48}
      />
      <TPD2EUSB30ADRTR
        name="AUDIT_C94934"
        pcbX={56}
        pcbY={48}
        schX={56}
        schY={48}
      />
      <XL_1608SYGC_06
        name="AUDIT_C965805"
        pcbX={84}
        pcbY={48}
        schX={84}
        schY={48}
      />
      <CL21A475KBQNNNE
        name="AUDIT_C98192"
        pcbX={-84}
        pcbY={72}
        schX={-84}
        schY={72}
      />
      <RT1206BRD071RL
        name="AUDIT_C513714"
        pcbX={-56}
        pcbY={72}
        schX={-56}
        schY={72}
      />
    </board>
  )
}

import { TLV803EA30DBZR } from "../../imports/TLV803EA30DBZR/TLV803EA30DBZR"
import { RP2040 } from "../../imports/RP2040/RP2040"
import { GD25Q16EEIGR } from "../../imports/GD25Q16EEIGR/GD25Q16EEIGR"
import { ABM8_272_T3 } from "../../imports/ABM8_272_T3/ABM8_272_T3"
import { CL05B104KO5NNNC } from "../../imports/CL05B104KO5NNNC/CL05B104KO5NNNC"
import { CL10A105KB8NNNC } from "../../imports/CL10A105KB8NNNC/CL10A105KB8NNNC"
import { A_0402CG150J500NT } from "../../imports/A_0402CG150J500NT/A_0402CG150J500NT"
import { A_0402WGF1001TCE } from "../../imports/A_0402WGF1001TCE/A_0402WGF1001TCE"
import { A_0402WGF1002TCE } from "../../imports/A_0402WGF1002TCE/A_0402WGF1002TCE"
import { A_0402WGF270JTCE } from "../../imports/A_0402WGF270JTCE/A_0402WGF270JTCE"
import { ComponentNotes } from "../schematic/ComponentNotes"
import {
  type BoardViewProps,
  previewPlacement,
} from "../mechanics/preview-placement"

export function McuSheet({ mechanicalPreview = false }: BoardViewProps = {}) {
  return (
    <schematicsheet
      name="MCU"
      displayName="RP2040, boot flash, clock and USB data"
      sheetSize="A4"
      sheetIndex={1}
    >
      <schematictext
        schX={-6.5}
        schY={8.7}
        fontSize={0.22}
        text="RP2040: external QSPI boot flash and 12 MHz crystal. USB-PD negotiation is handled independently by U3."
      />
      <RP2040
        name="U1"
        {...previewPlacement("U1", mechanicalPreview)}
        schX={-10}
        schY={0}
        schWidth={3.0}
        schHeight={5.8}
        schPinArrangement={{
          leftSide: [
            1, 10, 22, 33, 42, 43, 44, 48, 49, 23, 45, 50, 19, 57, 20, 21, 46,
            47, 51, 52, 53, 54, 55, 56, 24, 25, 26, 41,
          ],
          rightSide: [
            2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 27, 28, 29,
            30, 31, 32, 34, 35, 36, 37, 38, 39, 40,
          ],
        }}
        connections={{
          IOVDD1: "net.V3V3",
          IOVDD2: "net.V3V3",
          IOVDD3: "net.V3V3",
          IOVDD4: "net.V3V3",
          IOVDD5: "net.V3V3",
          IOVDD6: "net.V3V3",
          ADC_AVDD: "net.V3V3",
          USB_VDD: "net.V3V3",
          VREG_IN: "net.V3V3",
          VREG_VOUT: "net.VCORE",
          DVDD1: "net.VCORE",
          DVDD2: "net.VCORE",
          GND: "net.GND",
          TESTEN: "net.GND",
          RUN: "net.NRST",
          SWD: "net.SWDIO",
          SWCLK: "net.SWCLK",
          XIN: "net.XIN",
          XOUT: "net.XOUT",
          USB_DM: "net.MCU_USB_DM",
          USB_DP: "net.MCU_USB_DP",
          QSPI_SD0: "net.QSPI_IO0",
          QSPI_SD1: "net.QSPI_IO1",
          QSPI_SD2: "net.QSPI_IO2",
          QSPI_SD3: "net.QSPI_IO3",
          QSPI_SCLK: "net.QSPI_CLK",
          QSPI_SS: "net.QSPI_CS",
          GPIO0: "net.TMC_UART_TX",
          GPIO1: "net.TMC_UART_RX",
          GPIO2: "net.TMC_STEP",
          GPIO3: "net.TMC_DIR",
          GPIO4: "net.MOTOR_REQUEST_N",
          GPIO5: "net.TMC_DIAG",
          GPIO6: "net.I2C_SDA",
          GPIO7: "net.I2C_SCL",
          GPIO8: "net.CAN_SPI_MISO",
          GPIO9: "net.CAN_SPI_CS",
          GPIO10: "net.CAN_SPI_CLK",
          GPIO11: "net.CAN_SPI_MOSI",
          GPIO12: "net.CAN_INT_N",
          GPIO13: "net.CAN_RS",
          GPIO14: "net.EXT_STEP",
          GPIO15: "net.EXT_DIR",
          GPIO16: "net.EXT_ENABLE_N",
          GPIO17: "net.LIMIT1",
          GPIO18: "net.LIMIT2",
          GPIO19: "net.PD_ALERT_N",
          GPIO20: "net.PD_RESET",
          GPIO21: "net.EFUSE_FLT_N",
          GPIO22: "net.POWER_HIGH_CURRENT",
          GPIO23: "net.LED_STATUS_DRIVE",
          GPIO24: "net.LED_FAULT_DRIVE",
          GPIO25: "net.BUZZER_PWM",
          GPIO26_ADC0: "net.VBUS_ADC",
          GPIO27_ADC1: "net.PD_CONTRACT_15_N",
          GPIO28_ADC2: "net.TEMP_ALERT_N",
          GPIO29_ADC3: "net.USB_DATA_ABSENT_N",
        }}
      />
      <TLV803EA30DBZR
        name="U_RESET"
        {...previewPlacement("U_RESET", mechanicalPreview)}
        schX={-15.2}
        schY={1.0}
        schWidth={1.8}
        connections={{ VDD: "net.V3V3", GND: "net.GND", N_RESET: "net.NRST" }}
      />
      <CL05B104KO5NNNC
        name="C_RESET"
        {...previewPlacement("C_RESET", mechanicalPreview)}
        schX={-11.1}
        schY={-9.3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <GD25Q16EEIGR
        name="U_FLASH"
        {...previewPlacement("U_FLASH", mechanicalPreview)}
        schX={-3.3}
        schY={4.5}
        connections={{
          N_CS: "net.QSPI_CS",
          SO_IO1: "net.QSPI_IO1",
          WP__IO2: "net.QSPI_IO2",
          VSS: "net.GND",
          SI_IO0: "net.QSPI_IO0",
          SCLK: "net.QSPI_CLK",
          HOLD__IO3: "net.QSPI_IO3",
          VCC: "net.V3V3",
          EP: "net.GND",
        }}
      />
      <A_0402WGF1002TCE
        name="R_FLASH_CS"
        {...previewPlacement("R_FLASH_CS", mechanicalPreview)}
        schX={0}
        schY={-2.2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.QSPI_CS" }}
      />
      <CL05B104KO5NNNC
        name="C_FLASH"
        {...previewPlacement("C_FLASH", mechanicalPreview)}
        schX={-12.3}
        schY={-9.3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <ABM8_272_T3
        name="Y_RP"
        {...previewPlacement("Y_RP", mechanicalPreview)}
        schX={-2.8}
        schY={0.5}
        connections={{
          pin1: "net.XIN",
          pin3: "net.XTAL_OUT",
          GND1: "net.GND",
          GND2: "net.GND",
        }}
      />
      <A_0402WGF1001TCE
        name="R_XOUT"
        {...previewPlacement("R_XOUT", mechanicalPreview)}
        schX={-2.8}
        schY={2.3}
        connections={{ pin1: "net.XOUT", pin2: "net.XTAL_OUT" }}
      />
      <A_0402CG150J500NT
        name="C_XIN"
        {...previewPlacement("C_XIN", mechanicalPreview)}
        schX={-4.5}
        schY={-1}
        schRotation={270}
        connections={{ pin1: "net.XIN", pin2: "net.GND" }}
      />
      <A_0402CG150J500NT
        name="C_XOUT"
        {...previewPlacement("C_XOUT", mechanicalPreview)}
        schX={-1.5}
        schY={-1}
        schRotation={270}
        connections={{ pin1: "net.XTAL_OUT", pin2: "net.GND" }}
      />
      <A_0402WGF270JTCE
        name="R_USB_DM"
        {...previewPlacement("R_USB_DM", mechanicalPreview)}
        schX={-3.5}
        schY={-3}
        connections={{ pin1: "net.USB_DM", pin2: "net.MCU_USB_DM" }}
      />
      <A_0402WGF270JTCE
        name="R_USB_DP"
        {...previewPlacement("R_USB_DP", mechanicalPreview)}
        schX={-3.5}
        schY={-4.2}
        connections={{ pin1: "net.USB_DP", pin2: "net.MCU_USB_DP" }}
      />
      <A_0402WGF1002TCE
        name="R1"
        {...previewPlacement("R1", mechanicalPreview)}
        schX={-14.7}
        schY={-2.2}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.NRST" }}
      />
      <CL05B104KO5NNNC
        name="C5"
        {...previewPlacement("C5", mechanicalPreview)}
        schX={-14.7}
        schY={-4.8}
        schRotation={270}
        connections={{ pin1: "net.NRST", pin2: "net.GND" }}
      />
      {(
        [
          "C1",
          "C_IO2",
          "C_IO3",
          "C_IO4",
          "C_IO5",
          "C_IO6",
          "C_ADC",
          "C_USBPHY",
        ] as const
      ).map((name, index) => (
        <CL05B104KO5NNNC
          key={name}
          name={name}
          {...previewPlacement(name, mechanicalPreview)}
          schX={-13.5 + (index % 4) * 1.2}
          schY={-6.5 - Math.floor(index / 4) * 1.4}
          schRotation={270}
          connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
        />
      ))}
      <CL10A105KB8NNNC
        name="C2"
        {...previewPlacement("C2", mechanicalPreview)}
        schX={-13.5}
        schY={-9.3}
        schRotation={270}
        connections={{ pin1: "net.V3V3", pin2: "net.GND" }}
      />
      <CL10A105KB8NNNC
        name="C_VCORE"
        {...previewPlacement("C_VCORE", mechanicalPreview)}
        schX={-3}
        schY={-7}
        schRotation={270}
        connections={{ pin1: "net.VCORE", pin2: "net.GND" }}
      />
      {(["C3", "C4"] as const).map((name, index) => (
        <CL05B104KO5NNNC
          key={name}
          name={name}
          {...previewPlacement(name, mechanicalPreview)}
          schX={-3 + index * 1.5}
          schY={-8.4}
          schRotation={270}
          connections={{ pin1: "net.VCORE", pin2: "net.GND" }}
        />
      ))}
      <ComponentNotes sheet="MCU" />
    </schematicsheet>
  )
}

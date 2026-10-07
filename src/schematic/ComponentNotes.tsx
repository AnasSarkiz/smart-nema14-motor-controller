import { Fragment } from "react"

export const componentNotes = {
  MCU: [
    "U_RESET: TLV803EA30; holds RUN/reset 200 ms after 3 V supply.",
    "C_RESET: 100 nF; dedicated reset-supervisor supply bypass.",
    "U1: RP2040; motor control, USB data, SPI CAN and I2C.",
    "U_FLASH: GD25Q16EEIGR; 2 MB external QSPI boot flash.",
    "Y_RP: ABM8-272-T3; 12 MHz reference for RP2040/USB.",
    "R_XOUT: 1 kohm; limits crystal oscillator drive.",
    "C_XIN: 15 pF; crystal load on XIN; qualify stray load.",
    "C_XOUT: 15 pF; crystal load on XTAL_OUT.",
    "R_FLASH_CS: 10 kohm; holds flash CS high at startup.",
    "C_FLASH: 100 nF; local boot-flash supply bypass.",
    "R_USB_DM: 27 ohm; RP2040 USB D- series termination.",
    "R_USB_DP: 27 ohm; RP2040 USB D+ series termination.",
    "R1: 10 kohm; pulls RP2040 RUN/system reset high.",
    "C5: 100 nF; filters the RUN/system reset line.",
    "C2: 1 uF; local RP2040 VREG_IN supply bypass.",
    "C_VCORE: 1 uF; internal 1.1 V regulator reservoir.",
    "C3: 100 nF; bypasses DVDD2 on the 1.1 V core rail.",
    "C4: 100 nF; bypasses DVDD1 on the 1.1 V core rail.",
    "C1: 100 nF; local 3.3 V IOVDD supply bypass.",
    "C_IO2: 100 nF; local 3.3 V IOVDD supply bypass.",
    "C_IO3: 100 nF; local 3.3 V IOVDD supply bypass.",
    "C_IO4: 100 nF; local 3.3 V IOVDD supply bypass.",
    "C_IO5: 100 nF; local 3.3 V IOVDD supply bypass.",
    "C_IO6: 100 nF; local 3.3 V IOVDD supply bypass.",
    "C_ADC: 100 nF; bypasses ADC_AVDD supply noise.",
    "C_USBPHY: 100 nF; bypasses the USB_VDD supply.",
  ],
  I2C: [
    "U9: TMP112; board temperature sensor; I2C address 0x48.",
    "R33: 10 kohm; pulls temperature ALERT high.",
    "C32: 100 nF; local TMP112 supply bypass.",
    "R2: 4.7 kohm; shared I2C SCL pull-up to 3.3 V.",
    "R3: 4.7 kohm; shared I2C SDA pull-up to 3.3 V.",
    "BZ1: MLT-5020; externally driven magnetic sounder.",
    "Q_BUZZ: DMG1012T; low-side buzzer current switch.",
    "D_BUZZ: B5819WS, 1 A; clamps the coil turn-off pulse.",
    "R_BUZZ_GATE: 100 ohm; limits PWM gate charging current.",
    "R_BUZZ_OFF: 100 kohm; keeps buzzer off at reset.",
    "C_BUZZ: 1 uF; local buzzer rail decoupling.",
  ],
  CAN: [
    "C_CAN_XIN2: 15 pF; parallel XIN load; qualify stray load.",
    "C_CAN_XOUT2: 15 pF; parallel XOUT load; qualify stray load.",
    "U_CAN: MCP2515; dedicated classical CAN controller.",
    "Y_CAN: 16 MHz crystal; clocks CAN bit timing.",
    "C_CAN_XIN: 15 pF; one half of 30 pF crystal load.",
    "C_CAN_XOUT: 15 pF; one half of 30 pF crystal load.",
    "C_CAN_CORE: 100 nF; MCP2515 local supply bypass.",
    "R_CAN_CS: 10 kohm; deselects CAN SPI at reset.",
    "R_CAN_INT: 10 kohm; open-drain CAN IRQ pull-up.",
    "U6: SN65HVD230; classical CAN physical transceiver.",
    "C7: 100 nF; bypasses the CAN transceiver supply.",
    "R49: 120 ohm; CAN bus termination, enabled by R50.",
    "R50: 0 ohm; DNP; fit only at a CAN bus endpoint.",
  ],
  LogicPower: [
    "U5: AP63203; converts protected VM to fixed 3.3 V.",
    "C8: 10 uF; buck input energy reservoir.",
    "C9: 100 nF; high-frequency buck input bypass.",
    "C10: 100 nF; bootstrap capacitor for the buck switch.",
    "L1: 3.9 uH; buck energy-storage/output filter inductor.",
    "C11: 22 uF; filters and stores the 3.3 V output.",
    "C12: 22 uF; parallel 3.3 V output filter/reservoir.",
  ],
  MotorDriver: [
    "U2: TMC2209-LA-T; drives both stepper windings.",
    "C13: 22 nF; flying capacitor for the charge pump.",
    "C14: 100 nF; charge-pump reservoir between VCP and VM.",
    "C15: 4.7 uF; bypasses the driver's 5VOUT regulator.",
    "C16: 100 nF; bypasses the driver's 3.3 V logic supply.",
    "C17: 100 nF; high-frequency motor-supply bypass.",
    "C18: 10 uF; local ceramic motor-supply reservoir.",
    "C19: 100 uF / 35 V; motor bulk; observe polarity.",
    "C20: 100 uF / 35 V; parallel motor bulk; polarised.",
    "R5: 1 ohm / 0.25 W; winding A current-sense resistor.",
    "R6: 1 ohm / 0.25 W; winding B current-sense resistor.",
    "R4: 1 kohm; isolates MCU TX on the one-wire UART.",
    "R7: 10 kohm; pulls ENN high, disabling motor at reset.",
    "R8: 10 kohm; keeps STEP low when MCU is inactive.",
    "R9: 10 kohm; gives DIR a defined low default.",
    "R10: 10 kohm; upper arm of the 5VOUT/VREF divider.",
    "R11: 10 kohm; lower arm of the VREF divider to GND.",
    "C21: 100 nF; filters the motor current-reference VREF.",
  ],
  UsbPd: [
    "J_USB: USB-C; VBUS power, PD CC signals and USB data.",
    "U3: STUSB4500; autonomous PD sink; I2C address 0x28.",
    "Q_PD_IN: 40 V PMOS; input half of reverse-blocking pair.",
    "Q_PD_OUT: 40 V PMOS; output half; shared source/gate.",
    "R13: 100 kohm; gate-to-source default-off resistor.",
    "R_PD_GATE: 22 kohm; limits gate drive/sink current.",
    "R14: 470 ohm; filters incoming PD-controller supply.",
    "C_PD_VDD: 2.2 uF/50 V; decouples PD input supply.",
    "C_PD_1V2: 1 uF; bypasses the internal 1.2 V regulator.",
    "C_PD_2V7: 1 uF; bypasses the internal 2.7 V regulator.",
    "R_PD_RESET: 10 kohm; holds active-high PD reset low.",
    "R12: 10 kohm; open-drain PD ALERT pull-up to 3.3 V.",
    "R_PD_OK: 10 kohm; PD power flag pull-up to 3.3 V.",
    "R_PD_SENSE: 1 kohm/0.66 W; input sense/discharge limit.",
    "R_PD_DISCH1: 1 kohm/0.66 W; motor rail discharge arm.",
    "R_PD_DISCH2: 1 kohm/0.66 W; parallel discharge arm.",
    "D_USB: TPD2EUSB30; protects USB D+/D- from ESD.",
    "D_VBUS: input surge clamp; transient proof pending.",
    "C25: 2.2 uF/50 V; USB connector VBUS input bypass.",
    "C26: 100 nF; high-frequency connector VBUS bypass.",
    "R16: 220 kohm; upper protected-VBUS ADC divider.",
    "R17: 10 kohm; lower VBUS ADC divider to GND.",
    "R18: 1 kohm; series ADC filter/isolation resistor.",
    "C27: 100 nF; filters guarded VBUS ADC input.",
  ],
  Programming: [
    "J_SWD: Standard JST SWD/reset; programmer VOUT unused.",
    "U7: TMUX1511; isolates SWD, reset and ADC until power-good.",
    "U8: TLV803; qualifies 3.0 V rail, then delays 200 ms.",
    "R19: 10 kohm; pulls open-drain POWER_GOOD high.",
    "C28: 100 nF; bypasses the TMUX1511 supply.",
    "C29: 100 nF; bypasses the rail supervisor supply.",
    "R20: 100 ohm; series damping/isolation on SWDIO.",
    "R21: 100 ohm; series damping/isolation on SWCLK.",
    "R22: 100 ohm; series isolation on programmer NRST.",
    "R51: 100 kohm; keeps ADC input defined if isolated.",
    "R52: 100 kohm; holds isolated MCU SWDIO low.",
    "R53: 100 kohm; holds isolated MCU SWCLK low.",
  ],
  Interfaces: [
    "J_IO: CAN, 3.3 V STEP/DIR/ENABLE and two limit inputs.",
    "J_MOTOR: A1/A2 and B1/B2 winding cable connector.",
    "D_IO1: ESD clamp for STEP, DIR, ENABLE and LIMIT1.",
    "D_IO2: ESD clamp for LIMIT2; other channels unused.",
    "D_CAN: SM712; surge/ESD protection for CAN H and L.",
    "R23: 1 kohm; series protection on external STEP.",
    "R24: 1 kohm; series protection on external DIR.",
    "R25: 1 kohm; series protection on external ENABLE_N.",
    "R26: 1 kohm; LIMIT1 series resistor / RC filter arm.",
    "R27: 1 kohm; LIMIT2 series resistor / RC filter arm.",
    "R28: 10 kohm; gives external STEP a low default.",
    "R29: 10 kohm; gives external DIR a low default.",
    "R30: 10 kohm; pulls ENABLE_N high (inactive).",
    "R31: 10 kohm; LIMIT1 high means open contact/fault.",
    "R32: 10 kohm; LIMIT2 high means open contact/fault.",
    "R34: 10 kohm; keeps CAN in standby during reset.",
    "C30: 100 nF; filters LIMIT1 with R26.",
    "C31: 100 nF; filters LIMIT2 with R27.",
    "R35: 1 kohm; limits LED_POWER current.",
    "LED_POWER: Shows that the 3.3 V supply is present.",
    "R36: 1 kohm; limits LED_STATUS current.",
    "LED_STATUS: Firmware-controlled status indicator.",
    "R37: 1 kohm; limits LED_FAULT current.",
    "LED_FAULT: Firmware-controlled fault indicator.",
  ],
  InputPower: [
    "U10: TPS26600; inrush/current limit and reverse blocking.",
    "Q_ILIM: Adds R45 current-limit branch when MCU enables it.",
    "R38: 100 kohm; upper eFuse undervoltage divider arm.",
    "R39: 47 kohm; lower UVLO arm to isolated EFUSE_RTN.",
    "R40: 100 kohm; first eFuse OVP upper-arm resistor.",
    "R41: 1 kohm; second eFuse OVP upper-arm resistor.",
    "R42: 4.7 kohm; third eFuse OVP upper-arm resistor.",
    "R43: 6.04 kohm; lower OVP arm to isolated EFUSE_RTN.",
    "R44: 24 kohm; sets nominal 0.50 A bootstrap limit.",
    "R45: 24 kohm; switched parallel arm gives 1.00 A nominal.",
    "R46: 10 kohm; holds high-current selection off at reset.",
    "C33: 2.2 uF; sets eFuse output slew / inrush timing.",
    "C34: 2.2 uF; protected VBUS input bypass for U10.",
    "R48: 10 kohm; pulls the eFuse fault output high.",
  ],
} as const

export function ComponentNotes({
  sheet,
}: {
  sheet: keyof typeof componentNotes
}) {
  return (
    <>
      <schematictext
        text="COMPONENT PURPOSE"
        schX={6}
        schY={8}
        anchor="left"
        fontSize={0.28}
      />
      {componentNotes[sheet].map((text, index) => (
        <Fragment key={text.split(":")[0]}>
          <schematictext
            text={text}
            schX={6}
            schY={7.3 - index * 0.52}
            anchor="left"
            fontSize={0.2}
          />
        </Fragment>
      ))}
    </>
  )
}

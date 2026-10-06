import { Fragment } from "react"

export const componentNotes = {
  MCU: [
    "U1: STM32G0B1; runs motor control, USB/PD and CAN firmware.",
    "C1: 100 nF; bypasses MCU VDD/VDDA supply noise.",
    "C2: 4.7 uF; local MCU supply reservoir.",
    "C3: 100 nF; bypasses the MCU VREF+ supply.",
    "C4: 100 nF; bypasses the MCU VBAT supply.",
    "R1: 10 kohm; holds NRST high when reset is released.",
    "C5: 100 nF; filters noise on the NRST reset line.",
  ],
  I2C: [
    "R2: 4.7 kohm; pulls I2C SCL up to 3.3 V.",
    "R3: 4.7 kohm; pulls I2C SDA up to 3.3 V.",
  ],
  CAN: [
    "U6: SN65HVD230; converts MCU logic to classical CAN.",
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
    "J_USB: USB-C input; power, CC negotiation and USB data.",
    "U3: TCPP01; protects CC and controls the VBUS MOSFET.",
    "Q_PD: VBUS series MOSFET; gate controlled by U3.",
    "D_USB: TPD2EUSB30; ESD clamp for USB D+/D-.",
    "D_VBUS: Input VBUS surge clamp; not a motor brake.",
    "C25: 2.2 uF; USB connector VBUS input bypass.",
    "C26: 100 nF; high-frequency connector VBUS bypass.",
    "C22: 100 nF; bypasses the TCPP01 3.3 V supply.",
    "C23: 330 pF; filters noise on connector CC1.",
    "C24: 330 pF; filters noise on connector CC2.",
    "R12: 10 kohm; pulls the TCPP01 fault output high.",
    "R13: 100 kohm; upper TCPP01 overvoltage divider arm.",
    "R14: 1 kohm; series part of the OVP upper arm.",
    "R15: 6.04 kohm; lower TCPP01 OVP divider arm.",
    "R16: 220 kohm; upper protected-VBUS sensing arm.",
    "R17: 10 kohm; lower VBUS sensing arm to GND.",
    "R18: 1 kohm; series ADC filter/isolation resistor.",
    "C27: 100 nF; filters the guarded VBUS ADC input.",
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
    "U9: TMP112; measures board temperature; I2C 0x48.",
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
    "R33: 10 kohm; pulls the temperature alert high.",
    "R34: 10 kohm; keeps CAN in standby during reset.",
    "C30: 100 nF; filters LIMIT1 with R26.",
    "C31: 100 nF; filters LIMIT2 with R27.",
    "C32: 100 nF; bypasses the temperature-sensor supply.",
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

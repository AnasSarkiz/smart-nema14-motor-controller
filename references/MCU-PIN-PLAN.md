# STM32G0B1CBT6 simultaneous pin plan - candidate

2026-10-03, revision 0.0.7-alpha.0. ST DS13560 Rev 6, Table 12 (package pins),
Table 13 (alternate functions) and Figure 15 (power). No imported pin mapping
was changed. Imported compound names for PA11/PA12 represent the optional
PA9/PA10 remap; firmware must retain the default USB mapping.

| Function | Physical pin / port | Mode / status |
| --- | --- | --- |
| Main supply | 6 VDD/VDDA | 3.3 V; 100 nF plus bulk, implemented |
| Ground | 7 VSS/VSSA | GND, implemented |
| Backup supply | 4 VBAT | 3.3 V, implemented; no battery |
| ADC reference | 5 VREF+ | 3.3 V, implemented; VREFBUF disabled |
| Reset | 10 PF2_NRST | NRST, 10 kOhm + 100 nF, implemented |
| USB D-/D+ | 33 PA11 / 34 PA12 | Native USB, wired to connector/data ESD; routing and firmware pending |
| UCPD1 CC1 / CC2 | 28 PA8 / 27 PB15 | Protected analog CC paths, wired through TCPP; firmware pending |
| UCPD1 dead-battery support | 29 PA9 / 32 PA10 | Grounded for external TCPP dead-battery support; USB remap must remain disabled |
| TCPP DB / FLT | 24 PB12 / 25 PB13 | GPIO output / open-drain fault input, wired; DB startup order pending |
| TCPP CTRLVBUS (physical pin 6) | No MCU GPIO | Analog overvoltage divider input; must follow TCPP datasheet |
| Motor power enable | 26 PB14 | Reserved GPIO; inrush/reverse-blocking power path pending |
| TMC UART TX / RX | 13 PA2 / 14 PA3 | USART2 AF1, implemented; TX through 1 kOhm, RX direct |
| TMC STEP | 17 PA6 | TIM3_CH1 AF1, implemented; firmware pending |
| TMC DIR / ENN / DIAG | 18 PA7 / 15 PA4 / 16 PA5 | GPIO, implemented; ENN 10 kOhm pull-up; firmware pending |
| VBUS / temperature ADC | 11 PA0 / 12 PA1 | PA0 wired to protected VBUS divider/filter; PA1 temperature network pending |
| External STEP / DIR / ENABLE | 19 PB0 / 20 PB1 / 21 PB2 | MCU inputs, proposed; external protection pending |
| Limit inputs 1 / 2 | 22 PB10 / 23 PB11 | GPIO inputs, proposed |
| Status / fault LEDs | 30 PC6 / 31 PC7 | GPIO, proposed; power LED can use rail |
| CAN RX / TX | 44 PB5 / 45 PB6 | FDCAN2 AF3, implemented to transceiver; classical mode only |
| Encoder SCL / SDA | 47 PB8 / 48 PB9 | I2C1 AF6, implemented |
| SWDIO / SWCLK | 35 PA13 / 36 PA14_BOOT0 | Native SWD; official header/power network pending |

Unused: PC13, PC14/15, PF0/1, PA15, PD0-3, PB3/4/7. They are marked
no-connect in the draft; configure as analog inputs in firmware.
Internal HSI/HSI48 with USB clock recovery is proposed; clock accuracy and
startup settings require firmware validation. No external crystal is populated.
Keep hardware reset/debug enabled and configure BOOT0 option bytes for normal
Flash boot while preserving SWCLK on pin 36.

This is a reviewed allocation proposal, not proof of completed firmware or a
full schematic. Actual electrical connections are tested in the generated draft
by physical package pin number, independently of imported alias spelling.

# Programming this controller with the standard JST programmer

Reviewed 2026-10-06 against the public standard-jst-programmer **0.8.0** source
and controller **0.0.36-alpha.0** Circuit JSON. This verifies wiring; no physical
flashing or maximum SWD speed has been demonstrated.

Use the programmer's **J3 five-pin** JST SH port and a **straight-through
five-way** JST SH cable to the controller's **J_SWD** connector. A three-pin SWD
cable does not fit this target connector directly.

| Contact | Programmer J3 | Controller J_SWD |
| --- | --- | --- |
| 1 | Selectable VOUT | Intentionally disconnected |
| 2 | SWDIO | TMUX1511 channel 1, R20, STM32 PA13/pin 35 |
| 3 | GND | Controller GND |
| 4 | SWCLK | TMUX1511 channel 2, R21, STM32 PA14/pin 36 |
| 5 | NRST | TMUX1511 channel 3, R22, STM32 PF2_NRST/pin 10 |

Power the controller separately through its USB-C input, using the qualified
prototype supply scope: a USB-C PD source advertising at least 1.5 A at 5 V.
The programmer does not power this controller or measure its consumption.
Its SWD/reset logic is fixed at 3.3 V regardless of the VOUT selector setting.
Do not connect VOUT to an already powered controller rail.

The controller enables its signal switches after the 3.3 V rail passes its
3.0 V supervisor threshold and nominal 200 ms delay. Reset has a separate
channel; asserting NRST does not disable the other channels. R1 supplies the
10 kilohm reset pull-up and C5 is 100 nF.

Build and load the programmer revision's CMSIS-DAP UF2 following its official
README. Configure OpenOCD for **STM32G0**, rather than the README's RP2040 target
example. Use an OpenOCD installation containing `target/stm32g0x.cfg`.

After extracting the preserved official `openocd-reset.cfg` from
`evidence/rev-0.0.35-alpha.0/board-review-20261006/OFFICIAL-PROGRAMMER-SOURCES.zip`,
an initial connection command is:

```sh
openocd -f /path/to/openocd-reset.cfg -f target/stm32g0x.cfg \
  -c "adapter speed 100; init; reset halt"
```

This command has not been executed against physical hardware. Start at 100 kHz
for bring-up; that is an initial setting, not a validated speed rating. The
target now uses the official C25076 **100 ohm** parts for R20/R21/R22, matching
the programmer example, with the TMUX1511 analog switch retained. Confirm edges, SWD turnaround,
connect-under-reset, flashing, verification and recovery on the prototype before
increasing speed or accepting this interface.

Keep PA13/PA14 available for debug and configure BOOT0/NRST option bytes for
normal Flash boot and hardware reset. Motion, PD negotiation and fault-handling
firmware are not delivered or tested. Firmware must retain motor disable at
5 V and until a valid motion supply contract and fault/current checks pass.

Official references: [standard programmer](https://tscircuit.com/tscircuit/standard-jst-programmer),
[programmer firmware/configuration](https://github.com/tscircuit/standard-jst-programmer/tree/main/firmware),
[OpenOCD STM32G0 target](https://github.com/openocd-org/openocd/blob/master/tcl/target/stm32g0x.cfg).

**PROTOTYPE FABRICATION READY: NO.** Programming pin compatibility does not
approve fabrication or demonstrate functional hardware.

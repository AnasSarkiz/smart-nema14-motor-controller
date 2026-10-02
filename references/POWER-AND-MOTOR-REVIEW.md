# Preliminary power and motor review

Revision 0.0.6-alpha.0, 2026-10-02. Design calculations only, not physical test
results, approved operating ratings or proof of complete USB-PD protection.

## Logic buck

[Diodes DS41326 Rev 3-2](https://www.diodes.com/datasheet/download/AP63200-AP63201-AP63203-AP63205.pdf),
pp. 2, 9, 13-14: AP63203 is fixed 3.3 V, VIN 3.8-32 V, nominal 1.1 MHz,
100 nF BST-SW, direct output feedback. EN may be tied to VIN. Figure 21 and
Table 2 use 10 uF input and two 22 uF output capacitors. Native imported pin
numbers 1 FB / 2 EN / 3 VIN / 4 GND / 5 SW / 6 BST agree with the datasheet.
Actual local PDF pages 2, 9, 10, 11 and 13 were rendered and visually read.

L1 is now the official imported C19947652 / Bourns SRN6028C-3R9M,
3.9 uH +/-20%, within Diodes' recommended 2.2-10 uH range. The
[Bourns SRN6028C datasheet](https://bourns.com/docs/Product-Datasheets/SRN6028C.pdf)
was downloaded and page 1 rendered/read. At 25 C its table gives 28 mOhm
DCR +/-20% (33.6 mOhm upper tolerance), 3.3 A typical Irms and 3.9 A typical
Isat. Isat is defined at a 30% inductance drop; these are not temperature-
derated guaranteed limits. The manufacturer's layout is 6.5 x 6.5 mm,
with 2.5 mm inner gap and two 2.0 x 6.5 mm lands. Exact imported lands match
within rounding; generated pad centers are +/-2.250059 mm, not the previous
Sunlord footprint. Body is 6.0 mm square, nominal 2.6 mm high (+0.2 mm).
C2046441 remains unavailable; it has not been patched or recreated.

Proposed normal logic budget: 0.3 A at 3.3 V. With 21 V input used as a
screening case, L=3.12 uH (-20%), f=1.034 MHz (nominal minus 6% jitter),
Diodes Eq. 7 gives:

Delta_I = Vout*(Vin-Vout)/(Vin*L*f) = 0.8622 A peak-to-peak.
CCM screening Ipeak = 0.3 + Delta_I/2 = 0.7311 A.
I_L_rms = sqrt(0.3^2 + Delta_I^2/12) = 0.3898 A.
DCR loss at 33.6 mOhm = 0.00511 W, before temperature rise.

At this light load the actual converter may enter PFM/discontinuous operation;
those CCM expressions are screening calculations, not guaranteed waveforms.
The oscillator table supplies no guaranteed minimum frequency beyond its nominal
and jitter description. Inductance under current/temperature, fault saturation
(the converter peak limit can reach 3.1 A), switching/ripple and transient tests
still require qualification. Do not advertise 2 A rail capability from this draft.

C8 10 uF/50 V and C9 100 nF/50 V are downstream of the **unfinished** protected
input. They must not be directly added to the connector capacitance budget.
C11/C12 are nominal 22 uF/25 V each; manufacturer bias/temperature curves must
establish usable output capacitance. Ground-return/feedback layout and actual
thermal rise still depend on PCB placement and physical measurements.

## Motor support and current

[ADI TMC2209 Rev 1.09](https://www.analog.com/media/en/technical-documentation/data-sheets/TMC2209_datasheet_rev1.09.pdf),
pp. 9-11, 19, 52-54, 75-77: physical pins, standard support, UART TX 1 kOhm,
external low-inductance sense resistors, charge pump and supply limits were read.
The generated connectivity tests use physical numbers independently of aliases.

- 22 nF/50 V CPO-CPI; 100 nF/50 V VCP-VM.
- 4.7 uF nominal on 5VOUT, 100 nF VIO, 100 nF plus 10 uF ceramic on VM.
- Two official imported C5127775 / Milliohm HoLRT1206-1W-180mR-1%,
  180 mOhm, 1%, 1 W. EasyEDA 0.0.366 / CLI 0.1.2230 resolve the prior converter
  bug without manual edits. Raw Value=180mΩ generates native resistance=0.18 Ω;
  both original pads and source pins are preserved and independently audited.
  Full manufacturer pulse/temperature and Kelvin layout review remains pending.
  C723709 is retained as an unused prior 200 mOhm alternative.
- ENN 10 kOhm pull-up holds the bridge off through MCU reset. STEP and DIR each
  have 10 kOhm pull-downs. MS1/MS2/SPREAD/CLK/STDBY are grounded, UART address 0.
- MCU TX reaches the single-wire UART through 1 kOhm; RX is directly connected.
- VREF comes from a 10 kOhm / 10 kOhm divider on 5VOUT with 100 nF filtering.
  It is not driven from a live MCU supply while the driver rail is off.
- Physical pin 25 is unused and grounded as explicitly permitted by ADI.
  INDEX is no-connect; exposed pad and both GND pins are grounded.

Using the nominal 325 mV current threshold and 20 mOhm internal term:

I_RMS_full = 0.325/(0.180+0.020)/sqrt(2) = 1.1490 A.
I_sine_peak = 1.6250 A.
Conservative static pulse dissipation in each sense resistor at that peak:
I_peak^2 * 0.180 = 0.4753 W (not an average chopper dissipation prediction).

The proposed firmware cap is 1.0 A RMS with 0.3 A RMS bring-up, subject to the
exact motor nameplate convention. No firmware is delivered or tested yet.
These nominal expressions omit sense tolerance, VREF/regulator tolerance,
threshold spread and temperature. Calculate worst cases and select register
limits before enabling motion. A 1 A RMS label is not a verified board rating.
This conservative sense value does **not** reach the requested approximately
1.2 A upper target. That target remains unresolved; do not silently claim it.
C5127782 and C723743 remain library-unavailable. Imported C5127776 is a
verified native 0.15 Ω, 1 W, 1% electrical candidate with both pads intact;
nominal full-scale current would be 1.3518 A RMS, sine peak 1.9118 A and
static sense dissipation 0.5482 W. It is not instantiated on the motor board.
AEC-Q200 qualification is not established. Choosing it requires worst-case
current, register, pulse and thermal review before changing the draft limit.

The standard internal regulator requires VM >=5.5 V; default/fallback 5 V is
logic-only, motor disabled. No VM-to-5VOUT bridge is permitted in a 9-20 V design.
Keep ENN high until a valid offered PD contract, measured VM, fault checks,
current budget and UART configuration have been verified. External STEP/DIR
must be interpreted by the MCU, not electrically joined to its driven outputs.

## Bulk, startup and regeneration

C19/C20 are imported Panasonic EEEFPV101XAP / C178585, polarized 100 uF/35 V
parts in parallel: 200 uF nominal, 160 uF at -20%, before temperature/age effects.
The supplier specification lists 600 mA ripple and 160 mOhm ESR at 100 kHz per
part. Those frequency-specific values do not establish chopper ripple capability
or equal current sharing. Exact manufacturer ripple/temperature/lifetime review
and the 7.7 mm body height/mechanical fit remain pending.

At 20 V, nominal stored energy is 0.5*C*V^2 = 40 mJ. Additional energy between
20 V and 23 V is only 12.9 mJ nominal, or 10.32 mJ at the -20% capacitance case.
23 V is an illustrative calculation endpoint, **not an approved clamp threshold**.
Motor inductive and kinetic regeneration can exceed this. USB sources are not
assumed to absorb current. Reverse blocking, an energy-rated braking solution,
voltage margins and power-path discharge must be designed against the actual
motor/load/inertia/speed. These requirements cannot be sized from NEMA dimensions.

USB connector-side capacitance is separately limited to 1-10 uF by the
[ST TCPP01 application note in DS12900 Rev 7](https://www.st.com/resource/en/datasheet/tcpp01-m12.pdf).
Controlled downstream charging and logic bootstrap must be checked together;
a large bulk capacitor cannot be added directly to raw USB VBUS.

TCPP physical pin 6 CTRLVBUS is an analog OVP divider input, not an MCU GPIO.
The candidate pin plan was corrected before wiring. Its OVP threshold spans
1.20-1.34 V and IN_GD/SOURCE absolute maximum is 24 V; the divider and transient
margins require tolerance analysis for 20 V operation. A TVS nameplate voltage
alone cannot prove protection. No TCPP component data was edited.

TI TPS259470LRPWR / C3662793 imported successfully as an **unused candidate**.
[TI SLVSFC9 Rev C](https://www.ti.com/lit/ds/symlink/tps25947.pdf) describes
2.7-23 V operation, 28 V absolute maximum, true reverse-current blocking,
controlled output slew and adjustable current limit. Exact pin-function selection,
OVP/UVLO/divider, latch reset, startup/PD transitions, SOA and footprint review
remain undone. Importing it does not complete the input circuit.

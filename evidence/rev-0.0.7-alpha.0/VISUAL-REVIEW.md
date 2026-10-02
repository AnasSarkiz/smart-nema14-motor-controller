# Actual visual review - revision 0.0.7

Reviewed current PNG pixels for all six native A4 sheets: MCU, Encoder, CAN,
LogicPower, MotorDriver and UsbPd. Current source has 56 components and no PCB
geometry. Existing four block diagrams remain inside A4 bounds. USB heading
and bottom notes were moved inside its boundary; three native board text
annotations identify missing imported custom-symbol reference text.
D_VBUS remains horizontal despite schRotation and the import custom symbols
have unresolved reference warnings; full schematic approval stays BLOCKED.
Data ESD internal labels are tight; its exact pins are independently tested.

Reviewed actual PCB PNGs for both isolated fixtures. Seven-part 80x35 mm
fixture: separated MCU/TCPP/encoder/driver/resistors/inductor with no copper
routes. Eight-part 80x30 mm USB fixture: common-drain MOSFET land is intact,
connector has signal pads, four plated shell slots and two locating holes,
and all remaining parts are separated. After cable-access warning, native
connector fixture position was corrected to the appropriate edge, rebuilt,
rechecked and the new PNG inspected. This establishes neither controller
placement nor manufacturer footprint approval. HRO/GCT land differences remain.

Reviewed rendered manufacturer PDFs: HRO TYPE-C-31-M-12 drawing; GCT USB4105
Rev B drawing; TI TPD2EUSB30A page3 pinout; ST ESDA25P35 page1 polarity;
ST STL11N3LLH6 pages1/12 pinout/continuous drain footprint. The HRO/GCT shell
slot differences are explicitly recorded, not accepted without evidence.
Current TCPP/STM32 detailed documents read online are not claimed as local
PDF visual reviews. No 3D registration, PCB copper-layer inspection, routed
snapshot, assembly review or physical hardware inspection has occurred.

Current previews and fixture outputs are preserved under this revision's
current-draft/, import-fixture/ and usb-import-fixture/ directories; original
PNG render paths are dist/index/ and dist/scripts/. Checksums link these to
current archived source/dependency inputs. Full Stage 2 remains blocked.

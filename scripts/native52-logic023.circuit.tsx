import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.52-alpha.0/routing/LOGIC013-SOURCE-CANDIDATES.json"

export default function Native52Logic023Capture() {
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={["V3V3"]}
      nativeRoutingTargets={["net.V3V3"]}
      nativeAutorouterEffortLevel="5x"
      nativeSavedRouteReplacement={{
        netNames: candidates.net_names,
        pathSelectors: candidates.replaced_path_selectors,
      }}
      nativeSavedRouteTrial={{
        netNames: candidates.net_names,
        paths: candidates.paths.map((path) => fanoutTracePath.parse(path)),
      }}
      nativeCopperTrial={
        <>
          <trace
            name="V3V3_IOVDD1_USB_VDD_LOCAL_TIE"
            from=".U1 port.pin49"
            to=".U1 port.pin48"
            thickness="0.18mm"
            maxLength="0.5mm"
            maxViaCount={0}
            routingPhaseIndex={1}
            pcbPathRelativeTo=".U1 port.pin49"
            pcbPath={[".U1 port.pin49"]}
          />
          <trace
            name="V3V3_USB_VDD_LOCAL_BYPASS"
            from=".U1 port.pin48"
            to=".C_USBPHY port.pin1"
            thickness="0.18mm"
            maxLength="2mm"
            maxViaCount={0}
            routingPhaseIndex={1}
            pcbPathRelativeTo=".U1 port.pin48"
            pcbPath={[
              ".U1 port.pin48",
              { x: 0.599948, y: 3.75 },
              ".C_USBPHY port.pin1",
            ]}
          />
          <trace
            name="V3V3_R35_LOCAL_BRANCH"
            from=".R35 port.pin1"
            to=".C_MOTOR_INTERLOCK port.pin1"
            thickness="0.15mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R35 port.pin1"
            pcbPath={[".R35 port.pin1", { x: 0.432816, y: -0.95 }]}
          />
          <trace
            name="V3V3_LOCAL_U1_44_U1_43"
            from=".U1 port.pin44"
            to=".U1 port.pin43"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".U1 port.pin44"
            pcbPath={[".U1 port.pin44"]}
          />
          <trace
            name="V3V3_LOCAL_U1_43_U1_42"
            from=".U1 port.pin43"
            to=".U1 port.pin42"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".U1 port.pin43"
            pcbPath={[".U1 port.pin43"]}
          />
          <trace
            name="V3V3_LOCAL_R_MOTOR_REQUEST_1_R30_1"
            from=".R_MOTOR_REQUEST port.pin1"
            to=".R30 port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R_MOTOR_REQUEST port.pin1"
            pcbPath={[".R_MOTOR_REQUEST port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_R30_1_R31_1"
            from=".R30 port.pin1"
            to=".R31 port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R30 port.pin1"
            pcbPath={[".R30 port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_R_CAN_CS_1_R31_1"
            from=".R_CAN_CS port.pin1"
            to=".R31 port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R_CAN_CS port.pin1"
            pcbPath={[".R_CAN_CS port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_U8_3_R1_1"
            from=".U8 port.pin3"
            to=".R1 port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".U8 port.pin3"
            pcbPath={[".U8 port.pin3"]}
          />
          <trace
            name="V3V3_LOCAL_D_BUZZ_1_C_BUZZ_1"
            from=".D_BUZZ port.pin1"
            to=".C_BUZZ port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".D_BUZZ port.pin1"
            pcbPath={[".D_BUZZ port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_R33_1_R_PD_PATH_1"
            from=".R33 port.pin1"
            to=".R_PD_PATH port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R33 port.pin1"
            pcbPath={[".R33 port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_C_BUZZ_1_BZ1_1"
            from=".C_BUZZ port.pin1"
            to=".BZ1 port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".C_BUZZ port.pin1"
            pcbPath={[".C_BUZZ port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_C11_1_L1_2"
            from=".C11 port.pin1"
            to=".L1 port.pin2"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".C11 port.pin1"
            pcbPath={[".C11 port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_C11_1_C12_1"
            from=".C11 port.pin1"
            to=".C12 port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".C11 port.pin1"
            pcbPath={[".C11 port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_R48_1_C_RESET_1"
            from=".R48 port.pin1"
            to=".C_RESET port.pin1"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R48 port.pin1"
            pcbPath={[".R48 port.pin1"]}
          />
          <trace
            name="V3V3_LOCAL_R_PD_PATH_1_U_MOTOR_INTERLOCK_5"
            from=".R_PD_PATH port.pin1"
            to=".U_MOTOR_INTERLOCK port.pin5"
            thickness="0.35mm"
            routingPhaseIndex={1}
            pcbPathRelativeTo=".R_PD_PATH port.pin1"
            pcbPath={[".R_PD_PATH port.pin1"]}
          />
        </>
      }
    />
  )
}

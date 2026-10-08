import { fanoutTracePath } from "@tscircuit/props"
import SmartNema14MotorController from "../src/SmartNema14MotorController"
import candidates from "../evidence/rev-0.0.52-alpha.0/routing/LOGIC013-SOURCE-CANDIDATES.json"

export default function Native52Logic020Capture() {
  return (
    <SmartNema14MotorController
      nativeRoutingNetNames={["V3V3"]}
      nativeRoutingTargets={["net.V3V3"]}
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
        </>
      }
    />
  )
}

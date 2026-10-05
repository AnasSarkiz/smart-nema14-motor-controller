import Controller from "../src/SmartNema14MotorController"

const links = [
  {
    from: ".SWCLK_MCU_ESCAPE > .top",
    to: ".SWCLK_PULLDOWN_FILLED > .top",
  },
]

/** Route just the missing MCU/pulldown trunk using native Pipeline9. */
export default function NativeSwclkPairPipeline9Cloud() {
  return (
    <Controller
      nativeAutorouterVersion="beta_pipeline9"
      nativeRoutingLinks={links}
      nativeRoutingTargets={links.flatMap((link) => [link.from, link.to])}
    />
  )
}

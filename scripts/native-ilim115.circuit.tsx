import Board from "./power-copper-trial.circuit"
export default function Trial115() {
  return (
    <Board
      nativeRoutingTargets={[
        ".R44 > .pin1",
        ".R45 > .pin1",
        ".U10 > .pin19",
        ".ILIM_DIVIDER_ESCAPE > .bottom",
      ]}
    />
  )
}

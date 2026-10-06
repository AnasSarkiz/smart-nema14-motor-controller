import { BoardLegend } from "../src/BoardLegend"

/** Isolate owned text for native Gerber measurements against the full board mask. */
export default function BoardLegendAudit() {
  return (
    <board width="35mm" height="35mm">
      <BoardLegend />
    </board>
  )
}

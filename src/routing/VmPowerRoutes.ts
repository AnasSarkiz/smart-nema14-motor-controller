import { fanoutTracePath, type FanoutTracePath } from "@tscircuit/props"
import saved from "./vm-power-paths.json"

const acceptedPaths = saved.paths.map((path) => fanoutTracePath.parse(path))

/** Keep accepted power fanouts frozen before subsequent selected-net routing. */
export function resolvePowerFanouts(
  enabled: boolean,
  trial?: { netNames: string[]; paths?: FanoutTracePath[] },
) {
  if (!enabled) return trial
  const overridden = trial?.netNames ?? []
  const retained = saved.net_names.filter((name) => !overridden.includes(name))
  return {
    netNames: [...retained, ...overridden],
    paths: [
      ...acceptedPaths.filter(() => retained.includes("VM")),
      ...(trial?.paths ?? []),
    ],
  }
}

import { motorLock, rearMountCenters } from "./motor-lock"

export function RearMountHoles() {
  return (
    <>
      <hole
        name="REAR_M1_6_1"
        pcbX={rearMountCenters[0].x}
        pcbY={rearMountCenters[0].y}
        diameter={motorLock.pcbClearanceHoleDiameterMm}
      />
      <hole
        name="REAR_M1_6_2"
        pcbX={rearMountCenters[1].x}
        pcbY={rearMountCenters[1].y}
        diameter={motorLock.pcbClearanceHoleDiameterMm}
      />
    </>
  )
}

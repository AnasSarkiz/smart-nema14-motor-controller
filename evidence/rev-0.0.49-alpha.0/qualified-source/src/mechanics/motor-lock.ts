/** Official Phidgets 3323_0 drawing 0DZ.252.001; rear view, wires toward -Y. */
export const motorLock = {
  model: "Phidgets 3323_0 / 35STH40-1004B",
  rearShaftDiameterMm: 3.9,
  rearShaftDiameterMinimumMm: 3.75,
  rearShaftProjectionMm: 12,
  rearShaftProjectionMinimumMm: 11.7,
  rearShaftProjectionMaximumMm: 12.7,
  rearHoleCircleDiameterMm: 14.5,
  rearHoleCircleToleranceMm: 0.15,
  rearHoleAngleDegrees: 40,
  maximumScrewPenetrationExclusiveMm: 2.5,
  // Diagnostic hardware proposal, not purchased/qualified assembly hardware.
  standoffLengthMm: 18.3,
  pcbThicknessMm: 1.6,
  pcbClearanceHoleDiameterMm: 2.2,
} as const

const rearHoleRadiusMm = motorLock.rearHoleCircleDiameterMm / 2
const rearHoleAngleRadians = (motorLock.rearHoleAngleDegrees * Math.PI) / 180

export const rearMountCenters = [
  {
    x: rearHoleRadiusMm * Math.cos(rearHoleAngleRadians),
    y: rearHoleRadiusMm * Math.sin(rearHoleAngleRadians),
  },
  {
    x: -rearHoleRadiusMm * Math.cos(rearHoleAngleRadians),
    y: -rearHoleRadiusMm * Math.sin(rearHoleAngleRadians),
  },
] as const

/** Assembly world origin is the PCB mid-plane; +Z points away from the motor. */
export const motorRearFaceZMm =
  -motorLock.standoffLengthMm - motorLock.pcbThicknessMm / 2

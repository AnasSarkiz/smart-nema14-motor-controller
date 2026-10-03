/** User-selected motor; official product page and drawing A0217, rev. 0. */
export const selectedMotor = {
  manufacturer: "STEPPERONLINE",
  model: "14HM11-0404S",
  stepUrl: "./references/motor/14hm11-0404s/14HM11-0404S.STEP",
  drawing: "A0217, revision 0, 2025-07-31",
  bodyLengthMaximumMm: 28.2,
  frameWidthMaximumMm: 35.2,
  shaftDiameterMm: 5,
  shaftProjectionMm: 24,
  shaftConfiguration: "single_shaft",
  rearEncoderMountStatus: "incompatible_with_previous_rear_shaft_magnet",
  encoderDecision: "open_loop_review_default_AS5600_unpopulated",
  mountingStatus:
    "front_flange_carrier_nominal_fit_only_unqualified_tolerances",
  ratedCurrentPerPhaseAmps: 0.4,
  phaseResistanceOhms: 25,
  phaseInductanceMilliHenries: 24,
  stepAngleDegrees: 0.9,
  fullStepsPerRevolution: 400,
  frontMountThread: "M3",
  frontMountSpacingMm: 26,
  frontMountMinimumThreadDepthMm: 4,
} as const

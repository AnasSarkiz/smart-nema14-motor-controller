# Front-flange carrier study — revision 0.0.14-alpha.0

This is a concrete mechanical prototype proposal for STEPPERONLINE
14HM11-0404S, drawing A0217 rev. 0. It is not a fabricated or strength-tested
mount. The manufacturer STEP is unchanged. The motor's four rear structural
fasteners are untouched.

The 35 × 35 × 1.6 mm PCB uses four independent Ø2.5 mm clearance holes on a
30.5 mm square. These match the proposed carrier's M2 supports. They do not
claim a rear motor mounting pattern. All copper layers have 2.5 mm radius
keepouts around the support axes, and component courtyards were placed outside
a more conservative 2.65 mm radius during placement.

The carrier attaches to the documented front 4×M3 / 26 ±0.2 mm square. The front
plate is 3 mm thick, with Ø3.8 mm bolt clearances and a Ø24 mm pilot/shaft opening.
Its side rails surround the motor body with nominal clearance; its return rails
are below the PCB connectors. The proposed machining tolerance is ±0.05 mm.
The material proposal is 6061-T6 aluminum. Material procurement, flatness,
electrical isolation, fastener drawings, loading and thermal expansion require
qualification before the carrier is released for manufacture.

The motor rear face is Z=-10 mm, front face Z=-38.2 mm, and PCB midplane Z=0.
The PCB-facing support surface is Z=-0.8 mm. Return rail surfaces end at Z=-4.8 mm
to reserve space for bottom-side mating connectors. Bosses are Ø4.5 mm. Native
motor coordinates and actual renderer coordinates are checked independently.

Proposed front bolts are M3×6, with a 3 mm head height / Ø5.5 mm head envelope.
Their nominal motor penetration is 3 mm, below the drawing's 4 mm minimum
available front thread depth. Proposed PCB bolts are M2×5, with a 0.5 mm washer;
nominal engagement is 2.9 mm into a 4.5 mm deep thread envelope. These are
dimensioned envelopes, not exact purchased fastener models. Exact hardware
tolerances, engagement, torque and retention must be checked before release.
For example, a ±0.2 mm screw-length assumption and PCB thickness ±10% give M2
engagement 2.49–3.31 mm with a 0.50 ±0.05 mm washer. This is a design calculation,
not a verified screw specification.

`generate-front-carrier.py` exports one connected valid carrier BRep and the
proposed fastener envelopes. `check-front-carrier.py` checks the exact unchanged
motor, exported carrier, four native holes, absence of routing, and conservative
bounding envelopes of every actual exported component mesh. There is no nominal
carrier/motor solid intersection. All 111 component envelopes clear the carrier
and fasteners; the measured minimum is approximately 0.85 mm. The mounted PNG
was inspected. Pairwise component envelope separation is greater than 0.1 mm.
These are nominal checks. They do not establish component supplier CAD accuracy,
production tolerance fit, strength or physical installation.

The JST SH catalogue housing/header page and JST GH mated-layout page were
visually inspected. JST SHR-10V-S with SSH-003T-P0.2-H contacts is the I/O mating
candidate; SHR-05V-S is the programmer candidate. GHR-04V-S with SSHL-002T-P0.2
contacts is the motor mating candidate. Their full harness/polarity, strain relief
and tolerance review remains pending. A USB-C overmold/cable must be specified;
the receptacle model alone does not qualify every possible cable.

The exploded +65 mm view remains an inspection view. The new mounted study is
`mounted-assembly.circuit.tsx`. Neither view is a hardware photograph. Routing
remains disabled while electrical protection, thermal loops and the remaining
placement gates are completed.

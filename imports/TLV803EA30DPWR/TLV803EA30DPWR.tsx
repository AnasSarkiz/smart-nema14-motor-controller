import objPath from "./TLV803EA30DPWR.obj"
import stepPath from "./TLV803EA30DPWR.step"
import type { ChipProps } from "@tscircuit/props"

const pinLabels = {
  pin1: ["N_RESET"],
  pin2: ["N_MR"],
  pin3: ["EP"],
  pin4: ["GND"],
  pin5: ["VDD"]
} as const

const pinAttributes = {
  pin4: {requiresGround: true},
  pin5: {requiresPower: true}
} as const

export const TLV803EA30DPWR = (props: ChipProps<typeof pinLabels>) => {
  return (
    <chip
      pinLabels={pinLabels}
      pinAttributes={pinAttributes}
      supplierPartNumbers={{
  "jlcpcb": [
    "C53283913"
  ]
}}
      manufacturerPartNumber="TLV803EA30DPWR"
      footprint={<footprint>
        <smtpad portHints={["pin3"]} pcbX="-0.0150241mm" pcbY="0.0001397mm" width="0.2199894mm" height="0.2199894mm" shape="rect" />
<smtpad portHints={["pin1"]} points={[{x: "-0.4950587mm", y: "0.3599815mm"}, {x: "-0.4950587mm", y: "0.1399921mm"}, {x: "-0.3150489mm", y: "0.1399921mm"}, {x: "-0.3050667mm", y: "0.1399921mm"}, {x: "-0.1550543mm", y: "0.2900045mm"}, {x: "-0.1550543mm", y: "0.3599815mm"}]} shape="polygon" />
<smtpad portHints={["pin4"]} points={[{x: "0.4950333mm", y: "-0.3599815mm"}, {x: "0.4950333mm", y: "-0.1399921mm"}, {x: "0.3150235mm", y: "-0.1399921mm"}, {x: "0.3050413mm", y: "-0.1399921mm"}, {x: "0.1550289mm", y: "-0.2900045mm"}, {x: "0.1550289mm", y: "-0.3599815mm"}]} shape="polygon" />
<smtpad portHints={["pin5"]} points={[{x: "0.4950587mm", y: "0.3599815mm"}, {x: "0.4950587mm", y: "0.1400175mm"}, {x: "0.3151251mm", y: "0.1400175mm"}, {x: "0.3050159mm", y: "0.1400175mm"}, {x: "0.1550035mm", y: "0.2900299mm"}, {x: "0.1550035mm", y: "0.3599815mm"}]} shape="polygon" />
<smtpad portHints={["pin2"]} points={[{x: "-0.4950333mm", y: "-0.3599815mm"}, {x: "-0.4950333mm", y: "-0.1400175mm"}, {x: "-0.3150997mm", y: "-0.1400175mm"}, {x: "-0.3049905mm", y: "-0.1400175mm"}, {x: "-0.1549781mm", y: "-0.2900299mm"}, {x: "-0.1549781mm", y: "-0.3599815mm"}]} shape="polygon" />
<silkscreenpath route={[{"x":0.38497510000001967,"y":-0.507987299999968},{"x":-0.41502329999991616,"y":-0.507987299999968}]} />
<silkscreenpath route={[{"x":0.38497510000001967,"y":0.5080127000001085},{"x":-0.41502329999991616,"y":0.5080127000001085}]} />
<silkscreencircle pcbX="-0.6500241mm" pcbY="0.2538857mm" radius="0.020066mm" />
<silkscreentext text="{NAME}" pcbX="-0.0927481mm" pcbY="1.5076317mm" anchorAlignment="center" fontSize="1mm" />
<courtyardoutline outline={[{"x":-0.7450586999999587,"y":0.6600195000000895},{"x":0.7450587000000723,"y":0.6600195000000895},{"x":0.7450587000000723,"y":-0.659994099999949},{"x":-0.7450586999999587,"y":-0.659994099999949},{"x":-0.7450586999999587,"y":0.6600195000000895}]} />
      </footprint>}
      cadModel={{
        objUrl: objPath,
        stepUrl: stepPath,
        pcbRotationOffset: 90,
        modelOriginPosition: { x: -0.000012700000070253736, y: -0.016052800000011302, z: 0 },
      }}
      {...props}
    />
  )
}
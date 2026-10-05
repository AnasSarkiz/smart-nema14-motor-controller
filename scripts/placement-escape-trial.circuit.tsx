import Board from "../index.circuit"
export default function PlacementEscapeTrial() {
  return (
    <Board
      mechanicalPreview
      usbRoutesEnabled={false}
      savedRoutesEnabled={false}
      routeRemaining={false}
    />
  )
}

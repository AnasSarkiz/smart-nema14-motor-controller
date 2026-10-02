import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0xe9edf1)
const scene = new THREE.Scene()
scene.add(new THREE.HemisphereLight(0xffffff, 0x697483, 3))
const light = new THREE.DirectionalLight(0xffffff, 3)
light.position.set(50, 100, 80)
scene.add(light)
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000)
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
const encodedGlb = document.getElementById("assembly-model").textContent.trim()
const binaryGlb = Uint8Array.from(atob(encodedGlb), (character) =>
  character.charCodeAt(0),
)
let motorMesh
const views = {
  complete: { position: [100, 55, 110], target: [0, 30, 0] },
  front: { position: [95, -45, 95], target: [0, 35, 0] },
  rear: { position: [70, 125, 70], target: [0, 35, 0] },
  side: { position: [130, 30, 0], target: [0, 30, 0] },
  board: { position: [48, 54, 48], target: [0, 0, 0] },
}

function setView(name) {
  const view = views[name]
  if (motorMesh) {
    motorMesh.visible = name !== "board"
    document.getElementById("motor").checked = motorMesh.visible
  }
  camera.position.set(...view.position)
  controls.target.set(...view.target)
  controls.update()
}

new GLTFLoader().parse(
  binaryGlb.buffer,
  "",
  ({ scene: assemblyScene }) => {
    scene.add(assemblyScene)
    motorMesh = assemblyScene.getObjectByName(
      "OfficialStepperOnline14hm11Motor",
    )
    document.getElementById("loading").hidden = true
    setView("complete")
  },
  (error) => {
    document.getElementById("loading").textContent =
      `Model loading failed: ${error.message}`
  },
)

for (const button of document.querySelectorAll("[data-view]")) {
  button.addEventListener("click", () => setView(button.dataset.view))
}

document.getElementById("motor").addEventListener("change", (event) => {
  if (motorMesh) motorMesh.visible = event.target.checked
})

function renderFrame() {
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(renderFrame)
}
renderFrame()

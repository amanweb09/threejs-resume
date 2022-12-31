import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000)

const INNER_WIDTH = window.innerWidth < 900 ? window.innerWidth : (window.innerWidth / 3)
const camera = new THREE.PerspectiveCamera(
  75,
  INNER_WIDTH / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(INNER_WIDTH, window.innerHeight)
camera.position.setZ(30)


const geometry = new THREE.TorusGeometry(10, 3, 16, 100)

const donutTexture = new THREE
  .TextureLoader()
  .load('/images/jupiter.jpg')
const material = new THREE.MeshStandardMaterial({
  map: donutTexture
})

const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xdcdcdc)
pointLight.position.set(5, 5, 5)

const ambientLight = new THREE.AmbientLight(0xdcdcdc)

scene.add(ambientLight, pointLight)

function addStars() {
  const geometry = new THREE.SphereGeometry(0.10)
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })

  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3)
    .fill('')
    .map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)
}

// new Array(200)
//   .fill('')
//   .map(() => addStars())

const chocoTexture = new THREE
  .TextureLoader()
  .load('/images/t1.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: chocoTexture
  })
)

scene.add(moon)


function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  renderer.render(scene, camera)
}

animate()
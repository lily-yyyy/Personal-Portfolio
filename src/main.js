import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";
import { folders } from "./content.js";

// -----------------------------------------------------------------------
// 1. CONFIG - the only bit you should need to touch to get your model showing
// -----------------------------------------------------------------------

// Put your downloaded .glb / .gltf file in public/models/ and set its
// filename here. Everything in public/ is served as-is by Vite, so a file
// at public/models/room.glb is fetched at runtime as "/models/room.glb".
// const MODEL_PATH = "/models2/scene.gltf";
const MODEL_PATH = `${import.meta.env.BASE_URL}models2/scene.gltf`;

// This must match the exact mesh name of the laptop inside your model.
// Move your mouse over the laptop once the room has loaded and read the
// name off the debug panel in the bottom left, then paste it here.
const LAPTOP_NAME = "Laptop_0";

// -----------------------------------------------------------------------
// 2. BASIC SCENE SETUP
// -----------------------------------------------------------------------

const canvas = document.getElementById("scene");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffd966);

const camera = new THREE.PerspectiveCamera(
  40,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// Just a placeholder position for the brief moment before the model loads.
// Once loading finishes, frameModel() (below) recalculates this based on
// your model's actual size and position, so you shouldn't need to touch
// these numbers.
camera.position.set(6, 6, 8);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = 1;

// OrbitControls is a development convenience so you can freely spin and
// zoom while you work. Most finished room-folio sites lock the camera to a
// fixed angle (or animate it with GSAP on scroll/click) instead of leaving
// free orbit on for visitors - that's a later step once you like the shot.
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

// -----------------------------------------------------------------------
// 3. LIGHTING
// -----------------------------------------------------------------------
// Most free room models come with no lights baked in (just materials), so
// the scene will look flat or completely black until you add some.

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444455, 1.2);
scene.add(hemiLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 2);
keyLight.position.set(5, 10, 7.5);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xaecbff, 0.5);
fillLight.position.set(-6, 4, -4);
scene.add(fillLight);

// -----------------------------------------------------------------------
// 4. LOAD THE MODEL
// -----------------------------------------------------------------------

const loadingScreen = document.getElementById("loading-screen");
const loadingText = document.getElementById("loading-text");

const dracoLoader = new DRACOLoader();
// Only needed if your model is Draco-compressed (Sketchfab sometimes offers
// this as an option). If you get a Draco-related console error, either
// download the uncompressed glTF instead, or point this at a CDN decoder:
// dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
dracoLoader.setDecoderPath("/draco/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

let roomModel = null;
// Meshes you want to be clickable/hoverable. Fill this in once you've used
// the debug panel (see section 5) to find your model's real mesh names.
// LAPTOP_NAME is included automatically, add any others alongside it.
const interactiveNames = [LAPTOP_NAME, "Bookshelf", "Window"];
const interactiveMeshes = [];

loader.load(
  MODEL_PATH,
  (gltf) => {
    roomModel = gltf.scene;

    roomModel.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (interactiveNames.includes(child.name)) {
          interactiveMeshes.push(child);
        }
      }
    });

    scene.add(roomModel);
    frameModel(roomModel);
    loadingScreen.classList.add("hidden");
  },
  (progress) => {
    if (progress.total) {
      const pct = Math.min(100, Math.round((progress.loaded / progress.total) * 100));
      loadingText.textContent = `Loading room... ${pct}%`;
    }
  },
  (error) => {
    console.error("Failed to load model:", error);
    loadingText.textContent =
      "Could not load model. Check the file path and console for details.";
  }
);

// Downloaded models almost never sit centered on the world origin, they
// keep whatever pivot the original artist used. Instead of guessing camera
// numbers, measure the model's actual bounding box after it loads, shift
// the model so its center sits at (0, 0, 0), then place the camera and
// orbit target based on the model's real size. This is what fixes "the
// room shows up near the top / off to one side instead of centered".
function frameModel(model) {
  const box = new THREE.Box3().setFromObject(model);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // Re-center the model itself, so (0, 0, 0) is always its middle from
  // here on, regardless of how it was originally authored.
  model.position.sub(center);

  // Distance needed so the model's largest dimension fits inside the
  // camera's field of view, with a bit of padding so it isn't edge to edge.
  const maxDimension = Math.max(size.x, size.y, size.z);
  const fovInRadians = (camera.fov * Math.PI) / 180;
  const distance = (maxDimension / 2 / Math.tan(fovInRadians / 2)) * 1.6;

  // The room's floor is much closer to the camera than the back wall, so it
  // visually dominates the lower part of the frame while the far wall gets
  // compressed near the top, even though the box's exact geometric center
  // is dead center of the screen. Aiming slightly above that exact center
  // compensates for this and pushes the picture down within the frame.
  // If the room still looks off after this, raise or lower this fraction
  // (0 = no adjustment, exact geometric center; try values between 0.1 and
  // 0.3) rather than touching anything else in this function.
  const verticalBiasFraction = 0.18;
  const verticalBias = size.y * verticalBiasFraction;

  const target = new THREE.Vector3(0, verticalBias, 0);
  controls.target.copy(target);

  camera.position.set(
    target.x + distance * 0.7,
    target.y + distance * 0.6,
    target.z + distance * 0.7
  );
  camera.near = distance / 100;
  camera.far = distance * 20;
  camera.updateProjectionMatrix();

  // The shadow camera only renders shadow detail inside a fixed box by
// default, about 10 units across, which is too small for a full room.
// Size it to the model instead, so shadows cover the whole scene rather
// than cutting off partway through with a hard visible edge.
// const shadowCamSize = maxDimension * 0.75;
// keyLight.shadow.camera.left = -shadowCamSize;
// keyLight.shadow.camera.right = shadowCamSize;
// keyLight.shadow.camera.top = shadowCamSize;
// keyLight.shadow.camera.bottom = -shadowCamSize;
// keyLight.shadow.camera.near = 0.5;
// keyLight.shadow.camera.far = shadowCamSize * 4;
// keyLight.shadow.camera.updateProjectionMatrix();

  controls.update();
}

// -----------------------------------------------------------------------
// 5. HOVER / CLICK INTERACTION
// -----------------------------------------------------------------------
// This is deliberately verbose right now so you can use it to discover
// your model's mesh names (watch the bottom-left debug panel while you
// move your mouse over the room), then narrow interactiveNames above to
// the objects you actually want to be clickable.

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
// const debugPanel = document.getElementById("debug-panel");

function updatePointer(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("pointermove", (event) => {
  updatePointer(event);

  if (!roomModel) return;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObject(roomModel, true);

  if (hits.length > 0) {
    // debugPanel.textContent = `Hovering: ${hits[0].object.name || "(unnamed mesh)"}`;
    document.body.style.cursor = interactiveMeshes.includes(hits[0].object)
      ? "pointer"
      : "default";
  } else {
    // debugPanel.textContent = "Hover an object to see its name";
    document.body.style.cursor = "default";
  }
});

window.addEventListener("click", (event) => {
  updatePointer(event);

  // Ignore clicks on the 3D scene while the laptop UI is already open, so
  // you can't accidentally click something behind the overlay.
  if (!roomModel || laptopOpen) return;

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactiveMeshes, true);

  if (hits.length > 0) {
    onObjectClicked(hits[0].object);
  }
});

function onObjectClicked(object) {
  if (object.name === LAPTOP_NAME) {
    openLaptop(object);
  } else {
    // Wire up any other clickable objects the same way: add a name check
    // here and call your own function, the same pattern as openLaptop.
    console.log(`Clicked: ${object.name}`);
  }
}

// -----------------------------------------------------------------------
// 5b. LAPTOP "DESKTOP" UI
// -----------------------------------------------------------------------
// Clicking the laptop animates the camera toward it with GSAP, then shows
// a full-screen "desktop" of folder icons built from src/content.js.
// Clicking a folder opens a window with that folder's content.

const laptopOverlay = document.getElementById("laptop-overlay");
const laptopCloseBtn = document.getElementById("laptop-close");
const desktopIconsEl = document.getElementById("desktop-icons");
const contentWindow = document.getElementById("content-window");
const windowCloseBtn = document.getElementById("window-close");
const windowTitleEl = document.getElementById("window-title");
const windowBodyEl = document.getElementById("window-body");

let laptopOpen = false;
let cameraStateBeforeZoom = null;

// Build the folder icons once, from content.js. This doesn't depend on the
// 3D model, so it runs immediately rather than waiting for the room to load.
folders.forEach((folder) => {
  const button = document.createElement("button");
  button.className = "desktop-icon";
  button.innerHTML = `
    <span class="desktop-icon-glyph">${folder.icon}</span>
    <span class="desktop-icon-label">${folder.label}</span>
  `;
  button.addEventListener("click", () => openWindow(folder));
  desktopIconsEl.appendChild(button);
});

function openWindow(folder) {
  windowTitleEl.textContent = folder.label;
  windowBodyEl.innerHTML = folder.body;
  contentWindow.classList.remove("hidden");
}

function closeWindow() {
  contentWindow.classList.add("hidden");
}

function openLaptop(object) {
  if (laptopOpen) return;
  laptopOpen = true;
  controls.enabled = false;

  // Remember where the camera was so we can animate back to it later.
  cameraStateBeforeZoom = {
    position: camera.position.clone(),
    target: controls.target.clone(),
  };

  const laptopWorldPosition = new THREE.Vector3();
  object.getWorldPosition(laptopWorldPosition);

  // Move partway from the current camera position toward the laptop,
  // rather than all the way to it, so the camera doesn't clip through the
  // mesh. Raise this fraction toward 1 for a closer zoom, lower it for a
  // more subtle one.
  const zoomPosition = camera.position.clone().lerp(laptopWorldPosition, 0.55);

  gsap.to(camera.position, {
    x: zoomPosition.x,
    y: zoomPosition.y,
    z: zoomPosition.z,
    duration: 1.1,
    ease: "power2.inOut",
  });

  gsap.to(controls.target, {
    x: laptopWorldPosition.x,
    y: laptopWorldPosition.y,
    z: laptopWorldPosition.z,
    duration: 1.1,
    ease: "power2.inOut",
    onComplete: () => {
      laptopOverlay.classList.remove("hidden");
    },
  });
}

function closeLaptop() {
  if (!laptopOpen || !cameraStateBeforeZoom) return;
  laptopOpen = false;

  laptopOverlay.classList.add("hidden");
  closeWindow();

  gsap.to(camera.position, {
    x: cameraStateBeforeZoom.position.x,
    y: cameraStateBeforeZoom.position.y,
    z: cameraStateBeforeZoom.position.z,
    duration: 1,
    ease: "power2.inOut",
  });

  gsap.to(controls.target, {
    x: cameraStateBeforeZoom.target.x,
    y: cameraStateBeforeZoom.target.y,
    z: cameraStateBeforeZoom.target.z,
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      controls.enabled = true;
    },
  });
}

laptopCloseBtn.addEventListener("click", closeLaptop);
windowCloseBtn.addEventListener("click", closeWindow);

// Escape closes whichever layer is currently open: a folder window first,
// then the laptop desktop itself.
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!contentWindow.classList.contains("hidden")) {
    closeWindow();
  } else if (laptopOpen) {
    closeLaptop();
  }
});

// -----------------------------------------------------------------------
// 6. RESIZE HANDLING + RENDER LOOP
// -----------------------------------------------------------------------

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

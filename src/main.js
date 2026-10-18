import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";
import { folders, ui } from "./content.js";

// -----------------------------------------------------------------------
// 0. LANGUAGE (English / 中文)
// -----------------------------------------------------------------------
// Pick the starting language in this order:
//   1. ?lang=zh or ?lang=en in the URL (so you can share a Chinese link)
//   2. whatever the visitor picked last time (saved in localStorage)
//   3. the browser's own language (Chinese browsers get Chinese)
const SUPPORTED_LANGS = ["en", "zh"];
const LANG_STORAGE_KEY = "portfolio-lang";

function getInitialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (SUPPORTED_LANGS.includes(fromUrl)) return fromUrl;

  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // Storage can be blocked (private mode etc.), that's fine.
  }

  return (navigator.language || "").toLowerCase().startsWith("zh") ? "zh" : "en";
}

let currentLang = getInitialLang();

// Look up an interface string in the current language.
function t(key) {
  return ui[currentLang][key] ?? ui.en[key] ?? key;
}

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
let loadingPct = 0;
let loadFailed = false;
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
      loadingPct = pct;
      loadingText.textContent = t("loading").replace("{pct}", pct);
    }
  },
  (error) => {
    console.error("Failed to load model:", error);
    loadFailed = true;
    loadingText.textContent = t("loadError");
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

let pointerDownPos = null;

window.addEventListener("pointerdown", (event) => {
  // Only clicks that start on the 3D canvas count. Otherwise clicking a
  // button (like the language switch) could also "click" whatever object
  // happens to be behind it in the room.
  if (event.target !== canvas) {
    pointerDownPos = null;
    return;
  }
  pointerDownPos = { x: event.clientX, y: event.clientY };
});

window.addEventListener("pointerup", (event) => {
  if (!pointerDownPos) return;
  const dx = event.clientX - pointerDownPos.x;
  const dy = event.clientY - pointerDownPos.y;
  const dragDistance = Math.hypot(dx, dy);
  pointerDownPos = null;

  // If the pointer moved more than a few pixels, treat it as an orbit
  // drag rather than a tap/click on an object.
  if (dragDistance > 10) return;

  updatePointer(event);

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
// 5b. "LILY OS" - THE SIMULATED LAPTOP DESKTOP
// -----------------------------------------------------------------------
// Clicking the laptop zooms the camera in, then fades into a pretend
// operating system: a menu bar, desktop icons, a dock, and real windows
// that can be dragged, minimised and closed. Everything inside comes
// from src/content.js.

const osEl = document.getElementById("os");
const osBootEl = document.getElementById("os-boot");
const desktopIconsEl = document.getElementById("desktop-icons");
const osWindowsEl = document.getElementById("os-windows");
const osDockEl = document.getElementById("os-dock");
const osClockEl = document.getElementById("os-clock");
const osLangBtn = document.getElementById("os-lang");
const osPowerBtn = document.getElementById("os-power");
const langToggleBtn = document.getElementById("lang-toggle");

let laptopOpen = false;
let cameraStateBeforeZoom = null;
let hasBooted = false;

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallScreen = () => window.matchMedia("(max-width: 700px)").matches;

// Every open window, keyed by folder id: { el, folder, minimized }
const openWindows = new Map();
let topZ = 10;
let cascadeStep = 0;

// ---- Folder content ----------------------------------------------------

// Turn a folder's `timeline` list (see content.js) into HTML.
function renderTimeline(entries) {
  const items = entries
    .map(
      (entry) => `
      <li class="timeline-item">
        <p class="timeline-date">${entry.date[currentLang]}</p>
        <h3 class="timeline-title">${entry.title[currentLang]}</h3>
        <p class="timeline-org">${entry.org[currentLang]}</p>
        ${entry.highlight ? `<p class="timeline-highlight">${entry.highlight[currentLang]}</p>` : ""}
        ${
          entry.details
            ? `<details class="timeline-more">
                 <summary>${t("showDetails")}</summary>
                 <div class="timeline-details">${entry.details[currentLang]}</div>
               </details>`
            : ""
        }
      </li>`
    )
    .join("");
  return `<ol class="timeline">${items}</ol>`;
}

function folderContentHtml(folder) {
  let html = folder.body ? folder.body[currentLang] : "";
  if (folder.timeline) html += renderTimeline(folder.timeline);
  return html;
}

// ---- Desktop icons and dock --------------------------------------------

function renderDesktopIcons() {
  desktopIconsEl.innerHTML = "";
  folders.forEach((folder) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "desktop-icon";
    button.innerHTML = `
      <span class="desktop-icon-tile" aria-hidden="true">${folder.icon}</span>
      <span class="desktop-icon-label">${folder.label[currentLang]}</span>
    `;
    button.addEventListener("click", () => openWindow(folder));
    desktopIconsEl.appendChild(button);
  });
}

function renderDock() {
  osDockEl.innerHTML = "";
  folders.forEach((folder) => {
    const win = openWindows.get(folder.id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "dock-item" + (win ? " is-open" : "");
    button.title = folder.label[currentLang];
    button.setAttribute("aria-label", folder.label[currentLang]);
    button.innerHTML = `<span aria-hidden="true">${folder.icon}</span>`;
    button.addEventListener("click", () => {
      // Clicking the focused window's dock icon tucks it away, like a real OS.
      if (win && !win.minimized && win === topmostWindow()) minimizeWindow(folder.id);
      else openWindow(folder);
    });
    osDockEl.appendChild(button);
  });
}

// ---- Windows -----------------------------------------------------------

function topmostWindow() {
  let best = null;
  openWindows.forEach((win) => {
    if (win.minimized) return;
    if (!best || Number(win.el.style.zIndex) > Number(best.el.style.zIndex)) best = win;
  });
  return best;
}

function focusWindow(win) {
  win.el.style.zIndex = ++topZ;
  openWindows.forEach((other) => other.el.classList.toggle("is-focused", other === win));
}

function renderWindowContent(win) {
  win.el.querySelector(".os-window-title").textContent = win.folder.label[currentLang];
  win.el.querySelector('[data-action="close"]').setAttribute("aria-label", t("close"));
  win.el.querySelector('[data-action="min"]').setAttribute("aria-label", t("minimize"));

  const body = win.el.querySelector(".os-window-body");
  body.innerHTML = folderContentHtml(win.folder);

  // Swap the "Show details" / "Hide details" label as entries open and close.
  body.querySelectorAll("details.timeline-more").forEach((el) => {
    el.addEventListener("toggle", () => {
      el.querySelector("summary").textContent = el.open ? t("hideDetails") : t("showDetails");
    });
  });
}

// New windows open near the middle, each a little lower and to the right
// of the last, so they never stack exactly on top of each other.
function placeNewWindow(el) {
  if (isSmallScreen()) return; // On phones CSS makes every window full screen.
  const area = osWindowsEl.getBoundingClientRect();
  const offset = (cascadeStep++ % 6) * 28;
  const left = (area.width - el.offsetWidth) / 2 - 60 + offset;
  const top = 28 + offset;
  el.style.left = `${Math.max(16, Math.min(left, area.width - el.offsetWidth - 16))}px`;
  const finalTop = Math.max(12, Math.min(top, area.height - el.offsetHeight - 12));
  el.style.top = `${finalTop}px`;
  // Stop tall windows above the dock instead of running behind it.
  el.style.maxHeight = `${area.height - finalTop - 110}px`;
}

function makeDraggable(el, handle) {
  handle.addEventListener("pointerdown", (event) => {
    if (isSmallScreen() || event.target.closest("button")) return;
    const area = osWindowsEl.getBoundingClientRect();
    const startX = event.clientX;
    const startY = event.clientY;
    const startLeft = el.offsetLeft;
    const startTop = el.offsetTop;

    handle.setPointerCapture(event.pointerId);
    el.classList.add("is-dragging");

    const onMove = (moveEvent) => {
      // Keep at least part of the title bar on screen so it can be grabbed again.
      const left = Math.min(Math.max(startLeft + moveEvent.clientX - startX, 80 - el.offsetWidth), area.width - 80);
      const top = Math.min(Math.max(startTop + moveEvent.clientY - startY, 0), area.height - 48);
      el.style.left = `${left}px`;
      el.style.top = `${top}px`;
    };
    const onUp = () => {
      el.classList.remove("is-dragging");
      handle.removeEventListener("pointermove", onMove);
      handle.removeEventListener("pointerup", onUp);
      handle.removeEventListener("pointercancel", onUp);
    };
    handle.addEventListener("pointermove", onMove);
    handle.addEventListener("pointerup", onUp);
    handle.addEventListener("pointercancel", onUp);
  });
}

function openWindow(folder) {
  const existing = openWindows.get(folder.id);
  if (existing) {
    existing.minimized = false;
    existing.el.hidden = false;
    focusWindow(existing);
    renderDock();
    return;
  }

  const el = document.createElement("section");
  el.className = "os-window" + (folder.timeline ? " is-wide" : "");
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-labelledby", `window-title-${folder.id}`);
  el.innerHTML = `
    <header class="os-window-bar">
      <h2 class="os-window-title" id="window-title-${folder.id}"></h2>
      <div class="os-window-buttons">
        <button type="button" class="os-window-btn" data-action="min"><span aria-hidden="true">&minus;</span></button>
        <button type="button" class="os-window-btn" data-action="close"><span aria-hidden="true">&times;</span></button>
      </div>
    </header>
    <div class="os-window-body"></div>
  `;
  osWindowsEl.appendChild(el);

  const win = { el, folder, minimized: false };
  openWindows.set(folder.id, win);

  renderWindowContent(win);
  placeNewWindow(el);
  makeDraggable(el, el.querySelector(".os-window-bar"));

  el.addEventListener("pointerdown", () => focusWindow(win));
  el.querySelector('[data-action="close"]').addEventListener("click", () => closeWindow(folder.id));
  el.querySelector('[data-action="min"]').addEventListener("click", () => minimizeWindow(folder.id));

  focusWindow(win);
  renderDock();
}

function closeWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.el.remove();
  openWindows.delete(id);
  const next = topmostWindow();
  if (next) focusWindow(next);
  renderDock();
}

function minimizeWindow(id) {
  const win = openWindows.get(id);
  if (!win) return;
  win.minimized = true;
  win.el.hidden = true;
  const next = topmostWindow();
  if (next) focusWindow(next);
  renderDock();
}

function closeAllWindows() {
  [...openWindows.keys()].forEach(closeWindow);
  cascadeStep = 0;
}

// ---- Menu bar clock and start-up screen --------------------------------

function updateClock() {
  osClockEl.textContent = new Intl.DateTimeFormat(currentLang === "zh" ? "zh-CN" : "en-AU", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}
setInterval(updateClock, 20000);

// The start-up screen only plays the first time per visit.
function bootOS() {
  if (hasBooted || prefersReducedMotion) {
    hasBooted = true;
    osBootEl.classList.add("is-done");
    return;
  }
  hasBooted = true;
  osBootEl.classList.remove("is-done");
  setTimeout(() => osBootEl.classList.add("is-done"), 1500);
}

// ---- Opening and closing the laptop ------------------------------------

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
  // mesh. Raise this fraction toward 1 for a closer zoom.
  const zoomPosition = camera.position.clone().lerp(laptopWorldPosition, 0.7);

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
      updateClock();
      bootOS();
      document.body.classList.add("os-open");
      osEl.classList.remove("hidden");
    },
  });
}

function closeLaptop() {
  if (!laptopOpen || !cameraStateBeforeZoom) return;
  laptopOpen = false;

  osEl.classList.add("hidden");
  document.body.classList.remove("os-open");
  closeAllWindows();

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

osPowerBtn.addEventListener("click", closeLaptop);

// Clicking anywhere on the desktop outside a window (the wallpaper or the
// sticky note) closes the window in front, like dismissing a pop-up.
// Clicks on windows, folder icons and the dock keep working as normal.
document.getElementById("os-desktop").addEventListener("click", (event) => {
  // composedPath() is recorded when the click happens, so it still works when
  // the click itself removed the element (e.g. the × button closing a window).
  const insideSomething = event
    .composedPath()
    .some((el) => el instanceof Element && el.matches(".os-window, .desktop-icon, #os-dock"));
  if (insideSomething) return;
  const top = topmostWindow();
  if (top) closeWindow(top.folder.id);
});

// Escape closes the front window first, then leaves the laptop.
window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !laptopOpen) return;
  const top = topmostWindow();
  if (top) closeWindow(top.folder.id);
  else closeLaptop();
});

// ---- Language ----------------------------------------------------------

// Swap every piece of visible text over to the given language.
function applyLanguage(lang) {
  currentLang = lang;

  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  loadingText.textContent = loadFailed
    ? t("loadError")
    : t("loading").replace("{pct}", loadingPct);

  [langToggleBtn, osLangBtn].forEach((btn) => {
    btn.textContent = t("langToggle");
    btn.setAttribute("aria-label", t("langToggleLabel"));
  });

  renderDesktopIcons();
  renderDock();
  openWindows.forEach(renderWindowContent);
  updateClock();
}

function toggleLanguage() {
  const next = currentLang === "en" ? "zh" : "en";
  applyLanguage(next);

  try {
    localStorage.setItem(LANG_STORAGE_KEY, next);
  } catch {
    // Ignore, the switch still works for this visit.
  }

  // Keep the address bar in sync, so copying the link shares this language.
  const url = new URL(window.location.href);
  url.searchParams.set("lang", next);
  history.replaceState(null, "", url);
}

langToggleBtn.addEventListener("click", toggleLanguage);
osLangBtn.addEventListener("click", toggleLanguage);

applyLanguage(currentLang);

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

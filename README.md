# Room Portfolio Starter

A minimal Three.js + Vite starter for building an interactive 3D room
portfolio, in the style of sooahs-room-folio. No 3D modeling required, it
expects you to load a downloaded model (e.g. from Sketchfab).

## Requirements

You need Node.js installed (version 18 or newer is fine). Check with:

    node --version

If that fails, install Node from nodejs.org first.

## 1. Install dependencies

    npm install

## 2. Add your model

Put your downloaded `.glb` (or `.gltf` plus its `.bin` and texture files)
into `public/models/`. Then open `src/main.js` and update this line near
the top to match your filename:

    const MODEL_PATH = "/models/your-file-name.glb";

## 3. Run it

    npm run dev

Open the local URL it prints (usually `http://localhost:5173`). You should
see your room. If the screen stays black or the model never appears, open
your browser's developer console (F12) and check for errors, the most
common ones are:

- Wrong file path or filename typo in MODEL_PATH
- A Draco compression error (see the comment in main.js above `dracoLoader`)
- The model loaded but is enormous or tiny compared to the camera, try
  changing `camera.position.set(6, 6, 8)` to larger or smaller numbers

## 4. Find your model's object names

Move your mouse over the room. The dark panel in the bottom left corner
shows the name of whatever mesh is under your cursor. Use this to find out
what your laptop, bookshelf, window, etc. are actually called inside the
model (every model names things differently).

Once you know the names, update the `interactiveNames` array in
`src/main.js` to list the ones you want to be clickable, and fill in
`onObjectClicked()` with what should happen for each one, for example
scrolling to a section of the page, opening a project modal, or animating
the camera closer with GSAP.

You can delete the debug panel (`#debug-panel` in index.html and its
related code in main.js) once you're done using it.

## 5. Build for deployment

    npm run build

This produces a `dist/` folder you can deploy to any static host
(Cloudflare Pages, Netlify, Vercel, GitHub Pages all work well and are
free for a personal site).

## What's in here, and why

- **Three.js**: the core 3D rendering engine
- **GSAP**: not wired up to anything yet, but included because it's the
  standard choice for animating the camera and objects (for example, an
  intro camera fly-in, or moving closer when an object is clicked)
- **OrbitControls**: lets you freely rotate and zoom while developing.
  Most finished room-folio sites replace this with a fixed or
  scroll-controlled camera once the room itself looks right, free orbit is
  just a convenience for building
- **GLTFLoader / DRACOLoader**: loads your downloaded model. DRACOLoader
  is only needed if your specific model is Draco-compressed

## Suggested next steps, roughly in order

1. Get the model showing and lit reasonably well
2. Adjust the camera to a shot you like
3. Identify and wire up 2 or 3 clickable objects
4. Add real content behind each click (project details, resume link,
   contact info) instead of the console.log placeholder
5. Replace free orbiting with a fixed camera or a GSAP-driven one
6. Compress the model (see note below) and deploy

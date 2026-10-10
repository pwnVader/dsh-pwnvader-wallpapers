window.__ModuleLoader__.load({id:"dsh-pwnvader-wallpapers",factory:(require)=>{var module={exports:{}},exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.js
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(client_exports);

// src/core.js
var ID = "dsh-pwnvader-wallpapers";
var KEY = ID + ":v1";
var SCENES = ["none", "aurora", "ocean", "space", "ascii-aurora", "ascii-aurora-fjord", "ascii-earthrise", "ascii-matrix-rain", "ascii-night-coast", "ascii-starfield", "local"];
var DEFAULTS = Object.freeze({ version: 1, scene: "aurora", brightness: 1, scrim: 0.3, speed: 1, fps: 20, fit: "cover", paused: false, power: "saver", shuffle: "off" });
var number = (v, d, min, max) => typeof v === "number" && Number.isFinite(v) ? Math.max(min, Math.min(max, v)) : d;
function normalize(v) {
  v = v && typeof v === "object" ? v : {};
  return { version: 1, scene: SCENES.includes(v.scene) ? v.scene : DEFAULTS.scene, brightness: number(v.brightness, 1, 0.2, 1.5), scrim: number(v.scrim, 0.3, 0, 0.85), speed: number(v.speed, 1, 0.1, 2), fps: Math.round(number(v.fps, 20, 5, 30)), fit: v.fit === "contain" ? "contain" : "cover", paused: v.paused === true, power: v.power === "smooth" ? "smooth" : "saver", shuffle: ["off", "startup", "hourly"].includes(v.shuffle) ? v.shuffle : "off" };
}
function nextScene(current, random = Math.random) {
  const choices = SCENES.filter((s) => !["none", "local", current].includes(s));
  return choices[Math.min(choices.length - 1, Math.max(0, Math.floor(random() * choices.length)))];
}
function frameRate(s, { hidden = false, reduced = false, idle = 0 } = {}) {
  return s.paused || hidden || reduced || s.scene === "none" ? 0 : s.power === "saver" && idle > 3e4 ? Math.min(5, s.fps) : s.fps;
}
function validateMedia(file) {
  const types = ["image/png", "image/jpeg", "image/webp", "image/avif", "video/mp4", "video/webm"];
  if (!types.includes(file.type)) throw Error("Usa PNG, JPEG, WebP, AVIF, MP4 o WebM.");
  const limit = file.type.startsWith("video/") ? 200 * 1024 ** 2 : 64 * 1024 ** 2;
  if (file.size > limit) throw Error("El archivo supera el l\xEDmite: im\xE1genes 64 MiB, videos 200 MiB.");
  return file.type.startsWith("video/") ? "video" : "image";
}
function fitRect(width, height2, sourceWidth, sourceHeight, fit = "cover") {
  const ratio = (fit === "contain" ? Math.min : Math.max)(width / sourceWidth, height2 / sourceHeight);
  return { x: (width - sourceWidth * ratio) / 2, y: (height2 - sourceHeight * ratio) / 2, width: sourceWidth * ratio, height: sourceHeight * ratio };
}

// vendor/ascii-rest/aurora.ts
var aurora_exports = {};
__export(aurora_exports, {
  default: () => aurora,
  meta: () => meta
});
var meta = {
  name: "aurora",
  category: "nature",
  note: "an aurora curtain rippling over a treeline under stars",
  cols: 64,
  rows: 20,
  fps: 20
};
var RAMP = " .:!|I";
var TAU = Math.PI * 2;
var HEM = 12;
var RIDGE = 18;
var mulberry32 = (a) => () => {
  a = a + 1831565813 | 0;
  let t = Math.imul(a ^ a >>> 15, 1 | a);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
var hash = (x, y) => {
  let h = Math.imul(x, 668265261) ^ Math.imul(y, 374761393);
  h = Math.imul(h ^ h >>> 15, 2246822507);
  h = Math.imul(h ^ h >>> 13, 3266489909);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
};
var ease = (t) => t * t * (3 - 2 * t);
function noise(x, y) {
  const i = Math.floor(x), j = Math.floor(y), u = ease(x - i), v = ease(y - j);
  const a = hash(i, j), b = hash(i + 1, j), c = hash(i, j + 1), d = hash(i + 1, j + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function aurora() {
  const { cols, rows } = meta;
  const rand = mulberry32(5);
  const land = new Array(cols * rows).fill(null);
  for (let c = 0; c < cols; c++) {
    land[c + RIDGE * cols] = Math.sin(c * 0.13 + 1) > 0.3 ? "\u2588" : "\u2584";
    for (let r = RIDGE + 1; r < rows; r++) land[c + r * cols] = "\u2588";
  }
  for (let x = 1 + Math.floor(rand() * 2); x < cols - 1; ) {
    const tall = 2 + Math.floor(rand() * 2.2 + rand() * rand() * 2.5);
    for (let k = 0; k < tall; k++) {
      const r = RIDGE - tall + k, half = 1 + (k >> 1);
      for (let c = x - half + 1; c <= x + half; c++) {
        if (c < 0 || c >= cols) continue;
        const left = c === x - half + 1, right = c === x + half;
        land[c + r * cols] = left ? k & 1 ? "\u259F" : "\u2597" : right ? k & 1 ? "\u2599" : "\u2596" : "\u2588";
      }
    }
    for (let c = x - (tall >> 1); c <= x + 1 + (tall >> 1); c++) if (c >= 0 && c < cols) land[c + RIDGE * cols] = "\u2588";
    x += 2 + 2 * (tall >> 1) + 1 + Math.floor(rand() * 3);
  }
  const stars = [];
  while (stars.length < 40) {
    const c = Math.floor(rand() * cols), r = Math.floor(rand() * rand() * (HEM + 2));
    stars.push({ k: c + r * cols, bright: rand() < 0.2, rate: 0.3 + rand() * 1.1, ph: rand() * TAU });
  }
  const field = new Float32Array(cols * rows);
  const out = new Array(cols * rows);
  return (t) => {
    field.fill(0);
    for (let c = 0; c < cols; c++) {
      const x = c + 0.5;
      const y0 = HEM + 1.2 * Math.sin(x * 0.12 + t * 0.35) + 0.55 * Math.sin(x * 0.31 - t * 0.7 + 1);
      const slope = 1.2 * 0.12 * Math.cos(x * 0.12 + t * 0.35) + 0.55 * 0.31 * Math.cos(x * 0.31 - t * 0.7 + 1);
      const lit = (0.62 + 0.4 * ease(noise(x * 0.07 - t * 0.25, 3.3))) * (1 + 0.9 * Math.min(1, Math.abs(slope) * 2));
      const ray = ease(Math.min(1, Math.max(0, (noise(x * 0.9 - t * 1.4, 7 + t * 0.3) - 0.3) / 0.45)));
      const height2 = 1.5 + 6.5 * ray * (0.6 + 0.6 * noise(x * 0.12 + t * 0.15, 11));
      for (let r = 0; r < rows; r++) {
        const d = y0 - (r + 0.5);
        const hem = Math.exp(-((Math.max(0, Math.abs(d) - 0.5) / (d > 0 ? 0.6 : 0.35)) ** 2));
        const v = Math.max(hem, d >= 0 ? (0.3 + 0.7 * ray) * Math.max(0, 1 - d / height2) ** 1.4 : Math.exp(d / 1.5) * (0.4 + 0.4 * ray));
        field[c + r * cols] = lit * v;
      }
    }
    for (let k = 0; k < cols * rows; k++) {
      const b = field[k] - 0.12;
      out[k] = land[k] || (b > 0 ? RAMP[Math.min(RAMP.length - 1, 1 + Math.floor(b * 5))] : " ");
    }
    for (const s of stars) {
      if (out[s.k] !== " ") continue;
      const tw = Math.sin(t * s.rate * TAU + s.ph);
      out[s.k] = s.bright ? tw > 0.3 ? "+" : "*" : tw > -0.6 ? "." : " ";
    }
    const lines = [];
    for (let r = 0; r < rows; r++) lines.push(out.slice(r * cols, (r + 1) * cols).join(""));
    return lines.join("\n");
  };
}

// vendor/ascii-rest/aurora-fjord.ts
var aurora_fjord_exports = {};
__export(aurora_fjord_exports, {
  default: () => auroraFjord,
  meta: () => meta2
});
var meta2 = {
  name: "aurora fjord",
  category: "scenes",
  note: "aurora curtains rippling over a still fjord, a cabin lit on the shore",
  cols: 200,
  rows: 100,
  cell: 1,
  fps: 15,
  ground: "#05080f",
  palette: [
    "#0b1322",
    "#101b30",
    "#16243f",
    "#1e3050",
    "#2a3f63",
    "#0e3a33",
    "#11573f",
    "#167a4c",
    "#22a05c",
    "#3ccb73",
    "#7cf0a0",
    "#c8ffdc",
    "#0f5f5c",
    "#16877f",
    "#2cb5a6",
    "#7fe6d6",
    "#2a1f52",
    "#432b78",
    "#6a3c9f",
    "#9558c6",
    "#c48ae4",
    "#363a72",
    "#4f5596",
    "#1b4f63",
    "#1a2236",
    "#283350",
    "#3b4a6e",
    "#566a92",
    "#7d91b8",
    "#a9bad9",
    "#d6e0f2",
    "#9fc9cf",
    "#0f1a1c",
    "#173128",
    "#24493a",
    "#4a1517",
    "#7c2420",
    "#b23a2a",
    "#d65aa8",
    "#ffd27c",
    "#ffb04a",
    "#fff2c4",
    "#eef3ff"
  ]
};
var W = 200;
var H = 100;
var WL = 62;
var DOTS = " \xB7\u2022\u25CF";
var COVER = [0, 0.3, 0.6, 1];
var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16 - 0.47);
var AIR = 0;
var NEAR = 1;
var FAR = 2;
var SHORE = 3;
var WALL = 4;
var ROOF = 5;
var PANE = 6;
var TREE = 7;
var DOOR = 8;
var CAB = [142, 161];
var PANES = [[145, 148], [156, 159]];
var DOOR_X = [150, 152];
var LAMPS = [[147, 1], [158, 0.8]];
function hash2(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ h >>> 13, 1274126177);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}
function noise2(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = x - xi, fy = y - yi;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash2(xi, yi), b = hash2(xi + 1, yi), c = hash2(xi, yi + 1), d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm(x, y, octaves) {
  let s = 0, n = 0, amp = 0.5, f = 1;
  for (let i = 0; i < octaves; i++) {
    s += amp * noise2(x * f, y * f);
    n += amp;
    amp *= 0.5;
    f *= 2;
  }
  return s / n;
}
var clamp = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
var smooth = (a, b, v) => {
  const k = clamp((v - a) / (b - a));
  return k * k * (3 - 2 * k);
};
var mix = (a, b, k) => a + (b - a) * k;
var hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
var LEFT = [[25, 38, 1.3], [6, 29, 0.9], [50, 25, 1], [72, 13, 0.6]];
var RIGHT = [[172, 30, 1.15], [194, 24, 0.85], [151, 16, 1], [212, 22, 0.6]];
var DISTANT = [[100, 10, 0.5], [119, 12, 0.55], [86, 7, 0.45], [134, 8, 0.5]];
function range(x, peaks, seed, rough) {
  let m = -99, px = 0;
  for (const [cx, h, s] of peaks) {
    const v = h - Math.abs(x - cx) * s;
    if (v > m) m = v, px = cx;
  }
  const j = rough * (fbm(x * 0.09, seed, 3) - 0.5) + rough * 0.45 * (noise2(x * 0.45, seed + 5) - 0.5);
  return [m + j * Math.min(1, Math.max(0, m) / 6), px];
}
function auroraFjord() {
  const P = meta2.palette.map(hex);
  const N = W * H;
  const out = new Array(N);
  const lut = new Uint8Array(32768).fill(255);
  const nearest = (r, g, b) => {
    const k = Math.min(31, r * 31.99 | 0) << 10 | Math.min(31, g * 31.99 | 0) << 5 | Math.min(31, b * 31.99 | 0);
    if (lut[k] !== 255) return lut[k];
    let best = 0, bd = 1e9;
    for (let i = 0; i < P.length; i++) {
      const dr = P[i][0] - r, dg = P[i][1] - g, db = P[i][2] - b;
      const d = 0.3 * dr * dr + 0.5 * dg * dg + 0.2 * db * db;
      if (d < bd) bd = d, best = i;
    }
    return lut[k] = best;
  };
  const mat = new Uint8Array(N);
  const sr = new Float32Array(N), sg = new Float32Array(N), sb = new Float32Array(N);
  const rec = new Float32Array(N);
  const rim = new Float32Array(N);
  const nearTop = new Float32Array(W), farTop = new Float32Array(W), peakX = new Float32Array(W);
  for (let x = 0; x < W; x++) {
    const [hl, pl] = range(x + 0.5, LEFT, 3.1, 4);
    const [hr, pr] = range(x + 0.5, RIGHT, 7.7, 4);
    const [hd] = range(x + 0.5, DISTANT, 11.3, 2.2);
    nearTop[x] = WL - Math.max(hl, hr, 0);
    peakX[x] = hl > hr ? pl : pr;
    farTop[x] = WL - Math.max(hd, 0);
  }
  const shoreTop = (x) => WL - 2.2 * smooth(134, 140, x) * smooth(178, 168, x) - 0.6 * noise2(x * 0.3, 2);
  const cabBase = WL - 2.2;
  for (let r = 0; r < WL; r++) {
    for (let x = 0; x < W; x++) {
      const k = r * W + x;
      const y = r + 0.5;
      if (y >= nearTop[x]) {
        mat[k] = NEAR;
        const px = peakX[x];
        const side = x + 0.5 - px;
        const depth = y - nearTop[x];
        const height2 = WL - nearTop[x];
        const ridge = px + (depth + 1) * 0.6 * (noise2(y * 0.1, px) - 0.5);
        const inward = px < 100 ? 1 : -1;
        const face = smooth(-4, 4, (x + 0.5 - ridge) * inward);
        const u = x + depth * 0.45 * Math.sign(side || 1);
        const rib = (v) => fbm(v * 0.13, px * 0.37, 3);
        const grad = (rib(u + 1) - rib(u - 1)) * 7 * inward;
        const reach = 3 + height2 * (0.62 + 0.42 * rib(u + 40));
        const streak = smooth(0.56, 0.64, fbm(u * 0.32, y * 0.035 + px, 3)) * smooth(1, 5, depth);
        const cx = x + 0.5 - 152;
        const wood = WL - 18.5 + 9 * (cx / 19) ** 2 + 1.5 * (noise2(x * 0.7, 9) - 0.5) - 2.6 * hash2(x, 77) * (x & 1 ? 1 : 0.3);
        const snow = smooth(reach + 1.6, reach - 1.6, depth) * (1 - smooth(WL - 3, WL - 0.5, y)) * (1 - 0.5 * streak);
        const lit = clamp(0.35 + 0.55 * face + grad * 0.5);
        const rv = 0.75 + 0.5 * fbm(x * 0.4, y * 0.4, 2);
        const rr = (0.05 + 0.03 * lit) * rv, rg = (0.065 + 0.035 * lit) * rv, rb = (0.11 + 0.05 * lit) * rv;
        const s = 0.34 + 0.66 * Math.pow(lit, 1.5);
        sr[k] = mix(rr, 0.62 * s + 0.04, snow);
        sg[k] = mix(rg, 0.7 * s + 0.05, snow);
        sb[k] = mix(rb, 0.86 * s + 0.09, snow);
        rec[k] = snow * (0.25 + 0.75 * lit) + 0.06;
        rim[k] = smooth(2.2, 0.3, depth) * 0.5;
        if (y > wood && cx > -14 - 2 * hash2(r, 3) && cx < 13 + 2 * hash2(r, 4)) {
          mat[k] = TREE;
          const h = hash2(x * 13 + r, 5);
          sr[k] = 0.02 + 0.03 * h, sg[k] = 0.045 + 0.045 * h, sb[k] = 0.06 + 0.04 * h;
          rec[k] = 0.05;
          rim[k] = smooth(wood + 1.6, wood + 0.2, y) * (0.7 + 0.3 * h);
        }
      } else if (y >= farTop[x]) {
        mat[k] = FAR;
        const depth = y - farTop[x];
        const snow = smooth(0.5, 0.62, fbm(x * 0.18, y * 0.25, 3) * 0.6 + (1 - depth / 7) * 0.55);
        const lit = 0.5 + 0.3 * (noise2(x * 0.25, y * 0.1) - 0.5);
        sr[k] = mix(0.075, 0.22 * lit + 0.12, snow);
        sg[k] = mix(0.1, 0.27 * lit + 0.15, snow);
        sb[k] = mix(0.17, 0.36 * lit + 0.24, snow);
        rec[k] = 0.2 + 0.3 * snow;
      }
      if (x > 132 && x < 180 && y >= shoreTop(x)) {
        mat[k] = SHORE;
        const f = 0.6 + 0.3 * fbm(x * 0.3, y * 0.5, 2);
        sr[k] = 0.26 * f, sg[k] = 0.3 * f, sb[k] = 0.42 * f;
        rec[k] = 0.4;
        rim[k] = 0;
      }
    }
  }
  const spruce = (tx, th, tw, tb, guard) => {
    for (let r = Math.max(0, Math.floor(tb - th)); r < WL; r++) {
      const y = r + 0.5, dy = y - (tb - th);
      if (dy < 0 || y >= tb + 0.5) continue;
      const tier = (dy + th * 0.3) / 1.8;
      const w = dy / th * tw * (0.7 + 0.45 * (tier - Math.floor(tier))) + 0.35;
      for (let x = Math.max(0, Math.floor(tx - tw - 1)); x <= Math.min(W - 1, tx + tw + 1); x++) {
        const k = r * W + x;
        const ex = x + 0.5 - tx;
        if (Math.abs(ex) > w || guard && guard(k)) continue;
        mat[k] = TREE;
        const h = hash2(x * 13 + r, 5);
        const s = ex < 0 ? 0.7 : 0.3;
        sr[k] = 0.02 + 0.03 * s * h, sg[k] = 0.04 + 0.05 * s, sb[k] = 0.055 + 0.045 * s;
        rec[k] = 0.05;
        rim[k] = Math.max(smooth(1.6, 0.2, dy), ex < 0 && ex < -w + 1 ? 0.45 * smooth(th, 0, dy) : 0);
      }
    }
  };
  const solid = (k) => mat[k] === WALL || mat[k] === ROOF || mat[k] === PANE || mat[k] === DOOR || mat[k] === SHORE;
  for (let x = -1; x < W + 2; ) {
    const h = hash2(Math.floor(x * 7), 21);
    const open = smooth(96, 80, x) + smooth(122, 136, x);
    const onShelf = x > 132 && x < 180;
    if (open > 0.05 && !(x > 136 && x < 166)) {
      const th = (3.2 + hash2(Math.floor(x * 3), 5) * 3 + (hash2(Math.floor(x * 5), 8) > 0.7 ? 2.4 : 0)) * Math.min(1, open) * (onShelf ? 0.7 : 1);
      if (th > 1.5) spruce(x + hash2(Math.floor(x), 2), th, 1 + hash2(Math.floor(x), 4) * 0.6, onShelf ? shoreTop(x) - 0.4 : WL + 0.3, onShelf ? solid : null);
    }
    x += 2 + 2.2 * h;
  }
  const eave = cabBase - 7;
  const roofTop = eave - 8;
  const CHIM = CAB[1] - 5, CHIM_TOP = eave - 8.5;
  for (let r = 0; r < WL; r++) {
    for (let x = CAB[0] - 3; x <= CAB[1] + 3; x++) {
      const k = r * W + x;
      const y = r + 0.5;
      const cx = (CAB[0] + CAB[1] + 1) / 2;
      if (x >= CAB[0] && x <= CAB[1] && y >= eave && y < cabBase + 0.5) {
        mat[k] = WALL;
        const boards = r & 1 ? 0.82 : 1;
        const s = (0.5 + 0.5 * ((CAB[1] - x) / (CAB[1] - CAB[0]))) * boards;
        sr[k] = 0.7 * s, sg[k] = 0.14 * s, sb[k] = 0.11 * s;
        rim[k] = 0;
        for (const [a, b] of PANES) if (x >= a && x <= b && y >= eave + 1.5 && y < cabBase - 2) mat[k] = PANE;
        if (x >= DOOR_X[0] && x <= DOOR_X[1] && y >= eave + 1.5) {
          mat[k] = DOOR;
          sr[k] = 0.16, sg[k] = 0.06, sb[k] = 0.05;
        }
      }
      const half = 12.5 - (eave - y) * 1.45;
      if (y >= roofTop && y < eave && Math.abs(x + 0.5 - cx) <= half) {
        mat[k] = ROOF;
        const snowy = y < eave - 1;
        const s = 0.78 + 0.22 * ((cx - x - 0.5) / 12);
        if (snowy) sr[k] = 0.78 * s, sg[k] = 0.84 * s, sb[k] = 0.96 * s;
        else sr[k] = 0.12, sg[k] = 0.05, sb[k] = 0.06;
        rec[k] = snowy ? 0.5 : 0;
        rim[k] = 0;
      }
      if (x >= CHIM && x <= CHIM + 1 && y >= CHIM_TOP && y < eave - 4) {
        mat[k] = WALL;
        const s = x === CHIM ? 1 : 0.55;
        sr[k] = 0.2 * s, sg[k] = 0.21 * s, sb[k] = 0.27 * s;
        rim[k] = 0;
      }
    }
  }
  for (const [tx, th] of [[134, 7], [137.8, 10], [166.5, 9], [170, 6], [174.5, 8]]) {
    spruce(tx, th, 2.2, shoreTop(tx) + 0.5, (k) => mat[k] === WALL || mat[k] === ROOF || mat[k] === PANE || mat[k] === DOOR);
  }
  const lampLand = new Float32Array(WL * W);
  for (let r = 0; r < WL; r++) {
    for (let x = 0; x < W; x++) {
      const k = r * W + x, m = mat[k];
      if (m === PANE || m === WALL || m === ROOF || m === DOOR) continue;
      let g = 0;
      for (const [lx, s] of LAMPS) {
        const wx = x + 0.5 - lx, wy = r + 0.5 - (cabBase - 2.5);
        const d = Math.sqrt(wx * wx * 0.6 + wy * wy * 2.2);
        g += s * Math.exp(-d / 5.5) * 0.6;
      }
      lampLand[k] = g * (m === AIR ? 0.3 : m === TREE ? 0.4 : 0.75 + 0.5 * hash2(x, r + 31));
    }
  }
  const haze = new Float32Array(WL * W);
  for (let k = 0; k < WL * W; k++) haze[k] = fbm(k % W * 0.04, Math.floor(k / W) * 0.07, 3);
  const star = new Float32Array(WL * W);
  for (let k = 0; k < WL * W; k++) {
    const h = hash2(k % W, Math.floor(k / W) + 101);
    if (h > 0.986) star[k] = 0.35 + (h - 0.986) * 45;
  }
  const gap = new Uint8Array(H);
  for (let r = WL; r < H; r++) gap[r] = hash2(r, 404) < 0.3 ? 1 : 0;
  const baseA = new Float32Array(W), tallA = new Float32Array(W), envA = new Float32Array(W);
  const baseB = new Float32Array(W), envB = new Float32Array(W);
  const RAYS = 4 * W;
  const raysA = new Float32Array(RAYS + 2), raysB = new Float32Array(RAYS + 2);
  const R = new Float32Array(WL * W), G = new Float32Array(WL * W), B = new Float32Array(WL * W);
  const lightX = new Float32Array(W);
  const ray = (arr, u) => {
    const s = u * 4;
    let i = Math.floor(s);
    const f = s - i;
    i = (i % RAYS + RAYS) % RAYS;
    return arr[i] + (arr[i + 1] - arr[i]) * f;
  };
  return (t, { color } = {}) => {
    for (let x = 0; x < W; x++) {
      const u = x / W;
      baseA[x] = 5 + 40 * Math.pow(Math.sin(Math.min(1, u / 0.6) * Math.PI / 2), 1.5) - 13 * smooth(0.6, 0.95, u) + 2.6 * Math.sin(x * 0.07 - t * 0.55) + 1.4 * Math.sin(x * 0.17 + t * 0.9 + 1.3) + 2.2 * Math.sin(x * 0.22 + t * 1.2) + 4 * (fbm(x * 0.015 + t * 0.03, 4.2, 2) - 0.5);
      tallA[x] = 11 + 8 * fbm(x * 0.03 - t * 0.05, 1.7, 2);
      envA[x] = smooth(0, 0.2, u) * smooth(0.98, 0.72, u) * (0.4 + 0.8 * fbm(x * 0.022 - t * 0.07, 8.8, 3));
      baseB[x] = 14 + 4 * Math.sin(x * 0.035 + t * 0.3 + 2) + 1.6 * Math.sin(x * 0.11 - t * 0.7);
      envB[x] = smooth(0.45, 0.7, u) * smooth(1.05, 0.85, u) * (0.25 + 0.5 * fbm(x * 0.03 + t * 0.05, 3.3, 2));
    }
    for (let i = 0; i <= RAYS + 1; i++) {
      const u = i / 4;
      raysA[i] = 0.14 + Math.pow(fbm(u * 0.6 + t * 0.35, t * 0.12, 3), 2.4) * 2.5;
      raysB[i] = 0.1 + Math.pow(fbm(u * 0.45 - t * 0.2, 5 + t * 0.1, 3), 2.2) * 2;
    }
    for (let x = 0; x < W; x++) {
      let s = 0;
      for (let d = -24; d <= 24; d += 6) {
        const xx = Math.min(W - 1, Math.max(0, x + d));
        s += envA[xx] + 0.4 * envB[xx];
      }
      lightX[x] = s / 9;
    }
    const flick = 0.92 + 0.05 * Math.sin(t * 2.3) + 0.03 * Math.sin(t * 7.1);
    for (let r = 0; r < WL; r++) {
      const y = r + 0.5;
      const v = y / WL;
      for (let x = 0; x < W; x++) {
        const k = r * W + x;
        const m = mat[k];
        let cr, cg, cb;
        if (m === AIR) {
          const hz = 0.85 + 0.3 * haze[k];
          cr = (0.025 + 0.03 * v * v) * hz;
          cg = (0.04 + 0.07 * v * v) * hz;
          cb = (0.1 + 0.11 * v * v) * hz;
          let a = 0;
          const d = baseA[x] - y;
          if (d > -4 && d < 46) {
            const bend = Math.abs(baseA[Math.min(W - 1, x + 1)] - baseA[Math.max(0, x - 1)]);
            const hc = tallA[x];
            const lean = ray(raysA, x + d * 0.22);
            const prof = d < 0 ? Math.exp(-d * d * 0.9) : (1 - Math.exp(-(d + 0.4) * 1.1)) * Math.exp(-d / hc);
            const band = d < 0 ? Math.exp(-d * d) : Math.exp(-d / 3);
            a = (prof * lean + 0.3 * band * (0.55 + 0.45 * Math.min(1.4, lean))) * envA[x] * (1.15 + 0.35 * bend);
            const up = clamp(d / (hc * 1.6));
            const gk = 1 - smooth(0, 0.5, up), vk = smooth(0.4, 0.9, up);
            const tk = 1 - gk - vk;
            cr += a * (0.18 * gk + 0.06 * tk + 0.42 * vk);
            cg += a * (1 * gk + 0.78 * tk + 0.16 * vk);
            cb += a * (0.48 * gk + 0.7 * tk + 0.75 * vk);
            const hem = Math.exp(-((d + 0.6) ** 2) * 1.2) * smooth(0.3, 0.8, a) * 0.8 * (0.45 + 0.55 * Math.min(1, lean));
            cr += hem * 0.95, cg *= 1 - 0.55 * Math.min(1, hem * 1.6), cb += hem * 0.4;
          }
          const db = baseB[x] - y;
          if (db > -3 && db < 30) {
            const prof = db < 0 ? Math.exp(-db * db) : (1 - Math.exp(-(db + 0.4))) * Math.exp(-db / 9);
            const b = prof * ray(raysB, x + db * 0.18) * envB[x] * 0.85 * smooth(0, 8, y);
            const up = clamp(db / 12);
            cr += b * (0.1 + 0.4 * up);
            cg += b * (0.75 - 0.5 * up);
            cb += b * (0.7 + 0.2 * up);
            a += b;
          }
          const below = y - baseA[x];
          const gl = envA[x] * (below > 0 ? Math.exp(-below / 6) * 0.1 : Math.exp(below / 8) * 0.18);
          cr += gl * 0.12, cg += gl * 0.62, cb += gl * 0.52;
          const ag = Math.exp(-(WL - y) / 10) * (0.1 + 0.16 * lightX[x]);
          cg += ag * 0.7, cb += ag * 0.75, cr += ag * 0.2;
          const st = star[k];
          if (st > 0) {
            const tw = 0.7 + 0.3 * Math.sin(t * (1.3 + 3 * hash2(x, r)) + 6.28 * hash2(r, x));
            const s = st * tw * clamp(1 - a * 1.6) * smooth(WL - 2, 30, y);
            cr = Math.max(cr, s * 0.9), cg = Math.max(cg, s * 0.94), cb = Math.max(cb, s);
          }
        } else {
          cr = sr[k], cg = sg[k], cb = sb[k];
          const L = lightX[x] * rec[k];
          cr += L * 0.03, cg += L * 0.14, cb += L * 0.1;
          const e = rim[k];
          if (e > 0) {
            const q = e * (m === TREE ? 0.2 + 0.45 * lightX[x] : 0.05 + 0.22 * lightX[x]);
            cr += q * 0.25, cg += q * 0.95, cb += q * 0.7;
          }
          if (m === PANE) {
            const f = flick + 0.04 * Math.sin(t * 5.3 + x);
            cr = f, cg = 0.76 * f, cb = 0.38 * f;
          } else if (m === DOOR) {
            if (x === DOOR_X[1] && r > eave + 1) cr = 0.55 * flick, cg = 0.36 * flick, cb = 0.14 * flick;
          }
        }
        const lg = lampLand[k] * flick;
        if (lg > 0) cr += lg, cg += lg * 0.62, cb += lg * 0.26;
        R[k] = cr, G[k] = cg, B[k] = cb;
      }
    }
    for (let r = 0; r < H; r++) {
      const y = r + 0.5;
      let floor = 0.1, fade = 1;
      const dw = y - WL;
      const deep = r >= WL ? mix(1, 0.45, dw / (H - WL)) : 1;
      const ry = WL - 1 - (r - WL) - Math.round(0.4 * Math.sin(r * 0.9 + t * 0.6));
      const r0 = Math.max(0, ry) * W, r1 = Math.max(0, ry - 1) * W, r2 = Math.max(0, ry - 2) * W;
      for (let x = 0; x < W; x++) {
        const k = r * W + x;
        let cr, cg, cb;
        if (r < WL) {
          cr = R[k], cg = G[k], cb = B[k];
          const m = mat[k];
          floor = m === AIR ? 0.1 : m === NEAR ? 0.05 : m === TREE ? 0.04 : 0.06;
        } else {
          const wave = noise2(x * 0.04 + t * 0.05, r * 0.55 - t * 0.35);
          const sx = x + (0.5 + dw * 0.12) * Math.sin(r * 1.3 + t * 1.6 + wave * 4);
          let ix = Math.floor(sx);
          const fx = sx - ix;
          ix = Math.max(0, Math.min(W - 2, ix));
          const a0 = r0 + ix, a1 = r1 + ix, a2 = r2 + ix;
          const sky = mat[a0] === AIR;
          let kr = (sky ? 0.55 : 0.64) * (0.82 + 0.3 * wave) * deep;
          if (sky && gap[r] && wave < 0.45) kr *= 0.12;
          const ms = mat[a0];
          if (ms === PANE) kr *= 0.4;
          else if (ms === WALL || ms === ROOF || ms === DOOR) kr *= 0.7;
          const gx = 1 - fx;
          cr = ((R[a0] * gx + R[a0 + 1] * fx) * 0.5 + (R[a1] * gx + R[a1 + 1] * fx) * 0.3 + (R[a2] * gx + R[a2 + 1] * fx) * 0.2) * kr;
          cg = ((G[a0] * gx + G[a0 + 1] * fx) * 0.5 + (G[a1] * gx + G[a1 + 1] * fx) * 0.3 + (G[a2] * gx + G[a2 + 1] * fx) * 0.2) * kr;
          cb = ((B[a0] * gx + B[a0 + 1] * fx) * 0.5 + (B[a1] * gx + B[a1 + 1] * fx) * 0.3 + (B[a2] * gx + B[a2 + 1] * fx) * 0.2) * kr;
          if (ms !== WALL && ms !== DOOR) cr += 0.02, cg += 0.035, cb += 0.065;
          if (r === WL) {
            const e = 0.3 * (0.3 + 0.7 * smooth(0.25, 0.75, noise2(x * 0.3, t * 0.4)));
            cr += e * 0.6, cg += e * 0.85, cb += e;
          }
          if (dw < 14 && x > 138 && x < 166) {
            const rip = noise2(x * 0.5 - t * 0.2, r * 1.4 - t * 1.5);
            for (const [lx, s] of LAMPS) {
              const lw = 1 + dw * 0.1;
              const q = (x + 0.5 - lx) / lw;
              const g = Math.exp(-q * q) * Math.exp(-dw / 8) * smooth(0.3, 0.65, rip) * s * 1.6 * flick;
              cr += g, cg += g * 0.68, cb += g * 0.28;
            }
          }
          floor = sky ? 0.07 * deep : 0.03;
          fade = smooth(H + 3, H - 12, y);
        }
        const peak = Math.max(cr, cg, cb, 1e-4);
        const level = clamp(floor + (1 - floor) * Math.pow(peak, 0.85) * 0.95) * fade;
        const step = Math.max(0, Math.min(3, Math.round(level * 3 + BAYER[(r & 3) * 4 + (x & 3)])));
        out[k] = DOTS[step];
        if (color) {
          const want = step ? Math.min(1, (level + 0.06) / COVER[step]) : 0;
          const s = (0.3 + 0.7 * want) / peak;
          color[k] = nearest(clamp(cr * s), clamp(cg * s), clamp(cb * s));
        }
      }
    }
    const lines = [];
    for (let r = 0; r < H; r++) lines.push(out.slice(r * W, (r + 1) * W).join(""));
    return lines.join("\n");
  };
}

// vendor/ascii-rest/earthrise.ts
var earthrise_exports = {};
__export(earthrise_exports, {
  default: () => earthrise,
  meta: () => meta3
});
var meta3 = {
  name: "earthrise",
  category: "scenes",
  note: "the earth rising over a cratered lunar horizon in long low sunlight",
  cols: 200,
  rows: 100,
  cell: 1,
  fps: 15,
  ground: "#030408",
  palette: [
    "#18181b",
    "#232326",
    "#303033",
    "#414143",
    "#555556",
    "#6b6a69",
    "#83817d",
    "#9c9993",
    "#b6b2aa",
    "#cfcac1",
    "#e6e1d8",
    "#f7f4ee",
    "#0c1120",
    "#131a2e",
    "#1b2540",
    "#262f4a",
    "#dfe9ff",
    "#0a2259",
    "#0f2f72",
    "#15408c",
    "#1d53a6",
    "#2a69bf",
    "#4386d3",
    "#6eaeea",
    "#a8d3f6",
    "#e8f0fa",
    "#c2d0e3",
    "#8b9fbc",
    "#2f4a26",
    "#3b5a2c",
    "#5b7238",
    "#7a9150",
    "#77783f",
    "#8f8550",
    "#a8955e",
    "#6b5634",
    "#b9774a",
    "#8a4838"
  ]
};
var W2 = 200;
var H2 = 100;
var EYE = 37;
var F = 112;
var CAM_H = 20;
var RM = 1500;
var ZMAX = 520;
var EC = [141, 32];
var ER = 22;
var LON0 = 3.5;
var RISE = 5;
var RISE_T = 150;
var DOTS2 = " \xB7\u2022\u25CF";
var COVER2 = [0, 0.3, 0.6, 1];
var BAYER2 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16 - 0.47);
var BRIGHT = [[24, 9, 1, 4.6], [67, 27, 0.85, 3.4], [99, 12, 0.95, 5.8], [189, 7, 0.8, 4.1]];
var SUN = (() => {
  const v = [0.94, 0.14, -0.3];
  const l = Math.hypot(...v);
  return v.map((c) => c / l);
})();
function hash3(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ h >>> 13, 1274126177);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}
function noise3(x, y, period) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = x - xi, fy = y - yi;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  let x0 = xi, x1 = xi + 1;
  if (period) {
    x0 = (xi % period + period) % period;
    x1 = (x0 + 1) % period;
  }
  const a = hash3(x0, yi), b = hash3(x1, yi), c = hash3(x0, yi + 1), d = hash3(x1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm2(x, y, octaves, period) {
  let s = 0, n = 0, amp = 0.5, f = 1;
  for (let i = 0; i < octaves; i++) {
    s += amp * noise3(x * f, y * f, period * f);
    n += amp;
    amp *= 0.5;
    f *= 2;
  }
  return s / n;
}
var clamp2 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
var smooth2 = (a, b, v) => {
  const k = clamp2((v - a) / (b - a));
  return k * k * (3 - 2 * k);
};
var mix2 = (a, b, k) => a + (b - a) * k;
var hex2 = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
var bowl = (q, r) => r * ((q < 1 ? -0.36 * (1 - q * q) : 0) + 0.14 * Math.exp(-(((q - 1) / 0.25) ** 2)));
function craters(X, Z, cell, salt, r0, r1, p) {
  const ci = Math.floor(X / cell), cj = Math.floor(Z / cell);
  let h = 0;
  for (let j = cj - 1; j <= cj + 1; j++) {
    for (let i = ci - 1; i <= ci + 1; i++) {
      if (hash3(i + salt, j - salt) > p) continue;
      const cx = (i + hash3(i, j + salt * 3)) * cell, cz = (j + hash3(i + salt * 5, j)) * cell;
      const e = hash3(j + salt, i - salt * 7);
      const r = cell * (r0 + (r1 - r0) * e * e);
      const dx = X - cx, dz = Z - cz, d2 = dx * dx + dz * dz;
      if (d2 > 4 * r * r) continue;
      h += bowl(Math.sqrt(d2) / r, r) * 0.95;
    }
  }
  return h;
}
var ROCKS = [[30, 50, 2.4], [62, 63, 1.8], [12, 70, 1.3], [-4, 45, 1.2], [90, 55, 1.6], [46, 90, 1.4]];
function height(X, Z) {
  let h = 6 * fbm2(X * 6e-3 + 50, Z * 6e-3 + 50, 3, 0) + 0.6 * fbm2(X * 0.04, Z * 0.04, 2, 0);
  if (Z > 150) {
    const lift = smooth2(150, 300, Z);
    const m = 1 - Math.abs(2 * fbm2(X * 6e-3 + 7, Z * 6e-3, 4, 0) - 1);
    h += lift * (28 * Math.exp(-(((X + 260) / 230) ** 2)) + 45 * (m * m - 0.35));
    const ridge = Math.exp(-(((Z - 205) / 20) ** 2)) * Math.exp(-(((X + 140) / 130) ** 2));
    h += ridge * 22 * (0.35 + fbm2(X * 0.018 + 3, Z * 0.01, 3, 0));
  }
  if (Z > 90) h += craters(X, Z, 110, 11, 0.14, 0.34, 0.55) * smooth2(90, 150, Z);
  if (Z < 300) h += craters(X, Z, 34, 23, 0.12, 0.36, 0.85);
  if (Z < 170) h += craters(X, Z, 10, 37, 0.12, 0.34, 0.85) * smooth2(170, 110, Z);
  {
    const dx = X + 24, dz = Z - 58;
    const q = Math.sqrt(dx * dx + dz * dz) / 16;
    if (q < 2) h += bowl(q, 16);
  }
  if (Z < 90) {
    const c = 5, ci = Math.floor(X / c), cj = Math.floor(Z / c);
    if (hash3(ci + 91, cj) < 0.14) {
      const bx = (ci + 0.2 + 0.6 * hash3(ci, cj + 92)) * c, bz = (cj + 0.2 + 0.6 * hash3(ci + 93, cj)) * c;
      const br = 0.3 + 0.5 * hash3(ci + 94, cj + 95) ** 2;
      const d2 = ((X - bx) ** 2 + (Z - bz) ** 2) / (br * br);
      if (d2 < 4) h += br * 0.9 * Math.exp(-d2 * 1.4);
    }
    for (const [bx, bz, br] of ROCKS) {
      const d2 = ((X - bx) ** 2 + (Z - bz) ** 2) / (br * br);
      if (d2 < 1) h += br * (0.85 + 0.3 * noise3(X * 1.3, Z * 1.3, 0)) * Math.sqrt(1 - d2);
    }
  }
  return h;
}
function earthrise() {
  const P = meta3.palette.map(hex2);
  const N = W2 * H2;
  const lut = new Uint8Array(32768).fill(255);
  const nearest = (r, g, b) => {
    const k = Math.min(31, r * 31.99 | 0) << 10 | Math.min(31, g * 31.99 | 0) << 5 | Math.min(31, b * 31.99 | 0);
    if (lut[k] !== 255) return lut[k];
    let best = 0, bd = 1e9;
    for (let i = 0; i < P.length; i++) {
      const dr = P[i][0] - r, dg = P[i][1] - g, db = P[i][2] - b;
      const d = 0.3 * dr * dr + 0.5 * dg * dg + 0.2 * db * db;
      if (d < bd) bd = d, best = i;
    }
    return lut[k] = best;
  };
  const chars = new Array(N).fill(" ");
  const cols = new Uint8Array(N);
  const dot = (k, x, r, cr, cg, cb, floor, cap) => {
    const peak = Math.max(cr, cg, cb, 1e-4);
    const level = clamp2(floor + (1 - floor) * Math.pow(peak, 0.85) * 0.95);
    const step = Math.max(0, Math.min(3, Math.round(level * 3 + BAYER2[(r & 3) * 4 + (x & 3)])));
    chars[k] = DOTS2[step];
    const want = step ? Math.min(1, (level + 0.06) / COVER2[step]) : 0;
    const s = Math.min(cap, 0.3 + 0.7 * want) / peak;
    cols[k] = nearest(clamp2(cr * s), clamp2(cg * s), clamp2(cb * s));
  };
  const ground = new Uint8Array(N);
  const top = new Int16Array(W2).fill(H2);
  const gx = new Float32Array(N), gz = new Float32Array(N), gy = new Float32Array(N);
  const camY = height(0, 7) + CAM_H;
  for (let c = 0; c < W2; c++) {
    const dir = (c + 0.5 - W2 / 2) / F;
    let topR = H2, Z = 26, prevY = 0, prevZ = 0, prevF = 1e9;
    while (Z < ZMAX && topR > 0) {
      const X = dir * Z;
      const hy = height(X, Z);
      const Y = hy - Z * Z / (2 * RM);
      const yf = EYE - F * (Y - camY) / Z;
      let r0 = Math.max(0, Math.ceil(yf - 0.5));
      for (let r = r0; r < topR; r++) {
        const a = prevF > yf + 1e-6 ? clamp2((prevF - (r + 0.5)) / (prevF - yf)) : 1;
        const k = r * W2 + c;
        ground[k] = 1;
        gz[k] = prevZ ? mix2(prevZ, Z, a) : Z;
        gx[k] = dir * gz[k];
        gy[k] = prevZ ? mix2(prevY, hy, a) : hy;
      }
      if (r0 < topR) topR = r0;
      prevF = yf, prevY = hy, prevZ = Z;
      Z += 0.03 + Z * 0.012;
    }
    top[c] = topR;
  }
  const sr = new Float32Array(N), sg = new Float32Array(N), sb = new Float32Array(N), sf = new Float32Array(N), scap = new Float32Array(N).fill(1);
  for (let r = 0; r < H2; r++) {
    for (let x = 0; x < W2; x++) {
      const k = r * W2 + x;
      if (!ground[k]) continue;
      const X = gx[k], Z = gz[k], Y = gy[k];
      const e = 0.1 + Z * 4e-3;
      const hx = (height(X + e, Z) - height(X - e, Z)) / (2 * e);
      const hz = (height(X, Z + e) - height(X, Z - e)) / (2 * e);
      const nl = Math.hypot(hx, 1, hz);
      const lam = (-hx * SUN[0] + SUN[1] - hz * SUN[2]) / nl;
      const vx = -X, vy = camY - Y, vz = -Z, vl = Math.hypot(vx, vy, vz);
      const mu = Math.max(0.02, (-hx * vx + vy - hz * vz) / (nl * vl));
      let lit = 0;
      if (lam > 0) {
        lit = 1;
        let s = 0.1 + Z * 3e-3;
        while (s < 120) {
          const px = X + SUN[0] * s, pz = Z + SUN[2] * s, py = Y + SUN[1] * s;
          const d = py - height(px, pz);
          if (d < 0) {
            lit = 0;
            break;
          }
          lit = Math.min(lit, d * 30 / s);
          s += 0.05 + s * 0.2;
        }
        lit = smooth2(0, 1, lit);
      }
      const albedo = 0.5 + 0.9 * fbm2(X * 0.025 + 3, Z * 0.025, 3, 0) + 0.3 * (fbm2(X * 0.35, Z * 0.35, 2, 0) - 0.5) - 0.22 * smooth2(0.46, 0.64, fbm2(X * 35e-4, Z * 35e-4 + 20, 3, 0));
      const ls = lam > 0 ? (0.2 * lam / (lam + mu) + 2.6 * lam) * lit : 0;
      const vig = 1 - 0.3 * smooth2(84, 102, r) * smooth2(30, 100, Math.abs(x - 100));
      let b = Math.pow((1 - Math.exp(-ls * 1.5)) * albedo, 1) * vig;
      const crest = r - top[x];
      if (crest < 2 && lit > 0.2) b = Math.max(b, (crest ? 0.55 : 0.85) * albedo);
      const fill = lit > 0.02 || b > 0.03 ? 8e-3 + 7e-3 * clamp2(-hz / nl + 0.5) : 0;
      sr[k] = b * 1 + fill * 0.75;
      sg[k] = b * 0.95 + fill * 0.85;
      sb[k] = b * 0.86 + fill * 1.2;
      sf[k] = 0;
      scap[k] = 0.42 + 0.62 * b;
    }
  }
  const near = (x, r) => Math.hypot(x + 0.5 - EC[0], r + 0.5 - (EC[1] - RISE / 2)) < 2 * ER;
  for (let r = 0; r < H2; r++) {
    for (let x = 0; x < W2; x++) {
      const k = r * W2 + x;
      if (ground[k]) continue;
      const bandD = (r - (4 + x * 0.32)) / 1.05;
      const band = Math.exp(-((bandD / 10) ** 2)) * smooth2(0.35, 0.65, fbm2(x * 0.05, r * 0.08, 3, 0)) * smooth2(120, 70, x);
      let cr = 0, cg = 0, cb = 0, cap = 1;
      const hs = hash3(x * 3 + 1, r * 7 + 2);
      if (hs > 0.994 - 0.05 * band && !near(x, r)) {
        const m = Math.pow(hash3(x + 17, r + 29), 3);
        const s = 0.2 + 0.5 * m;
        const tint = hash3(x + 5, r + 77);
        const [tr2, tg2, tb2] = tint < 0.3 ? [0.84, 0.9, 1] : tint > 0.88 ? [1, 0.93, 0.84] : [0.96, 0.96, 0.98];
        cr = s * tr2, cg = s * tg2, cb = s * tb2;
      }
      sr[k] = cr, sg[k] = cg, sb[k] = cb, sf[k] = 0, scap[k] = cap;
    }
  }
  for (let k = 0; k < N; k++) dot(k, k % W2, k / W2 | 0, sr[k], sg[k], sb[k], sf[k], scap[k]);
  const TW = 192, TH = 96;
  const tr = new Float32Array(TW * TH), tg = new Float32Array(TW * TH), tb = new Float32Array(TW * TH), sea = new Float32Array(TW * TH);
  const cloud = new Float32Array(TW * TH);
  const storms = [[0.9, 0.8, 1], [3.1, -0.85, -1], [4.6, 0.62, 1], [1.9, 0.25, 1], [5.6, -0.55, -1]];
  const elev = new Float32Array(TW * TH);
  for (let j = 0; j < TH; j++) {
    const v = (j + 0.5) / TH, lat = (0.5 - v) * Math.PI, al = Math.abs(lat);
    for (let i = 0; i < TW; i++) {
      const u = i / TW, lon = u * Math.PI * 2, t = j * TW + i;
      const wx = fbm2(u * 6, v * 3 + 9, 3, 6);
      elev[t] = fbm2(u * 8 + 1.6 * wx, v * 4, 5, 8) - 0.04 * smooth2(1.2, 1.5, al);
      let cx = u * 14, cy = v * 7;
      for (const [slon, slat, spin] of storms) {
        let dl = lon - slon;
        dl -= Math.round(dl / (Math.PI * 2)) * Math.PI * 2;
        const lx = dl * Math.cos(lat), ly = lat - slat;
        const dd = Math.hypot(lx, ly);
        const a = spin * 5 * Math.exp(-dd / 0.2);
        if (a * spin > 0.02) {
          const ca = Math.cos(a), sa = Math.sin(a);
          cx += (lx * ca - ly * sa - lx) / (Math.PI * 2) * 14;
          cy -= (lx * sa + ly * ca - ly) / Math.PI * 7;
        }
      }
      const q = fbm2(cx * 0.5 + 3, cy * 1.2, 3, 7);
      const n0 = fbm2(cx + 1.6 * q, cy * 1.3 + 0.5 * q, 5, 14);
      const n = 0.4 * n0 + 0.6 * (1 - Math.abs(2 * fbm2(cx * 1.5 + 2.2 * q, cy * 1.6 + 9, 4, 21) - 1));
      const belt = 0.05 * Math.exp(-((lat / 0.12) ** 2)) - 0.07 * Math.exp(-(((al - 0.42) / 0.16) ** 2)) + 0.05 * Math.exp(-(((al - 0.95) / 0.25) ** 2));
      cloud[t] = n + belt;
    }
  }
  const quantile = (A, p) => {
    const s = Float32Array.from(A).sort();
    return s[Math.floor(p * (s.length - 1))];
  };
  const shore = quantile(elev, 0.7), c0 = quantile(cloud, 0.6), c1 = quantile(cloud, 0.86);
  for (let j = 0; j < TH; j++) {
    const v = (j + 0.5) / TH, lat = (0.5 - v) * Math.PI, al = Math.abs(lat);
    for (let i = 0; i < TW; i++) {
      const u = i / TW, t = j * TW + i, e = elev[t];
      const land = smooth2(shore - 4e-3, shore + 6e-3, e);
      const ice = smooth2(1.22, 1.32, al + 0.12 * fbm2(u * 12, v * 6, 2, 12));
      const grain = fbm2(u * 36 + 2, v * 18, 3, 36) - 0.5;
      const arid = clamp2(Math.exp(-(((al - 0.4) / 0.22) ** 2)) * (0.1 + 1.2 * fbm2(u * 10 + 4, v * 5, 3, 10)) + (e - shore - 0.04) * 4 + 0.8 * grain);
      const relief = 1 + 1.2 * grain - 2.5 * Math.max(0, e - shore - 0.08);
      let r = mix2(0.13, 0.4, arid) * relief, g = mix2(0.25, 0.34, arid) * relief, b = mix2(0.08, 0.19, arid) * relief;
      const shelf = smooth2(shore - 0.06, shore, e);
      const or = mix2(0.025, 0.07, shelf), og = mix2(0.11, 0.3, shelf), ob = mix2(0.38, 0.62, shelf);
      r = mix2(or, r, land), g = mix2(og, g, land), b = mix2(ob, b, land);
      r = mix2(r, 0.92, ice), g = mix2(g, 0.95, ice), b = mix2(b, 0.99, ice);
      tr[t] = r, tg[t] = g, tb[t] = b, sea[t] = (1 - land) * (1 - ice);
      cloud[t] = smooth2(c0, c1, cloud[t]);
    }
  }
  const sample = (A, lon, vy) => {
    const fx = (lon / (Math.PI * 2) % 1 + 1) % 1 * TW;
    const x0 = Math.floor(fx), ax = fx - x0, x1 = (x0 + 1) % TW;
    const y0 = Math.max(0, Math.min(TH - 2, Math.floor(vy))), ay = clamp2(vy - y0);
    const a = A[y0 * TW + x0], b = A[y0 * TW + x1], c = A[y0 * TW + TW + x0], d = A[y0 * TW + TW + x1];
    return a + (b - a) * ax + (c - a) * ay + (a - b - c + d) * ax * ay;
  };
  const L = [SUN[0], SUN[1], -SUN[2]];
  const HV = (() => {
    const v = [L[0], L[1], L[2] + 1];
    const l = Math.hypot(...v);
    return v.map((c) => c / l);
  })();
  const tilt = 0.4, nod = 0.22;
  const ct = Math.cos(tilt), st = Math.sin(tilt), cn = Math.cos(nod), sn = Math.sin(nod);
  const box = [];
  for (let r = Math.max(0, EC[1] - RISE - ER - 13); r <= Math.min(H2 - 1, EC[1] + ER + 2); r++) {
    for (let x = EC[0] - ER - 13; x <= EC[0] + ER + 13; x++) if (!ground[r * W2 + x]) box.push(r * W2 + x);
  }
  const twinkle = [];
  for (const [x, r, s, p] of BRIGHT) {
    for (const [ox, oy, w] of [[0, 0, 1], [-1, 0, 0.2], [1, 0, 0.2], [0, -1, 0.2], [0, 1, 0.2]]) {
      const k = (r + oy) * W2 + x + ox;
      if (!ground[k]) twinkle.push([k, x + ox, r + oy, s * w, p, hash3(x, r) * 6.28, w === 1]);
    }
  }
  const dirty = new Uint8Array(H2);
  for (const k of box) dirty[k / W2 | 0] = 1;
  for (const [k] of twinkle) dirty[k / W2 | 0] = 1;
  const lines = [];
  for (let r = 0; r < H2; r++) lines.push(chars.slice(r * W2, (r + 1) * W2).join(""));
  return (t, { color } = {}) => {
    const spin = t * 0.045;
    const drift = t * 0.012;
    const ey = EC[1] - RISE * (0.5 - 0.5 * Math.cos(t / RISE_T * Math.PI * 2));
    for (const k of box) {
      const x = k % W2, r = k / W2 | 0;
      let cr = sr[k], cg = sg[k], cb = sb[k], cap = scap[k], floor = 0;
      const dx = x + 0.5 - EC[0], dy = r + 0.5 - ey;
      const d = Math.hypot(dx, dy);
      if (d >= ER - 1 && d < ER + 12) {
        const side = smooth2(-0.3, 0.75, (dx * L[0] - dy * L[1]) / d);
        let g = Math.exp(-Math.max(0, d - ER) / 1.2) * 0.55 * side;
        if (g < 0.05) g = 0;
        cr += 0.25 * g, cg += 0.52 * g, cb += 1 * g;
        if (g > 0) cap = 1;
      }
      if (d < ER) {
        const nx = dx / ER, ny = -dy / ER, q2 = nx * nx + ny * ny;
        const nz = Math.sqrt(1 - q2);
        const ax = nx * ct + ny * st;
        const ay0 = -nx * st + ny * ct;
        const ay = ay0 * cn - nz * sn;
        const az = ay0 * sn + nz * cn;
        const lat = Math.asin(Math.max(-1, Math.min(1, ay)));
        const lon = Math.atan2(ax, az) + LON0 + spin;
        const vy = (0.5 - lat / Math.PI) * TH - 0.5;
        const ndl = nx * L[0] + ny * L[1] + nz * L[2];
        const day = smooth2(-5e-3, 0.06, ndl) * (0.45 + 0.8 * Math.sqrt(clamp2(ndl)));
        const dusk = Math.exp(-(((ndl - 0.02) / 0.035) ** 2));
        const cl = sample(cloud, lon + drift, vy);
        const sh = sample(cloud, lon + drift - 0.03, vy + 0.4);
        const sw = sample(sea, lon, vy);
        let er = sample(tr, lon, vy), eg = sample(tg, lon, vy), eb = sample(tb, lon, vy);
        const shade = 1 - 0.45 * sh * (1 - cl);
        er *= shade, eg *= shade, eb *= shade;
        er = mix2(er, 0.95, cl), eg = mix2(eg, 0.97, cl), eb = mix2(eb, 1, cl);
        er *= day * (1 + 0.06 * dusk), eg *= day * (1 - 0.03 * dusk), eb *= day * (1 - 0.1 * dusk);
        const glint = Math.pow(Math.max(0, nx * HV[0] + ny * HV[1] + nz * HV[2]), 70) * 0.8 * sw * (1 - cl);
        const rim = Math.pow(1 - nz, 2.2) * smooth2(0, 0.3, ndl);
        er += glint * 0.95 + rim * 0.2;
        eg += glint * 0.92 + rim * 0.42;
        eb += glint * 0.85 + rim * 0.85;
        const edge = smooth2(1, 0.95, Math.sqrt(q2));
        cr = mix2(cr, er, edge), cg = mix2(cg, eg, edge), cb = mix2(cb, eb, edge);
        cap = mix2(1, 0.66, (1 - sw) * (1 - cl) * smooth2(0.95, 0.85, Math.abs(ay)));
        floor = 0.15 * Math.min(1, day) * edge;
      }
      dot(k, x, r, cr, cg, cb, floor, cap);
    }
    for (const [k, x, r, s, p, ph, core] of twinkle) {
      const v = s * (0.86 + 0.14 * Math.sin(t / p * Math.PI * 2 + ph));
      if (core) dot(k, x, r, v * 0.97, v * 0.98, v, 0, 1);
      else dot(k, x, r, Math.max(sr[k], v * 0.95), Math.max(sg[k], v), Math.max(sb[k], v * 1.15), 0, 0.6);
    }
    for (let r = 0; r < H2; r++) if (dirty[r]) lines[r] = chars.slice(r * W2, (r + 1) * W2).join("");
    if (color) color.set(cols);
    return lines.join("\n");
  };
}

// vendor/ascii-rest/matrix-rain.ts
var matrix_rain_exports = {};
__export(matrix_rain_exports, {
  default: () => matrixRain,
  meta: () => meta4
});
var meta4 = {
  name: "matrix rain",
  category: "effects",
  note: "streams of glyphs falling, heavy at the head, thin behind",
  cols: 63,
  rows: 24,
  fps: 20
};
var HEAD = "@#%&$";
var COLLAR = "acdeghkmnorsuvxz";
var BODY = "0123456789ABCDEFHKMNPRSTXZ";
var THIN = ["acdeghkmnorsuvxz=+*<>", ":;!|il^~", ".,'`"];
var FAR_SETS = ["=+*<>|", ":;!|il", ":;!|il^~", ".,'`"];
var NEAR2 = { speed: [9, 9], len: [12, 10], gap: [0.15, 0.45] };
var FAR2 = { speed: [4, 2.5], len: [10, 6], gap: [1.1, 1.4] };
function hash4(a, b, c) {
  let h = Math.imul(a, 374761393) + Math.imul(b, 668265263) + Math.imul(c, 2246822519);
  h = Math.imul(h ^ h >>> 13, 1274126177);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}
function matrixRain() {
  const { cols, rows } = meta4;
  const lanes = Array.from({ length: cols }, (_, c) => {
    const kind = c % 2 ? FAR2 : NEAR2;
    const speed = kind.speed[0] + hash4(c, 1, 0) * kind.speed[1];
    const cycle = rows * (1 + kind.gap[0] + kind.gap[1] / 2) + kind.len[0] + kind.len[1] / 2;
    return { kind, speed, phase: (c * 0.618034 + hash4(c, 3, 0) * 0.2) % 1 * cycle, k: 0, from: 0 };
  });
  const span = (c, k, kind) => rows + length(c, k, kind) + rows * (kind.gap[0] + hash4(c, k, 2) * kind.gap[1]);
  const length = (c, k, kind) => kind.len[0] + Math.floor(hash4(c, k, 4) * kind.len[1]);
  const grid = new Array(cols * rows);
  return (t) => {
    grid.fill(" ");
    const tick = Math.floor(t * 20);
    for (let c = 0; c < cols; c++) {
      const lane = lanes[c], { kind, speed, phase } = lane;
      const u = phase + t * speed;
      if (u < lane.from) lane.k = 0, lane.from = 0;
      for (let s; u - lane.from >= (s = span(c, lane.k, kind)); lane.k++) lane.from += s;
      const k = lane.k, head = Math.floor(u - lane.from), len = length(c, k, kind);
      for (let d = 0; d < len; d++) {
        const r = head - d;
        if (r < 0) break;
        if (r >= rows) continue;
        const f = d / len;
        let glyphs;
        if (kind === NEAR2) {
          if (f > 0.5 && hash4(c, r, k * 31 + 7) < ((f - 0.5) / 0.5) ** 2 * 0.8) continue;
          glyphs = d === 0 ? HEAD : d < 3 ? COLLAR : f < 0.5 ? BODY : THIN[f < 0.7 ? 0 : f < 0.86 ? 1 : 2];
        } else {
          if (f > 0.7 && hash4(c, r, k * 31 + 7) < (f - 0.7) * 2) continue;
          glyphs = FAR_SETS[d === 0 ? 0 : f < 0.45 ? 1 : f < 0.8 ? 2 : 3];
        }
        const when = d === 0 ? tick : Math.floor((t + hash4(c, r, 5) * 9) * (0.4 + hash4(c, r, 6) * 1.6));
        grid[c + r * cols] = glyphs[Math.floor(hash4(c, r, when) * glyphs.length)];
      }
    }
    const lines = [];
    for (let r = 0; r < rows; r++) lines.push(grid.slice(r * cols, (r + 1) * cols).join(""));
    return lines.join("\n");
  };
}

// vendor/ascii-rest/night-coast.ts
var night_coast_exports = {};
__export(night_coast_exports, {
  default: () => nightCoast,
  meta: () => meta5
});
var meta5 = {
  name: "night coast",
  category: "scenes",
  note: "a lighthouse turning its beam under moonlit clouds over a dark sea",
  cols: 200,
  rows: 100,
  cell: 1,
  fps: 15,
  ground: "#080b12",
  palette: [
    "#15203d",
    "#1b2a50",
    "#223463",
    "#2b4077",
    "#364e8b",
    "#445f9f",
    "#5874b2",
    "#7089c0",
    "#8a9cc4",
    "#a3b1cf",
    "#bec9dc",
    "#d8dfea",
    "#eef1f6",
    "#f7f8fc",
    "#ffe9ae",
    "#ffd27c",
    "#f3a64a",
    "#c46c2d",
    "#121c1b",
    "#182724",
    "#203530",
    "#2c473d",
    "#3c5c4c",
    "#232a36",
    "#363e4c",
    "#555d6c",
    "#2a3550",
    "#3a4868",
    "#9c4136",
    "#ff5d4d"
  ]
};
var W3 = 200;
var H3 = 100;
var HORIZON = 60;
var MOON = [150, 19];
var LAMP_X = 30;
var DOTS3 = " \xB7\u2022\u25CF";
var COVER3 = [0, 0.3, 0.6, 1];
var BAYER3 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16 - 0.47);
var AIR2 = 0;
var LAND = 1;
var TREE2 = 2;
var TOWER = 3;
var LANTERN = 4;
var CAP = 5;
var WALL2 = 6;
var PANE2 = 7;
var ROOF2 = 8;
var ISLE = 9;
function hash5(x, y) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263);
  h = Math.imul(h ^ h >>> 13, 1274126177);
  return ((h ^ h >>> 16) >>> 0) / 4294967296;
}
function noise4(x, y, period) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = x - xi, fy = y - yi;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  let x0 = xi, x1 = xi + 1;
  if (period) {
    x0 = (xi % period + period) % period;
    x1 = (x0 + 1) % period;
  }
  const a = hash5(x0, yi), b = hash5(x1, yi), c = hash5(x0, yi + 1), d = hash5(x1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function fbm3(x, y, octaves, period) {
  let s = 0, n = 0, amp = 0.5, f = 1;
  for (let i = 0; i < octaves; i++) {
    s += amp * noise4(x * f, y * f, period * f);
    n += amp;
    amp *= 0.5;
    f *= 2;
  }
  return s / n;
}
var clamp3 = (v) => v < 0 ? 0 : v > 1 ? 1 : v;
var smooth3 = (a, b, v) => {
  const k = clamp3((v - a) / (b - a));
  return k * k * (3 - 2 * k);
};
var mix3 = (a, b, k) => a + (b - a) * k;
var hex3 = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
function nightCoast() {
  const P = meta5.palette.map(hex3);
  const N = W3 * H3;
  const out = new Array(N);
  const lut = new Uint8Array(32768).fill(255);
  const nearest = (r, g, b) => {
    const k = Math.min(31, r * 31.99 | 0) << 10 | Math.min(31, g * 31.99 | 0) << 5 | Math.min(31, b * 31.99 | 0);
    if (lut[k] !== 255) return lut[k];
    let best = 0, bd = 1e9;
    for (let i = 0; i < P.length; i++) {
      const dr = P[i][0] - r, dg = P[i][1] - g, db = P[i][2] - b;
      const d = 0.3 * dr * dr + 0.5 * dg * dg + 0.2 * db * db;
      if (d < bd) bd = d, best = i;
    }
    return lut[k] = best;
  };
  const top = (x) => HORIZON - 15 * smooth3(86, 50, x) * (1 - 0.12 * smooth3(24, 0, x)) - 1.6 * fbm3(x * 0.15, 3.7, 3, 0);
  const mat = new Uint8Array(N);
  const shade = new Float32Array(N);
  const base = top(LAMP_X);
  const towerTop = base - 15;
  const trees = [];
  for (let x = 1; x < 76; x += 2.6 + hash5(x * 7, 1) * 2.6) {
    if (x > 22 && x < 49) continue;
    trees.push([x + hash5(x, 2) * 1.2, (4 + hash5(x, 3) * 7) * smooth3(78, 56, x), 2 + hash5(x, 4) * 1.6]);
  }
  const cottage = top(41);
  for (let r = 0; r < H3; r++) {
    for (let x = 0; x < W3; x++) {
      const k = r * W3 + x;
      const y = r + 0.5;
      const t0 = top(x);
      const isle = HORIZON - 4.5 * Math.max(0, 1 - ((x - 180) / 26) ** 2) - 1.4 * fbm3(x * 0.2, 9, 2, 0);
      if (y >= t0 && y < HORIZON + 4 && x < 90) {
        mat[k] = LAND;
        shade[k] = 0.2 + 0.45 * fbm3(x * 0.35, y * 0.35, 3, 0) + 0.5 * smooth3(t0 + 3, t0, y) - 0.2 * smooth3(HORIZON - 4, HORIZON + 4, y);
      } else if (x > 148 && y >= isle && y < HORIZON) {
        mat[k] = ISLE;
      }
      for (const [tx, th, tw] of trees) {
        if (th < 1) continue;
        const tb = top(tx);
        const dy = y - (tb - th);
        if (dy >= 0 && y < tb + 2 && Math.abs(x + 0.5 - tx) <= dy / th * tw + 0.4) {
          mat[k] = TREE2;
          shade[k] = 0.1 + 0.35 * hash5(x * 13 + r, 5) + (x + 0.5 > tx ? 0.35 : 0);
        }
      }
      const dx = x + 0.5 - LAMP_X;
      if (y >= towerTop && y < base + 2) {
        const hw = 3 - 1.1 * smooth3(base, towerTop, y);
        if (Math.abs(dx) <= hw) {
          mat[k] = TOWER;
          shade[k] = 0.45 + 0.5 * (dx / hw);
        }
      }
      if (y >= towerTop - 1 && y < towerTop + 1 && Math.abs(dx) <= 3.6) mat[k] = CAP, shade[k] = 0.55;
      if (y >= towerTop - 7 && y < towerTop - 1 && Math.abs(dx) <= 2) mat[k] = LANTERN;
      if (y >= towerTop - 10 && y < towerTop - 7 && Math.abs(dx) <= 2.8 - (towerTop - 7 - y) * 0.8) mat[k] = CAP, shade[k] = 0.4;
      if (x >= 36 && x <= 47 && y >= cottage - 5 && y < cottage + 1) {
        mat[k] = WALL2;
        shade[k] = 0.3 + 0.4 * (x - 36) / 11;
        if ((x === 39 || x === 44) && y >= cottage - 4 && y < cottage - 1.5) mat[k] = PANE2;
      }
      if (y >= cottage - 10 && y < cottage - 5 && Math.abs(x + 0.5 - 42) <= 7.5 - (cottage - 5 - y) * 1.2) mat[k] = ROOF2;
    }
  }
  const haze = new Float32Array(N);
  for (let k = 0; k < N; k++) haze[k] = fbm3(k % W3 * 0.05, Math.floor(k / W3) * 0.08, 3, 0);
  const CW = 640;
  const cover = new Float32Array(CW * HORIZON);
  const lit = new Float32Array(CW * HORIZON);
  const density = (x, y) => {
    const q = fbm3(x * 8e-3, y * 0.02, 3, CW * 8e-3);
    const d = fbm3(x * 0.018 + q * 2.4, y * 0.036 + q * 1.1, 5, CW * 0.018);
    return d + 0.05 * smooth3(8, 22, y) - 0.04 * smooth3(10, 0, y) - 0.16 * smooth3(36, HORIZON - 4, y);
  };
  for (let r = 0; r < HORIZON; r++) {
    for (let x = 0; x < CW; x++) {
      const y = r + 0.5;
      const d = density(x, y);
      cover[r * CW + x] = smooth3(0.52, 0.63, d);
      const toward = density(x + 2.5, y - 3);
      lit[r * CW + x] = clamp3(0.5 + (d - toward) * 11 - (d - 0.6) * 1.2);
    }
  }
  return (t, { color } = {}) => {
    const beam = t / 8 * Math.PI * 2 - 0.75;
    const cb = Math.cos(beam), sb = Math.sin(beam);
    const flash = Math.pow(Math.max(0, sb), 14) * 2.2;
    const lampY = towerTop - 4;
    const drift = t * 1.4;
    for (let r = 0; r < H3; r++) {
      for (let x = 0; x < W3; x++) {
        const k = r * W3 + x;
        const y = r + 0.5;
        const m = mat[k];
        let cr = 0, cg = 0, cbl = 0, floor = 0.3, fade = 1;
        const dmx = x + 0.5 - MOON[0], dmy = y - MOON[1];
        const dm = Math.sqrt(dmx * dmx + dmy * dmy);
        if (y < HORIZON && m === AIR2) {
          const v = y / HORIZON;
          const halo = Math.exp(-dm / 24) * 0.35 + Math.exp(-dm / 9) * 0.45;
          const glowH = Math.pow(v, 3) * 0.24;
          const veil = 0.85 + 0.3 * haze[r * W3 + x];
          cr = (0.04 + 0.1 * v * v + glowH * 0.9) * veil + 0.3 * halo;
          cg = (0.07 + 0.13 * v * v + glowH) * veil + 0.35 * halo;
          cbl = (0.17 + 0.2 * v * v + glowH * 1.1) * veil + 0.42 * halo;
          floor = 0.15;
          const sx = x + drift, ix = Math.floor(sx), fx = sx - ix;
          const i0 = r * CW + ix % CW, i1 = r * CW + (ix + 1) % CW;
          const c = (cover[i0] + (cover[i1] - cover[i0]) * fx) * (0.15 + 0.85 * smooth3(7, 24, dm));
          const l = lit[i0] + (lit[i1] - lit[i0]) * fx;
          if (dm < 6) {
            const face = 0.86 + 0.14 * fbm3(x * 0.5, y * 0.5, 2, 0);
            const a = (1 - c * 0.8) * smooth3(6, 5, dm);
            cr = mix3(cr, 0.96 * face, a);
            cg = mix3(cg, 0.97 * face, a);
            cbl = mix3(cbl, 1 * face, a);
          } else if (c < 0.05 && hash5(x, r * 3 + 11) > 0.982) {
            const tw = 0.6 + 0.4 * Math.sin(t * (1.5 + hash5(x, r) * 3) + hash5(r, x) * 6.28);
            const s = (0.5 + 0.5 * tw) * (1 - halo) * smooth3(HORIZON, 20, y);
            cr = Math.max(cr, s * 0.92), cg = Math.max(cg, s * 0.94), cbl = Math.max(cbl, s);
          }
          if (c > 0.01) {
            const near = Math.exp(-dm / 30);
            const b = clamp3(l * (0.5 + 0.6 * near) + 0.25 * smooth3(30, HORIZON, y));
            const kr = b < 0.5 ? mix3(0.1, 0.36, b * 2) : mix3(0.36, 0.95, (b - 0.5) * 2);
            const kg = b < 0.5 ? mix3(0.13, 0.42, b * 2) : mix3(0.42, 0.96, (b - 0.5) * 2);
            const kb = b < 0.5 ? mix3(0.25, 0.58, b * 2) : mix3(0.58, 1, (b - 0.5) * 2);
            const a = Math.min(1, c * 1.1);
            cr = mix3(cr, kr, a);
            cg = mix3(cg, kg, a);
            cbl = mix3(cbl, kb, a);
          }
        } else if (y >= HORIZON && (m === AIR2 || m === LAND) && !(m === LAND && y < HORIZON + 4)) {
          const v = (y - HORIZON) / (H3 - HORIZON);
          const w = 0.6 * noise4(x * 0.07 + t * 0.12, y * 0.45 - t * 0.6, 0) + 0.4 * noise4(x * 0.2 - t * 0.25, y * 0.9 - t * 1.1, 0);
          const swell = 0.45 + 0.95 * w;
          cr = (0.08 - 0.04 * v) * swell;
          cg = (0.13 - 0.06 * v) * swell;
          cbl = (0.28 - 0.12 * v) * swell;
          const roadW = 3 + (y - HORIZON) * 0.55;
          const road = Math.exp(-(((x + 0.5 - MOON[0]) / roadW) ** 2));
          const glint = smooth3(0.5, 0.8, w) * road;
          cr += 0.95 * glint + 0.07 * road;
          cg += 0.95 * glint + 0.09 * road;
          cbl += 0.95 * glint + 0.15 * road;
          const lw = 1.3 + (y - HORIZON) * 0.22;
          const refl = Math.exp(-(((x + 0.5 - LAMP_X) / lw) ** 2)) * smooth3(0.45, 0.8, w) * (0.75 + 0.6 * flash);
          cr += refl;
          cg += 0.72 * refl;
          cbl += 0.32 * refl;
          if (y < HORIZON + 8 && x < 90) {
            const edge = smooth3(90, 74, x) * smooth3(HORIZON + 8, HORIZON + 3, y);
            const foam = smooth3(0.5, 0.85, noise4(x * 0.45 - t * 0.6, y * 0.8 + t * 0.4, 0)) * edge;
            cr += 0.65 * foam, cg += 0.7 * foam, cbl += 0.75 * foam;
          }
          const haze2 = Math.exp(-(y - HORIZON) / 2.5) * 0.16;
          cr += haze2 * 0.8, cg += haze2 * 0.9, cbl += haze2;
          floor = 0.18;
          fade = smooth3(H3, H3 - 26, y);
        } else if (m === LAND) {
          const s = shade[k];
          cr = 0.05 + 0.14 * s, cg = 0.09 + 0.2 * s, cbl = 0.1 + 0.18 * s;
          floor = 0.1;
        } else if (m === TREE2) {
          const s = shade[k];
          cr = 0.03 + 0.07 * s, cg = 0.07 + 0.14 * s, cbl = 0.07 + 0.1 * s;
          floor = 0.06;
        } else if (m === ISLE) {
          cr = 0.06, cg = 0.08, cbl = 0.15;
          floor = 0.1;
          if (x === 184 && r === 55) {
            const on = Math.sin(t * 2.2) > 0.55;
            cr = on ? 1 : 0.35, cg = on ? 0.36 : 0.12, cbl = on ? 0.3 : 0.1;
          }
        } else if (m === TOWER || m === CAP) {
          const s = shade[k];
          cr = 0.4 + 0.58 * s, cg = 0.42 + 0.56 * s, cbl = 0.48 + 0.52 * s;
          if (m === CAP) cr *= 0.7, cg *= 0.66, cbl *= 0.68;
        } else if (m === LANTERN) {
          const g = 0.85 + 0.15 * Math.min(1, flash);
          cr = g, cg = 0.84 * g, cbl = 0.5 * g;
        } else if (m === WALL2) {
          const s = shade[k];
          cr = 0.3 + 0.4 * s, cg = 0.32 + 0.4 * s, cbl = 0.38 + 0.4 * s;
        } else if (m === PANE2) {
          const g = 0.85 + 0.15 * Math.sin(t * 3 + x);
          cr = g, cg = 0.72 * g, cbl = 0.32 * g;
        } else if (m === ROOF2) {
          cr = 0.4, cg = 0.17, cbl = 0.14;
        }
        const bx = x + 0.5 - LAMP_X, by = y - lampY;
        if (m !== TOWER && m !== CAP && m !== LANTERN) {
          if (bx * cb > 0) {
            const along = Math.abs(bx) / (Math.abs(cb) * 115 + 1);
            if (along < 1) {
              const spread = 1.4 + Math.abs(bx) * 0.11;
              const b = Math.pow(1 - along, 1.8) * Math.exp(-((by / spread) ** 2)) * 0.85;
              cr += b, cg += b * 0.84, cbl += b * 0.5;
            }
          }
          const dl = Math.sqrt(bx * bx + by * by);
          const glow = Math.exp(-dl / (3.5 + 3 * flash)) * (0.5 + 0.6 * flash) + Math.exp(-dl / 14) * 0.12;
          cr += glow, cg += glow * 0.82, cbl += glow * 0.5;
        }
        const peak = Math.max(cr, cg, cbl, 1e-4);
        const level = clamp3(floor + (1 - floor) * Math.pow(peak, 0.85) * 0.95) * fade;
        const step = Math.max(0, Math.min(3, Math.round(level * 3 + BAYER3[(r & 3) * 4 + (x & 3)])));
        out[k] = DOTS3[step];
        if (color) {
          const want = step ? Math.min(1, (level + 0.06) / COVER3[step]) : 0;
          const s = (0.3 + 0.7 * want) / peak;
          color[k] = nearest(clamp3(cr * s), clamp3(cg * s), clamp3(cbl * s));
        }
      }
    }
    const lines = [];
    for (let r = 0; r < H3; r++) lines.push(out.slice(r * W3, (r + 1) * W3).join(""));
    return lines.join("\n");
  };
}

// vendor/ascii-rest/starfield.ts
var starfield_exports = {};
__export(starfield_exports, {
  default: () => starfield,
  meta: () => meta6
});
var meta6 = {
  name: "starfield",
  category: "space",
  note: "stars rush out from the centre and streak at the edges",
  cols: 64,
  rows: 24,
  fps: 30,
  options: { stars: 60, speed: 1 }
};
var mulberry322 = (a) => () => {
  a = a + 1831565813 | 0;
  let t = Math.imul(a ^ a >>> 15, 1 | a);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};
function starfield({ stars = 60, speed = 1 } = {}) {
  const { cols, rows } = meta6;
  const cx = cols / 2, cy = rows / 2;
  const F2 = 10;
  const NEAR3 = 0.04, FAR3 = 1.3, SEEN = 1.05;
  const SHUTTER = 0.16;
  const LIFE = 4 / speed;
  const rand = mulberry322(7);
  const phase = Array.from({ length: stars }, () => rand());
  const grid = new Array(cols * rows);
  const order = new Array(stars);
  const place = (i, k) => {
    const r = mulberry322(i * 7919 + k * 104729 + 13);
    const a = (i + r()) / stars * Math.PI * 2;
    const d = 0.25 + 0.75 * Math.sqrt(r());
    return [Math.cos(a) * d, Math.sin(a) * d];
  };
  const put = (c, r, ch) => {
    if (c < 0 || c >= cols || r < 0 || r >= rows) return;
    const k = c + r * cols;
    if (grid[k] === " ") grid[k] = ch;
  };
  return (t) => {
    grid.fill(" ");
    for (let i = 0; i < stars; i++) {
      const u = phase[i] + t / LIFE;
      const k = Math.floor(u);
      order[i] = [FAR3 - (FAR3 - NEAR3) * (u - k), i, k];
    }
    order.sort((a, b) => a[0] - b[0]);
    for (const [z, i, k] of order) {
      if (z > SEEN) continue;
      const [x, y] = place(i, k);
      const hx = cx + x / z * F2, hy = cy + y / z * F2 * 0.5;
      const zt = z + SHUTTER;
      const c1 = Math.floor(hx), r1 = Math.floor(hy);
      const c0 = Math.floor(cx + x / zt * F2), r0 = Math.floor(cy + y / zt * F2 * 0.5);
      put(c1, r1, z > 0.5 ? "." : z > 0.25 ? "+" : "*");
      if (z > 0.5) continue;
      const n = Math.max(Math.abs(c1 - c0), Math.abs(r1 - r0));
      const fade = Math.min(2, Math.floor(n / 3));
      for (let s = 0; s < n; s++) {
        const c = Math.round(c0 + (c1 - c0) * s / n), r = Math.round(r0 + (r1 - r0) * s / n);
        const dc = Math.round(c0 + (c1 - c0) * (s + 1) / n) - c;
        const dr = Math.round(r0 + (r1 - r0) * (s + 1) / n) - r;
        const g = dr === 0 ? "-" : dc === 0 ? "|" : dc * dr > 0 ? "\\" : "/";
        put(c, r, s < fade ? "." : g);
      }
    }
    const lines = [];
    for (let r = 0; r < rows; r++) lines.push(grid.slice(r * cols, (r + 1) * cols).join(""));
    return lines.join("\n");
  };
}

// src/scenes.js
var pieces = { "ascii-aurora": aurora_exports, "ascii-aurora-fjord": aurora_fjord_exports, "ascii-earthrise": earthrise_exports, "ascii-matrix-rain": matrix_rain_exports, "ascii-night-coast": night_coast_exports, "ascii-starfield": starfield_exports };
function createScenes() {
  const frames = /* @__PURE__ */ new Map();
  return function draw(ctx, w, h, t, scene, light) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = light ? "#dbe4ea" : "#08101e";
    ctx.fillRect(0, 0, w, h);
    if (pieces[scene]) {
      let cached = frames.get(scene);
      if (!cached) {
        const piece = pieces[scene], meta8 = piece.meta, canvas2 = document.createElement("canvas");
        canvas2.width = meta8.cols * 8;
        canvas2.height = meta8.rows * (meta8.cell === 1 ? 8 : 16);
        cached = { meta: meta8, frame: piece.default(), canvas: canvas2, colors: new Uint8Array(meta8.cols * meta8.rows) };
        frames.set(scene, cached);
      }
      const { meta: meta7, frame, canvas, colors } = cached, c = canvas.getContext("2d"), rows = frame(t, { paper: light, color: colors }).split("\n");
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.font = "14px monospace";
      c.textBaseline = "top";
      rows.forEach((row, y) => [...row].forEach((glyph, x) => {
        if (glyph === " ") return;
        c.fillStyle = meta7.palette?.[colors[y * meta7.cols + x]] || (light ? "#31516d" : "#67d5c7");
        if (meta7.cell === 1) {
          c.fillRect(x * 8, y * 8, 7, 7);
        } else c.fillText(glyph, x * 8, y * 16);
      }));
      const scale = Math.max(w / canvas.width, h / canvas.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, (w - canvas.width * scale) / 2, (h - canvas.height * scale) / 2, canvas.width * scale, canvas.height * scale);
      return;
    }
    if (scene === "space") {
      for (let i = 0; i < 180; i++) {
        const x = (i * 83.71 + t * (i % 3 + 1) * 3) % w, y = (Math.sin(i * 13.37) * 0.5 + 0.5) * h;
        ctx.fillStyle = `rgba(${light ? "35,65,105" : "185,219,255"},${0.25 + 0.5 * (Math.sin(t + i) * 0.5 + 0.5)})`;
        ctx.fillRect(x, y, i % 9 === 0 ? 3 : 1, i % 9 === 0 ? 3 : 1);
      }
      return;
    }
    for (let band = 0; band < 7; band++) {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 8) {
        const y = scene === "ocean" ? h * (0.42 + band * 0.075) + Math.sin(x / w * 12 + t * (0.25 + band * 0.04) + band) * h * 0.028 : h * (0.18 + band * 0.055) + Math.sin(x / w * 7 + t * 0.35 + band * 0.32) * h * 0.14;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fillStyle = scene === "ocean" ? `hsla(${198 + band * 4},65%,${light ? 65 : 22 + band * 3}%,.24)` : `hsla(${145 + band * 16},75%,${light ? 50 : 45}%,.08)`;
      ctx.fill();
    }
  };
}

// src/media.js
function createMediaStore() {
  let db, opening, disposed = false;
  async function open() {
    if (disposed) throw Error("Almac\xE9n cerrado.");
    if (db) return db;
    if (!opening) opening = new Promise((resolve, reject) => {
      const request = indexedDB.open(ID, 1);
      request.onupgradeneeded = () => request.result.createObjectStore("media");
      request.onsuccess = () => {
        if (disposed) {
          request.result.close();
          reject(Error("Almac\xE9n cerrado."));
        } else {
          db = request.result;
          resolve(db);
        }
      };
      request.onerror = () => {
        opening = void 0;
        reject(request.error);
      };
    });
    return opening;
  }
  return { async run(mode, value) {
    const handle = await open();
    if (disposed) throw Error("Almac\xE9n cerrado.");
    return new Promise((resolve, reject) => {
      const tx = handle.transaction("media", mode === "read" ? "readonly" : "readwrite"), store = tx.objectStore("media"), r = mode === "read" ? store.get("current") : mode === "delete" ? store.delete("current") : store.put(value, "current");
      let result;
      r.onsuccess = () => {
        result = r.result;
      };
      tx.oncomplete = () => resolve(result);
      tx.onerror = tx.onabort = () => reject(tx.error || Error("No se pudo guardar el archivo."));
    });
  }, dispose() {
    disposed = true;
    db?.close();
    db = void 0;
  } };
}
async function decodeMedia(file) {
  const kind = validateMedia(file), url = URL.createObjectURL(file), element = document.createElement(kind === "video" ? "video" : "img");
  if (kind === "video") {
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.preload = "auto";
  }
  try {
    await new Promise((resolve, reject) => {
      const timer = setTimeout(() => done(Error("Tiempo de decodificaci\xF3n agotado.")), 15e3), event = kind === "video" ? "loadeddata" : "load";
      function done(error) {
        clearTimeout(timer);
        element.removeEventListener(event, ready);
        element.removeEventListener("error", failed);
        error ? reject(error) : resolve();
      }
      const ready = () => done(), failed = () => done(Error("El navegador no puede decodificar este archivo."));
      element.addEventListener(event, ready, { once: true });
      element.addEventListener("error", failed, { once: true });
      element.src = url;
    });
  } catch (error) {
    URL.revokeObjectURL(url);
    element.removeAttribute("src");
    throw error;
  }
  return { kind, element, dispose() {
    if (kind === "video") element.pause();
    element.removeAttribute("src");
    if (kind === "video") element.load();
    URL.revokeObjectURL(url);
  } };
}

// src/controller.js
function createController(theme, storage = localStorage) {
  let state = { ...DEFAULTS }, status = "", disposed = false, media, request = 0, last = 0, time = 0, activity = performance.now(), queue = Promise.resolve(), generation = 0;
  const listeners = /* @__PURE__ */ new Set(), draw = createScenes(), store = createMediaStore(), reduced = matchMedia("(prefers-reduced-motion: reduce)"), body = document.body;
  try {
    state = normalize(JSON.parse(storage.getItem(KEY)));
  } catch {
  }
  if (state.shuffle === "startup") state.scene = nextScene(state.scene);
  const stage = document.createElement("div");
  stage.className = "pwn-wallpaper-stage";
  stage.setAttribute("aria-hidden", "true");
  const canvas = document.createElement("canvas"), veil = document.createElement("div");
  veil.className = "pwn-wallpaper-veil";
  stage.append(canvas, veil);
  body.prepend(stage);
  const prior = body.getAttribute("data-pwn-wallpaper"), priorVars = new Map(["--pwn-wallpaper-material-1", "--pwn-wallpaper-material-2"].map((k) => [k, [body.style.getPropertyValue(k), body.style.getPropertyPriority(k)]]));
  const notify = () => {
    if (!disposed) listeners.forEach((fn) => fn());
  };
  function paint() {
    if (disposed) return;
    const w = Math.round(innerWidth * Math.min(devicePixelRatio, 1.5)), h = Math.round(innerHeight * Math.min(devicePixelRatio, 1.5));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    const ctx = canvas.getContext("2d");
    if (state.scene === "local") {
      ctx.clearRect(0, 0, w, h);
      if (media?.kind === "image") {
        const rect = fitRect(w, h, media.element.naturalWidth, media.element.naturalHeight, state.fit);
        ctx.drawImage(media.element, rect.x, rect.y, rect.width, rect.height);
      }
    } else draw(ctx, w, h, time, state.scene, theme.getTheme().active.colorScheme === "light");
  }
  function loop(now) {
    request = 0;
    if (disposed) return;
    const fps = frameRate(state, { hidden: document.hidden, reduced: reduced.matches, idle: now - activity });
    if (!fps) return;
    if (now - last >= 1e3 / fps) {
      time += Math.min(0.2, (now - last) / 1e3) * state.speed;
      last = now;
      paint();
    }
    request = requestAnimationFrame(loop);
  }
  function render() {
    if (disposed) return;
    cancelAnimationFrame(request);
    request = 0;
    last = performance.now();
    stage.hidden = state.scene === "none";
    if (stage.hidden) body.removeAttribute("data-pwn-wallpaper");
    else body.setAttribute("data-pwn-wallpaper", "true");
    const light = theme.getTheme().active.colorScheme === "light";
    body.style.setProperty("--pwn-wallpaper-material-1", light ? "#f3f5f8" : "#151b26");
    body.style.setProperty("--pwn-wallpaper-material-2", light ? "#e6eaf0" : "#202936");
    stage.style.filter = `brightness(${state.brightness})`;
    veil.style.background = `rgba(0,0,0,${state.scrim})`;
    if (media?.kind === "video") {
      media.element.style.objectFit = state.fit;
      media.element.hidden = state.scene !== "local";
      const playing = state.scene === "local" && frameRate(state, { hidden: document.hidden, reduced: reduced.matches }) > 0;
      if (playing) {
        const current = media;
        void current.element.play().then(() => {
          if (disposed || current !== media || state.scene !== "local" || !frameRate(state, { hidden: document.hidden, reduced: reduced.matches })) current.element.pause();
        }).catch(() => {
          if (!disposed) {
            status = "El navegador bloque\xF3 la reproducci\xF3n. Cambia Pausar para reintentar.";
            notify();
          }
        });
      } else media.element.pause();
    }
    paint();
    if (frameRate(state, { hidden: document.hidden, reduced: reduced.matches }) > 0) request = requestAnimationFrame(loop);
    notify();
  }
  function save() {
    try {
      storage.setItem(KEY, JSON.stringify(state));
    } catch {
      status = "Ajustes activos sin guardar.";
    }
  }
  const wake = () => {
    activity = performance.now();
  }, resize = () => paint();
  document.addEventListener("visibilitychange", render);
  reduced.addEventListener("change", render);
  window.addEventListener("resize", resize);
  window.addEventListener("pointerdown", wake, { passive: true });
  window.addEventListener("keydown", wake);
  const hourly = setInterval(() => {
    if (state.shuffle === "hourly" && !document.hidden && !state.paused) {
      state.scene = nextScene(state.scene);
      save();
      render();
    }
  }, 36e5);
  async function importMedia(file, persist = true) {
    const ticket = ++generation;
    queue = queue.catch(() => {
    }).then(async () => {
      let decoded;
      try {
        decoded = await decodeMedia(file);
        if (disposed || ticket !== generation) {
          decoded.dispose();
          return;
        }
        if (persist) await store.run("write", file);
        if (disposed || ticket !== generation) {
          decoded.dispose();
          return;
        }
        media?.dispose();
        media?.element.remove();
        media = decoded;
        if (media.kind === "video") {
          media.element.className = "pwn-wallpaper-video";
          stage.insertBefore(media.element, veil);
        }
        if (persist) state.scene = "local";
        status = "Archivo local disponible; no se env\xEDa a ning\xFAn servidor.";
        save();
        render();
      } catch (error) {
        decoded?.dispose();
        if (!disposed && ticket === generation) {
          status = error.message;
          notify();
        }
      }
    });
    return queue;
  }
  void store.run("read").then((file) => {
    if (file && !disposed && generation === 0) void importMedia(file, false);
  }).catch(() => {
    if (!disposed) {
      status = "No se pudo leer el archivo local guardado.";
      notify();
    }
  });
  render();
  return { get state() {
    return { ...state };
  }, get status() {
    return status;
  }, subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, update(patch) {
    state = normalize({ ...state, ...patch });
    save();
    render();
  }, onThemeChange: render, importMedia, next() {
    this.update({ scene: nextScene(state.scene) });
  }, reset() {
    this.update(DEFAULTS);
  }, async clear() {
    const ticket = ++generation;
    queue = queue.catch(() => {
    }).then(async () => {
      try {
        await store.run("delete");
        if (disposed || ticket !== generation) return;
        media?.dispose();
        media?.element.remove();
        media = void 0;
        state.scene = DEFAULTS.scene;
        status = "Archivo eliminado.";
        save();
        render();
      } catch (error) {
        if (!disposed) {
          status = error.message;
          notify();
        }
      }
    });
    return queue;
  }, dispose() {
    disposed = true;
    generation++;
    cancelAnimationFrame(request);
    clearInterval(hourly);
    document.removeEventListener("visibilitychange", render);
    reduced.removeEventListener("change", render);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointerdown", wake);
    window.removeEventListener("keydown", wake);
    media?.dispose();
    stage.remove();
    if (prior === null) body.removeAttribute("data-pwn-wallpaper");
    else body.setAttribute("data-pwn-wallpaper", prior);
    for (const [k, [v, p]] of priorVars) {
      if (v) body.style.setProperty(k, v, p);
      else body.style.removeProperty(k);
    }
    listeners.clear();
    void queue.finally(() => store.dispose());
  } };
}

// src/panel.js
var import_react = require("react");
function installPanel(ctx, { id, title, controller, fields, actions = [], position = 24 }) {
  function controls() {
    const root = document.createElement("section");
    root.className = "pwn-panel";
    const heading = document.createElement("h2");
    heading.textContent = title;
    root.append(heading);
    const refreshers = [];
    for (const field of fields) {
      const label = document.createElement("label");
      label.textContent = field.label;
      const input = document.createElement(field.options ? "select" : "input");
      input.name = field.key;
      if (field.options) for (const [value, name2] of field.options) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = name2;
        input.append(option);
      }
      else {
        input.type = field.type || "range";
        for (const prop of ["min", "max", "step", "accept"]) if (field[prop] != null) input[prop] = field[prop];
      }
      const read = () => input.type === "checkbox" ? input.checked : input.type === "range" ? Number(input.value) : input.value;
      input.onchange = () => {
        if (field.type === "file") {
          if (input.files[0]) void field.run(input.files[0]);
          input.value = "";
        } else controller.update({ [field.key]: read() });
      };
      if (field.type !== "file") refreshers.push(() => {
        if (document.activeElement !== input) {
          if (input.type === "checkbox") input.checked = controller.state[field.key];
          else input.value = controller.state[field.key];
        }
      });
      label.append(input);
      root.append(label);
    }
    for (const [name2, run] of actions) {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = name2;
      button.onclick = () => void run();
      root.append(button);
    }
    const status = document.createElement("p");
    status.setAttribute("role", "status");
    root.append(status);
    const refresh = () => {
      refreshers.forEach((fn) => fn());
      status.textContent = controller.status || "";
    }, off = controller.subscribe(refresh);
    refresh();
    return { element: root, dispose() {
      off();
      root.remove();
    } };
  }
  const dialog = document.createElement("dialog");
  dialog.className = "pwn-dialog";
  dialog.setAttribute("aria-label", title);
  const close = document.createElement("button");
  close.textContent = "Cerrar";
  close.onclick = () => dialog.close();
  const view = controls();
  dialog.append(close, view.element);
  document.body.append(dialog);
  ctx.effect(() => () => {
    view.dispose();
    dialog.remove();
  });
  function Settings() {
    const ref = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      const view2 = controls();
      ref.current.append(view2.element);
      return () => view2.dispose();
    }, []);
    return (0, import_react.createElement)("div", { ref, "data-pwn-settings": id });
  }
  function Launcher() {
    return (0, import_react.createElement)("button", { className: "pwn-launcher", style: { right: position }, onClick: () => dialog.showModal(), "aria-label": "Abrir " + title }, title);
  }
  ctx.effect(() => ctx.slots.inject("settings.general.item", () => ctx.slots.register({ name: "settings.general.item", id, order: 70 }, Settings)));
  ctx.effect(() => ctx.slots.inject("shell.overlay", () => ctx.slots.register({ name: "shell.overlay", id, order: 70 }, Launcher)));
}

// src/styles.css
var styles_default = ".pwn-panel{padding:22px;max-width:620px;font:14px/1.5 system-ui;color:var(--dsw-alias-label-primary,#e7eaf0)}.pwn-panel label{display:flex;justify-content:space-between;align-items:center;gap:14px;margin:16px 0}.pwn-panel input,.pwn-panel select{max-width:230px}.pwn-panel select,.pwn-panel button,.pwn-dialog>button{font:inherit;background:var(--dsw-alias-bg-layer-2,#242936);color:inherit;border:1px solid #78839a66;padding:8px 12px;border-radius:8px}.pwn-panel button{margin:5px}.pwn-panel p{opacity:.8;overflow-wrap:anywhere}.pwn-dialog{width:min(500px,calc(100vw - 32px));max-height:calc(100dvh - 36px);overflow:auto;border:0;border-radius:16px;color:var(--dsw-alias-label-primary,#edf0f9);background:var(--dsw-alias-bg-layer-1,#181d27)}.pwn-dialog::backdrop{background:#0007}.pwn-launcher{position:fixed;bottom:22px;background:var(--dsw-alias-bg-layer-2,#252b35);color:var(--dsw-alias-label-primary,#eff1f7);border:1px solid #75839755;padding:10px 14px;border-radius:20px;pointer-events:auto;font:13px system-ui}@media(max-width:520px){.pwn-panel{padding:14px}.pwn-panel label{flex-wrap:wrap}.pwn-launcher{bottom:14px}}\n\nbody[data-pwn-wallpaper]{isolation:isolate;--dsw-alias-bg-base:transparent!important;--dsw-alias-bg-layer-1:color-mix(in srgb,var(--pwn-material-1,var(--pwn-wallpaper-material-1)) 82%,transparent)!important;--dsw-alias-bg-layer-2:color-mix(in srgb,var(--pwn-material-2,var(--pwn-wallpaper-material-2)) 90%,transparent)!important;--dsw-specific-sidebar-fill:var(--dsw-alias-bg-layer-1)!important;}\n.pwn-wallpaper-stage{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;background:#08101e}.pwn-wallpaper-stage[hidden]{display:none}.pwn-wallpaper-stage canvas,.pwn-wallpaper-video,.pwn-wallpaper-veil{position:absolute;inset:0;width:100%;height:100%}.pwn-wallpaper-veil{z-index:1}\n";

// src/client.js
var name = "pwnvader-wallpapers-client";
var inject = ["theme", "slots"];
function apply(ctx) {
  let controller;
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = ID;
    style.textContent = styles_default;
    document.head.append(style);
    controller = createController(ctx.theme);
    return () => {
      controller.dispose();
      style.remove();
    };
  });
  ctx.on("theme/change", () => controller.onThemeChange());
  ctx.provide("pwnvaderWallpapers", { version: 1, getSettings: () => controller.state, applySettings: (v) => controller.update(v), subscribe: (f) => controller.subscribe(f) });
  installPanel(ctx, { id: ID, title: "Wallpapers", position: 138, controller, fields: [{ key: "scene", label: "Escena", options: SCENES.map((v) => [v, v]) }, { key: "brightness", label: "Brillo", min: 0.2, max: 1.5, step: 0.05 }, { key: "scrim", label: "Oscurecer", min: 0, max: 0.85, step: 0.05 }, { key: "speed", label: "Velocidad", min: 0.1, max: 2, step: 0.1 }, { key: "fps", label: "FPS", min: 5, max: 30, step: 1 }, { key: "fit", label: "Ajuste", options: [["cover", "Cubrir"], ["contain", "Completo"]] }, { key: "power", label: "Energ\xEDa", options: [["saver", "Ahorro"], ["smooth", "Fluido"]] }, { key: "shuffle", label: "Rotaci\xF3n", options: [["off", "Desactivada"], ["startup", "Al iniciar"], ["hourly", "Cada hora"]] }, { key: "paused", label: "Pausar", type: "checkbox" }, { key: "media", label: "Archivo local", type: "file", accept: "image/png,image/jpeg,image/webp,image/avif,video/mp4,video/webm", run: (f) => controller.importMedia(f) }], actions: [["Siguiente", () => controller.next()], ["Eliminar archivo", () => controller.clear()], ["Restablecer", () => controller.reset()]] });
}
return module.exports;}});
//# sourceMappingURL=client.js.map

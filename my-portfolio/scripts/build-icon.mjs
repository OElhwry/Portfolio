import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const SRC = "C:/Users/omare/OneDrive/Pictures/Screenshots/Screenshot 2026-04-16 185056.png";
const BG = { r: 11, g: 11, b: 13, alpha: 1 };

const trimmed = await sharp(SRC).trim({ threshold: 20 }).toBuffer();
const { width, height } = await sharp(trimmed).metadata();

const side = Math.max(width, height);
const padding = Math.round(side * 0.1);
const canvas = side + padding * 2;

const squared = await sharp({
  create: {
    width: canvas,
    height: canvas,
    channels: 4,
    background: BG,
  },
})
  .composite([
    {
      input: trimmed,
      top: Math.round((canvas - height) / 2),
      left: Math.round((canvas - width) / 2),
    },
  ])
  .png()
  .toBuffer();

await sharp(squared).resize(512, 512).png().toFile(path.join(root, "app", "icon.png"));
await sharp(squared).resize(180, 180).png().toFile(path.join(root, "app", "apple-icon.png"));
await sharp(squared).resize(512, 512).png().toFile(path.join(root, "public", "logo.png"));

console.log(`trimmed: ${width}x${height}  →  canvas: ${canvas}x${canvas}`);
console.log("wrote app/icon.png, app/apple-icon.png, public/logo.png");

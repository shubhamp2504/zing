/**
 * Generate PWA icons for ZING
 * Usage: node scripts/generate-icons.mjs
 */
import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// ZING lightning bolt SVG – gold on dark background
const createIcon = (size, maskable = false) => {
  const padding = maskable ? Math.round(size * 0.2) : Math.round(size * 0.1);
  const boltSize = size - padding * 2;
  const cx = size / 2;
  const cy = size / 2;

  // Lightning bolt path scaled to boltSize
  // The bolt fits in a ~60x100 unit box, we scale to boltSize
  const scale = boltSize / 100;
  const ox = cx - 30 * scale;
  const oy = cy - 50 * scale;

  const s = (x, y) => `${ox + x * scale},${oy + y * scale}`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${maskable ? 0 : Math.round(size * 0.18)}" fill="#0A0A0A"/>
  <polygon points="${s(35, 0)} ${s(10, 55)} ${s(28, 55)} ${s(20, 100)} ${s(55, 40)} ${s(34, 40)} ${s(45, 0)}"
    fill="#FFD700" stroke="#FFA500" stroke-width="${Math.max(1, scale * 2)}" stroke-linejoin="round"/>
  <text x="${cx}" y="${size - padding * 0.5}" font-family="sans-serif" font-weight="800"
    font-size="${Math.round(size * 0.13)}px" fill="#FFD700" text-anchor="middle" dominant-baseline="middle">ZING</text>
</svg>`;
};

const sizes = [
  { name: 'icon-192.png', size: 192, maskable: false },
  { name: 'icon-512.png', size: 512, maskable: false },
  { name: 'icon-512-maskable.png', size: 512, maskable: true },
];

for (const { name, size, maskable } of sizes) {
  const svg = createIcon(size, maskable);
  await sharp(Buffer.from(svg)).png().toFile(join(publicDir, name));
  console.log(`✅ Created ${name} (${size}x${size}${maskable ? ' maskable' : ''})`);
}

// Also create a favicon.ico (32x32 PNG used as favicon)
const faviconSvg = createIcon(32, false);
await sharp(Buffer.from(faviconSvg)).png().toFile(join(publicDir, 'favicon.png'));
console.log('✅ Created favicon.png (32x32)');

console.log('\nAll icons generated in public/');

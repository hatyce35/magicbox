import fs from 'fs';
import zlib from 'zlib';

function createPNG(size, bgRGB, boxRGB, starRGB) {
  // Create RGBA buffer
  const width = size;
  const height = size;
  const buffer = Buffer.alloc(width * height * 4);

  const cx = width / 2;
  const cy = height / 2;
  const radius = size * 0.44;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background gradient
      const gradT = (x + y) / (width + height);
      let r = Math.floor(76 + gradT * (109 - 76));
      let g = Math.floor(29 + gradT * (40 - 29));
      let b = Math.floor(149 + gradT * (217 - 149));

      // Draw rounded box in center
      const boxW = size * 0.54;
      const boxH = size * 0.44;
      const boxLeft = cx - boxW / 2;
      const boxTop = cy - boxH / 2 + size * 0.05;
      const inBox = x >= boxLeft && x <= boxLeft + boxW && y >= boxTop && y <= boxTop + boxH;

      // Draw lid
      const lidW = size * 0.62;
      const lidH = size * 0.16;
      const lidLeft = cx - lidW / 2;
      const lidTop = boxTop - lidH * 0.6;
      const inLid = x >= lidLeft && x <= lidLeft + lidW && y >= lidTop && y <= lidTop + lidH;

      if (inLid) {
        // Pink / magenta lid
        r = 236; g = 72; b = 153;
      } else if (inBox) {
        // Purple box
        r = 147; g = 51; b = 234;
        // Golden bands
        const band1 = Math.abs(x - (cx - size * 0.14)) < size * 0.035;
        const band2 = Math.abs(x - (cx + size * 0.14)) < size * 0.035;
        if (band1 || band2) {
          r = 250; g = 204; b = 21;
        }
      }

      // Center glowing emblem
      const emblemDist = Math.sqrt((x - cx) ** 2 + (y - (cy + size * 0.08)) ** 2);
      if (emblemDist < size * 0.1) {
        r = 250; g = 204; b = 21;
      } else if (emblemDist < size * 0.12) {
        r = 254; g = 240; b = 138;
      }

      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = 255; // Alpha
    }
  }

  // Build PNG chunk format
  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (1 + width * 4);
    rawScanlines[rowStart] = 0; // filter type 0: None
    buffer.copy(rawScanlines, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  const deflated = zlib.deflateSync(rawScanlines);

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(12 + len);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4);
    data.copy(buf, 8);

    // CRC32
    let crc = 0xffffffff;
    for (let i = 4; i < 8 + len; i++) {
      let byte = buf[i];
      crc ^= byte;
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
      }
    }
    buf.writeInt32BE(~crc, 8 + len);
    return buf;
  }

  const header = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace

  const ihdr = makeChunk('IHDR', ihdrData);
  const idat = makeChunk('IDAT', deflated);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdr, idat, iend]);
}

const sizes = [
  { file: 'public/pwa-192x192.png', size: 192 },
  { file: 'public/pwa-512x512.png', size: 512 },
  { file: 'public/pwa-maskable-512x512.png', size: 512 },
  { file: 'public/apple-touch-icon.png', size: 180 },
];

for (const { file, size } of sizes) {
  const png = createPNG(size);
  fs.writeFileSync(file, png);
  console.log(`Generated ${file} (${size}x${size})`);
}

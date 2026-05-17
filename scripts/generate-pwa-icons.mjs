import fs from "node:fs";
import zlib from "node:zlib";

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

function crc32(buffer) {
  let crc = -1;

  for (const byte of buffer) {
    crc ^= byte;

    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }

  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);

  length.writeUInt32BE(data.length, 0);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);

  return Buffer.concat([length, typeBuffer, data, crc]);
}

function isInRoundedRect(x, y, left, top, width, height, radius) {
  const right = left + width;
  const bottom = top + height;

  if (x >= left + radius && x <= right - radius && y >= top && y <= bottom) {
    return true;
  }

  if (x >= left && x <= right && y >= top + radius && y <= bottom - radius) {
    return true;
  }

  const corners = [
    [left + radius, top + radius],
    [right - radius, top + radius],
    [left + radius, bottom - radius],
    [right - radius, bottom - radius],
  ];

  return corners.some(([cx, cy]) => {
    const dx = x - cx;
    const dy = y - cy;
    return dx * dx + dy * dy <= radius * radius;
  });
}

function createIcon(size, filePath) {
  const pixels = Buffer.alloc(size * size * 4);
  const background = [37, 99, 235, 255];
  const foreground = [255, 255, 255, 255];

  const bubbleLeft = size * 0.2;
  const bubbleTop = size * 0.28;
  const bubbleWidth = size * 0.6;
  const bubbleHeight = size * 0.38;
  const bubbleRadius = size * 0.08;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const offset = (y * size + x) * 4;

      let color = background;

      const inBubble = isInRoundedRect(
        x,
        y,
        bubbleLeft,
        bubbleTop,
        bubbleWidth,
        bubbleHeight,
        bubbleRadius,
      );

      const inTail =
        x > size * 0.4 &&
        x < size * 0.52 &&
        y > size * 0.62 &&
        y < size * 0.78 &&
        x - size * 0.4 < size * 0.78 - y;

      if (inBubble || inTail) {
        color = foreground;
      }

      pixels[offset] = color[0];
      pixels[offset + 1] = color[1];
      pixels[offset + 2] = color[2];
      pixels[offset + 3] = color[3];
    }
  }

  const scanlines = Buffer.alloc((size * 4 + 1) * size);

  for (let y = 0; y < size; y += 1) {
    const scanlineStart = y * (size * 4 + 1);
    scanlines[scanlineStart] = 0;
    pixels.copy(scanlines, scanlineStart + 1, y * size * 4, (y + 1) * size * 4);
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const png = Buffer.concat([
    PNG_SIGNATURE,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(scanlines)),
    chunk("IEND", Buffer.alloc(0)),
  ]);

  fs.writeFileSync(filePath, png);
}

fs.mkdirSync("public/icons", { recursive: true });

createIcon(180, "public/icons/apple-touch-icon.png");
createIcon(192, "public/icons/icon-192.png");
createIcon(512, "public/icons/icon-512.png");
createIcon(512, "public/icons/maskable-512.png");

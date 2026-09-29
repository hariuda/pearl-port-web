const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const sharp = require('sharp');

async function run() {
  console.log('=== Step 1: Extracting Master Icon & Preparing Source Assets ===');
  const rootDir = path.resolve(__dirname, '..');
  const assetsDir = path.join(rootDir, 'assets');
  const publicDir = path.join(rootDir, 'public');
  const publicIconsDir = path.join(publicDir, 'icons');

  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  if (!fs.existsSync(publicIconsDir)) fs.mkdirSync(publicIconsDir, { recursive: true });

  const rawIconPath = path.join(assetsDir, 'images/app_icon.png');
  const BRAND_BG = { r: 32, g: 16, b: 78, alpha: 1 }; // #20104E

  const { data, info } = await sharp(rawIconPath)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width, height = info.height, channels = info.channels;

  // Bounding box of the emblem (P monogram + pearl) inside the master image
  const cropX = 242;
  const cropY = 140;
  const cropW = 797 - 242 + 1; // 556
  const cropH = 849 - 140 + 1; // 710

  const emblemBuf = Buffer.alloc(cropW * cropH * 4);

  for (let y = 0; y < cropH; y++) {
    for (let x = 0; x < cropW; x++) {
      const srcX = cropX + x;
      const srcY = cropY + y;
      const srcIdx = (srcY * width + srcX) * channels;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];

      const dstIdx = (y * cropW + x) * 4;
      const dist = Math.sqrt(Math.pow(r - 32, 2) + Math.pow(g - 16, 2) + Math.pow(b - 78, 2));

      if (dist < 15) {
        // Pure background
        emblemBuf[dstIdx] = 0;
        emblemBuf[dstIdx + 1] = 0;
        emblemBuf[dstIdx + 2] = 0;
        emblemBuf[dstIdx + 3] = 0;
      } else if (dist < 35) {
        // Antialiased edge
        const alpha = Math.min(255, Math.max(0, Math.round(((dist - 15) / 20) * 255)));
        emblemBuf[dstIdx] = r;
        emblemBuf[dstIdx + 1] = g;
        emblemBuf[dstIdx + 2] = b;
        emblemBuf[dstIdx + 3] = alpha;
      } else {
        // Full emblem pixel (pure white P and 3D pearl sphere)
        emblemBuf[dstIdx] = r;
        emblemBuf[dstIdx + 1] = g;
        emblemBuf[dstIdx + 2] = b;
        emblemBuf[dstIdx + 3] = 255;
      }
    }
  }

  const croppedEmblemPng = await sharp(emblemBuf, {
    raw: { width: cropW, height: cropH, channels: 4 }
  })
    .png()
    .toBuffer();

  // 1. assets/icon-only.png: 1024x1024 square, no transparency, no rounded corners (76% fill)
  const masterEmblem760 = await sharp(croppedEmblemPng)
    .resize(null, 760, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const iconOnlyBuffer = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: BRAND_BG
    }
  })
    .composite([{ input: masterEmblem760, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(assetsDir, 'icon-only.png'), iconOnlyBuffer);
  console.log('✓ Created assets/icon-only.png (1024x1024, full bleed square, solid white P + pearl)');

  // 2. assets/icon-background.png: 1024x1024 solid brand purple
  const iconBgBuffer = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: BRAND_BG
    }
  })
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(assetsDir, 'icon-background.png'), iconBgBuffer);
  console.log('✓ Created assets/icon-background.png (1024x1024)');

  // 3. assets/icon-foreground.png: 1024x1024 transparent, artwork inside safe zone (650px)
  const fgEmblem650 = await sharp(croppedEmblemPng)
    .resize(null, 650, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const iconForegroundBuffer = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite([{ input: fgEmblem650, gravity: 'center' }])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(assetsDir, 'icon-foreground.png'), iconForegroundBuffer);
  console.log('✓ Created assets/icon-foreground.png (1024x1024, transparent, safe zone 650px)');

  // 4. assets/splash.png & splash-dark.png: 2732x2732
  const splashEmblem960 = await sharp(croppedEmblemPng)
    .resize(null, 960, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  const splashBuffer = await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: BRAND_BG
    }
  })
    .composite([{ input: splashEmblem960, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(assetsDir, 'splash.png'), splashBuffer);

  const splashDarkBuffer = await sharp({
    create: {
      width: 2732,
      height: 2732,
      channels: 4,
      background: { r: 18, g: 9, b: 46, alpha: 1 }
    }
  })
    .composite([{ input: splashEmblem960, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(assetsDir, 'splash-dark.png'), splashDarkBuffer);
  console.log('✓ Created assets/splash.png & splash-dark.png (2732x2732)');

  console.log('\n=== Step 2: Generating Native Assets via @capacitor/assets ===');
  execSync('npx @capacitor/assets generate --android --ios', { stdio: 'inherit', cwd: rootDir });

  console.log('\n=== Step 3: Generating Web & PWA Assets ===');
  // Favicon 16x16: 13px emblem height on solid #20104E with Lanczos3
  const emblem13 = await sharp(croppedEmblemPng)
    .resize(null, 13, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 16, height: 16, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: emblem13, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  // Favicon 32x32: 26px emblem height on solid #20104E
  const emblem26 = await sharp(croppedEmblemPng)
    .resize(null, 26, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 32, height: 32, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: emblem26, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  fs.copyFileSync(path.join(publicDir, 'favicon-32x32.png'), path.join(publicDir, 'favicon.png'));

  // Favicon 48x48 (.ico): 38px emblem height
  const emblem38 = await sharp(croppedEmblemPng)
    .resize(null, 38, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 48, height: 48, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: emblem38, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('✓ Generated crisp favicons (16x16, 32x32, 48x48)');

  // Apple Touch Icon (180x180): 135px emblem height
  const emblem135 = await sharp(croppedEmblemPng)
    .resize(null, 135, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 180, height: 180, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: emblem135, gravity: 'center' }])
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Generated apple-touch-icon.png (180x180)');

  // PWA Standard Icons (192, 512)
  const emblem145 = await sharp(croppedEmblemPng)
    .resize(null, 145, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 192, height: 192, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: emblem145, gravity: 'center' }])
    .png()
    .toFile(path.join(publicIconsDir, 'icon-192.png'));

  const emblem390 = await sharp(croppedEmblemPng)
    .resize(null, 390, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 512, height: 512, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: emblem390, gravity: 'center' }])
    .png()
    .toFile(path.join(publicIconsDir, 'icon-512.png'));

  // PWA Maskable Icons (Artwork inside 65% safe zone: 120px in 192, 320px in 512)
  const maskableEmblem120 = await sharp(croppedEmblemPng)
    .resize(null, 120, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 192, height: 192, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: maskableEmblem120, gravity: 'center' }])
    .png()
    .toFile(path.join(publicIconsDir, 'icon-maskable-192.png'));

  const maskableEmblem320 = await sharp(croppedEmblemPng)
    .resize(null, 320, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 512, height: 512, channels: 4, background: BRAND_BG }
  })
    .composite([{ input: maskableEmblem320, gravity: 'center' }])
    .png()
    .toFile(path.join(publicIconsDir, 'icon-maskable-512.png'));

  console.log('✓ Generated PWA icons (192, 512, maskable 192, maskable 512)');

  // Webmanifest
  const manifestContent = {
    name: "Pearl Port - CSE & Asset Portfolio Tracker",
    short_name: "Pearl Port",
    description: "A modern investment portfolio and asset management companion built specifically for Sri Lankan investors.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#20104E",
    theme_color: "#20104E",
    icons: [
      {
        src: "/icons/icon-192.png?v=3",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-maskable-192.png?v=3",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      },
      {
        src: "/icons/icon-512.png?v=3",
        sizes: "512x512",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/icons/icon-maskable-512.png?v=3",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable"
      }
    ]
  };

  fs.writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(manifestContent, null, 2));
  console.log('✓ Updated public/manifest.webmanifest with ?v=3');

  console.log('\n✅ All master, native, and PWA icon assets generated with 100% fidelity!');
}

run().catch((err) => {
  console.error('Error generating assets:', err);
  process.exit(1);
});

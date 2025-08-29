const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputIcon = 'public/icon.png'; // Your source icon (at least 512x512)
const outputDir = 'public/icons';

if (!fs.existsSync(inputIcon)) {
  console.error(`Source icon not found at ${inputIcon}`);
  console.error('Please provide a 512x512 PNG icon at the root of your project');
  process.exit(1);
}

const sizes = [16, 32, 48, 72, 96, 120, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

Promise.all(
  sizes.map(size => 
    sharp(inputIcon)
      .resize(size, size)
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
      .then(() => console.log(`Generated icon-${size}x${size}.png`))
      .catch(err => console.error(`Error generating icon-${size}x${size}.png:`, err))
  )
).then(() => {
  console.log('All icons generated successfully!');
}).catch(err => {
  console.error('Error generating icons:', err);
});
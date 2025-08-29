const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

// Try to find a source icon (prefer PNG, fallback to SVG conversion)
let inputIcon = null;
let convertFromSvg = false;

// Check for PNG first
if (fs.existsSync('public/icon.png')) {
  inputIcon = 'public/icon.png';
  console.log('Found PNG source icon');
} else if (fs.existsSync('public/icon.svg')) {
  // Convert SVG to PNG first, then generate sizes
  const svgBuffer = readFileSync('public/icon.svg');
  inputIcon = 'public/icon_temp.png';
  convertFromSvg = true;

  console.log('Converting SVG to PNG...');
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(inputIcon);
  console.log('SVG converted to PNG successfully');
} else {
  console.error('No source icon found!');
  console.error('Please provide either:');
  console.error('- public/icon.png (recommended, at least 512x512)');
  console.error('- public/icon.svg');
  process.exit(1);
}

const outputDir = 'public/icons';
const sizes = [16, 32, 48, 72, 96, 120, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Generating PWA icons...');

Promise.all(
  sizes.map(size =>
    sharp(inputIcon)
      .resize(size, size, { withoutEnlargement: false })
      .png({ quality: 90 })
      .toFile(path.join(outputDir, `icon-${size}x${size}.png`))
      .then(() => console.log(`✓ Generated icon-${size}x${size}.png`))
      .catch(err => console.error(`✗ Error generating icon-${size}x${size}.png:`, err))
  )
).then(() => {
  // Clean up temporary file if it was created from SVG
  if (convertFromSvg && fs.existsSync(inputIcon)) {
    fs.unlinkSync(inputIcon);
    console.log('Cleaned up temporary PNG file');
  }

  console.log('\n🎉 All icons generated successfully!');
  console.log(`📁 Icons saved to: ${outputDir}`);
  console.log('📱 PWA icons ready for mobile installation');

  // List generated files
  console.log('\n📋 Generated icon files:');
  sizes.forEach(size => {
    console.log(`   - icon-${size}x${size}.png`);
  });
}).catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
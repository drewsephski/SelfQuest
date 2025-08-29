// This will generate the necessary meta tags for iOS splash screens
const sizes = [
    { width: 640, height: 1136, ratio: 2 },  // iPhone SE, 5s, 5, 5c
    { width: 750, height: 1334, ratio: 2 },  // iPhone 6, 6s, 7, 8, SE (2nd gen)
    { width: 828, height: 1792, ratio: 2 },  // iPhone XR, 11
    { width: 1125, height: 2436, ratio: 3 }, // iPhone X, Xs, 11 Pro
    { width: 1242, height: 2208, ratio: 3 }, // iPhone 8 Plus, 7 Plus, 6s Plus, 6 Plus
    { width: 1242, height: 2688, ratio: 3 }, // iPhone Xs Max, 11 Pro Max
    { width: 1024, height: 1366, ratio: 2 }, // iPad Pro 12.9"
    { width: 834, height: 1112, ratio: 2 },  // iPad Pro 10.5"
    { width: 820, height: 1180, ratio: 2 },  // iPad Air 10.9"
    { width: 810, height: 1080, ratio: 2 },  // iPad 10.2"
    { width: 768, height: 1024, ratio: 2 },  // iPad Mini, Air 9.7"
  ];
  
  const splashScreens = sizes.map(({ width, height, ratio }) => {
    const link = document.createElement('link');
    link.rel = 'apple-touch-startup-image';
    link.media = `(device-width: ${width/ratio}px) and (device-height: ${height/ratio}px) and (-webkit-device-pixel-ratio: ${ratio})`;
    link.href = `/splash-screens/launch-${width}x${height}.png`;
    return link.outerHTML;
  }).join('\n');
  
  document.head.insertAdjacentHTML('beforeend', splashScreens);
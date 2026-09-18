const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const FF = 'C:\\Users\\8\\AppData\\Roaming\\reasonix\\global-workspace\\node_modules\\@ffmpeg-installer\\win32-x64\\ffmpeg.exe';
const videos = ['steel-wire-brush', 'disc-brush', 'disc-brush-buying', 'factorytour01', 'anti-tangle-brush', 'custom-brush', 'factory-tour'];

videos.forEach((v) => {
  const src = path.join('public', 'videos', v + '.mp4');
  if (!fs.existsSync(src)) { console.log('skip (no file):', v); return; }
  const out = path.join('public', 'images', v + '-poster.jpg');
  const cmd = `"${FF}" -y -i "${src}" -ss 0.5 -vframes 1 -vf "scale=640:360:force_original_aspect_ratio=increase,crop=640:360" "${out}"`;
  try {
    execSync(cmd, { stdio: 'pipe' });
    console.log('OK', v, '->', fs.statSync(out).size, 'bytes');
  } catch (e) {
    console.log('FAIL', v, String(e.message).split('\n')[0]);
  }
});

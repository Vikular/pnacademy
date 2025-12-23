const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexPath = path.join(buildDir, 'index.html');
const fallbackPath = path.join(buildDir, '404.html');
const noJekyllPath = path.join(buildDir, '.nojekyll');

function ensureFileExists(p) {
  if (!fs.existsSync(p)) {
    throw new Error(`Required file not found: ${p}`);
  }
}

function copyIndexTo404() {
  ensureFileExists(indexPath);
  fs.copyFileSync(indexPath, fallbackPath);
  console.log('Created 404.html for SPA fallback');
}

function createNoJekyll() {
  fs.writeFileSync(noJekyllPath, '');
  console.log('Created .nojekyll to disable Jekyll processing');
}

function main() {
  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory not found: ${buildDir}`);
  }
  copyIndexTo404();
  createNoJekyll();
}

main();

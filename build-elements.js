const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/switch-wid-app/runtime.js',
    './dist/switch-wid-app/polyfills.js',
    './dist/switch-wid-app/scripts.js',
    './dist/switch-wid-app/main.js'
  ];

  await fs.ensureDir('elements');
  await concat(files, 'elements/swidget.js');
})();
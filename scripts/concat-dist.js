const concat = require('concat');
const path = require('path');

concat([
    path.join(__dirname, '..', 'dist', 'runtime-es5.js'),
    path.join(__dirname, '..', 'dist', 'polyfills-es5.js'),
    path.join(__dirname, '..', 'dist', 'main-es5.js'),
], path.join(__dirname, '..', 'dist', 'bundle.js'));

const concat = require('concat');
const path = require('path');

concat([
    path.join(__dirname, '..', 'dist', 'runtime.js'),
    path.join(__dirname, '..', 'dist', 'polyfills.js'),
    path.join(__dirname, '..', 'dist', 'main.js'),
], path.join(__dirname, '..', 'dist', 'bundle.js'));

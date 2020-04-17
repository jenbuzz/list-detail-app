const concat = require('concat');
const path = require('path');

concat([
    path.join(__dirname, '..', 'dist', 'runtime-es5.js'),
    path.join(__dirname, '..', 'dist', 'polyfills-es5.js'),
    path.join(__dirname, '..', 'dist', 'main-es5.js'),
], path.join(__dirname, '..', 'dist', 'bundle.js'));

concat([
    path.join(__dirname, '..', 'dist', 'runtime-es2015.js'),
    path.join(__dirname, '..', 'dist', 'polyfills-es2015.js'),
    path.join(__dirname, '..', 'dist', 'main-es2015.js'),
], path.join(__dirname, '..', 'dist', 'bundle-es2015.js'));

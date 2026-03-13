'use strict';
const { execSync } = require('child_process');
const path = require('path');

const nmPath = require('node_modules-path')();
const driverPath = path.join(nmPath, '@screeps', 'driver');

execSync('npx webpack', {
    cwd: driverPath,
    env: Object.assign({}, process.env, { NODE_PATH: nmPath }),
    stdio: 'inherit',
});

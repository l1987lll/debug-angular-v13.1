#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packagePath = path.resolve('./package.json');
const { sourcemapOverrides } = JSON.parse(fs.readFileSync(packagePath));

var command = sourcemapOverrides.map(function (override) {
    return `sorcery -x -i "${override.file}" -o "${override.output}" --osp "${override.sources.join(' , ')}" --orp "${override.sourceRoot.join(' , ')}"`;
}).join(' && ');

try {
    execSync(command);
} catch (error) {
    throw new Error(`Status Code: ${error.status} with '${error.message}'`);
}

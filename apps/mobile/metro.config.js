const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Force Metro to resolve modules only from the local node_modules directory
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

// Restrict Metro file watching to the local folder to avoid hoisting interference
config.watchFolders = [__dirname];

module.exports = config;

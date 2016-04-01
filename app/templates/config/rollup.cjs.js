import config from './rollup';

config.format = 'cjs';
config.dest = 'dist/<%= moduleName %>.cjs.js';

export default config;

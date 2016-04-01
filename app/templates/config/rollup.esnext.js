import config from './rollup';

config.format = 'es6';
config.dest = 'dist/<%= moduleName %>.js';

export default config;

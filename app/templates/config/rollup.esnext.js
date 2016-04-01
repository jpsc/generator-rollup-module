import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'lib/index.js',
	plugins: [nodeResolve({jsnext: true})],
	format: 'es6',
	dest: 'dist/<%= moduleName %>.js'
};

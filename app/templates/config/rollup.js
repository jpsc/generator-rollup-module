import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
	entry: 'lib/index.js',
	plugins: [babel(), nodeResolve({jsnext: true})]
};

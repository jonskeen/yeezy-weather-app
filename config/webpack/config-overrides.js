const modules = require('./modules')
const { postCssPlugins, babelifyScripts, babelifyScriptsExcludeRuntime } = require('./rules');

module.exports = function override (config, env) {
	const postcss = {
		test: /\.css$/,
		exclude: [
			/\.(min|global).css$/,
			/node_modules\/.*/,
		],
		use: [
			require.resolve('style-loader'),
			{
				loader: require.resolve('css-loader'),
				options: {
					importLoaders: 1,
					modules: {
						localIdentName: '[path][name]___[local]',
					},
				},
			},
			{
				loader: require.resolve('postcss-loader'),
				options: {
					// Necessary for external CSS imports to work
					// https://github.com/facebookincubator/create-react-app/issues/2677
					ident: 'postcss',
					plugins: () => postCssPlugins,
				},
			},
		],
	};

	const globalCssLoader = {
		test: [
			/node_modules\/.*\/dist\/.*.css/,
			/\.(min|global).css$/
		],
		use: [
			{
				loader: 'style-loader',
				options: { injectType: "linkTag" }
			},
			{
				loader: 'file-loader',
				options: { outputPath: 'static/css' }
			}
		]
	};


	config.resolve.modules = modules;

	const rules = config.module.rules[1];

	/* quick and dirty loader-replacement */
	rules.oneOf.splice(2, 6, babelifyScripts, babelifyScriptsExcludeRuntime, postcss, globalCssLoader);
	config.module.rules[1] = rules;

	return config;
};
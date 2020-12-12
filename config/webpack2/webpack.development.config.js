const reactAppRewirePostcss = require('react-app-rewire-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const modules = require('./modules')
const { postCssPlugins } = require('./rules');
const { printObject } = require('./utils');

module.exports = function override(config, env) {

	config.resolve.modules = modules;

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

	const rules = config.module.rules[1].oneOf.splice(4, 1, postcss, globalCssLoader);

	// printObject(rules.oneOf[4]);return;
	// printObject(postCssPlugins);return;

	// rules.oneOf.splice(4, 1, postcss, globalCssLoader);

	/*
	config.module.rules = [
		{parser: {requireEnsure: false}},
		rules.eslint,
		{
			// "oneOf" will traverse all following loaders until one will
			// match the requirements. When no loader matches it will fall
			// back to the "file" loader at the end of the loader list.
			oneOf: [
				// rules.staticImages,
				// rules.babelifyScripts,
				// rules.babelifyScriptsExcludeRuntime,
				// rules.componentifySvgs,
				postcss,
				// rules.globalCss,
				// rules.fileLoaderRawJs,
				// rules.fileLoaderCatchall,
			],
		},
		// ** STOP ** Are you adding a new loader?
		// Make sure to add the new loader(s) before the "file" loader.
	];
	 */

	return config;
};

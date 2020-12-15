const { resolveApp } = require('./utils');

const postCssPlugins = [
	require('postcss-import'),
	require('postcss-nested'),
	require('postcss-custom-media')({
		importFrom: './src/globals/css/variables/media-queries.css'
	}),
	require('postcss-flexbugs-fixes'),
	require('postcss-preset-env')({
		importFrom: [],
		autoprefixer: {
			grid: true,
			flexbox: 'no-2009',
		},
		stage: 0,
	}),
];

const postCss = {
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

const babelifyScripts = {
	test: /\.(js|mjs|jsx|ts|tsx)$/,
	include: [
		resolveApp("src"),
		/* if any node modules need to run through babel, add them here */
	],
	exclude: [/^.*\.raw\.js$/],
	loader: require.resolve('babel-loader'),
	options: {
		customize: require.resolve('babel-preset-react-app/webpack-overrides.js'),
		babelrc: false,
		configFile: false,
		presets: [require.resolve('babel-preset-react-app')],
		plugins: [
			require.resolve("@babel/plugin-proposal-optional-chaining"),
			require.resolve("@babel/plugin-transform-arrow-functions"),
		],
		cacheDirectory: true,
		cacheCompression: false,
		compact: false
	}
};

const babelifyScriptsExcludeRuntime = {
	test: /\.(js|jsx|mjs)$/,
	exclude: [/@babel(?:\/|\\{1,2})runtime/, /^.*\.raw\.js$/],
	loader: require.resolve('babel-loader'),
	options:
		{
			babelrc: false,
			configFile: false,
			compact: false,
			presets: [
				[
					require.resolve("babel-preset-react-app/dependencies.js"),
					{ helpers: true }
				]
			],
			cacheCompression: false,
			sourceMaps: true,
			inputSourceMap: true,
			cacheDirectory: true,
		}
};

module.exports = {
	postCssPlugins,
	babelifyScripts,
	babelifyScriptsExcludeRuntime,
	postCss,
	globalCssLoader
};
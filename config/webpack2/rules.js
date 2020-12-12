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

module.exports = {
	postCssPlugins,
};
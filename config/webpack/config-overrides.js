const modules = require('./modules')
const {
	babelifyScripts,
	babelifyScriptsExcludeRuntime,
	globalCssLoader,
	postCss
} = require('./rules');

module.exports = function override (config, env) {
	config.resolve.modules = modules;

	/* quick and dirty loader-replacement */
	config.module.rules[1].oneOf.splice(2, 6, babelifyScripts, babelifyScriptsExcludeRuntime, postCss, globalCssLoader);

	return config;
};
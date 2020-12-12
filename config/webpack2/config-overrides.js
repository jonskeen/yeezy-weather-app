/* config-overrides.js */
// const productionOverride = require("./webpack.production.config");
const developmentOverride = require("./webpack.development.config");

process.env.REACT_APP_BUILD_TIME = new Date().toISOString();

module.exports = function override (config, env) {
	switch (env) {
		case "development":
		default:
			return developmentOverride(config, env);
		// case "production":
		// default:
		// 	return productionOverride(config, env);
	}
};
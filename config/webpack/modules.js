const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = [
	resolveAppPath("src"),
	resolveAppPath('node_modules')
];
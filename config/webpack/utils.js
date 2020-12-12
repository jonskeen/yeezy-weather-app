const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const paths = {
  appSrc: resolveApp("src"),
};

module.exports = {
  resolveApp,
  paths
};

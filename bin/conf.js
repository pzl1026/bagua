const path = require('path');
const { merge } = require('webpack-merge');
const CWD = process.cwd();
const confEnv = (global.confEnv = require(path.join(
  CWD,
  `conf/env/${global.confFile || 'dev'}.js`
)));
const confCommon = require(path.join(CWD, 'conf/conf.js'));
module.exports = merge(confEnv, confCommon);

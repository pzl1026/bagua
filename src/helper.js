const path = require('path');
const chalk = require('chalk');
const emoji = require('node-emoji');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const noWpConfig = [
  'name',
  'isTop',
  'autoOpen',
  'domains',
  'nomocker',
  'port',
  'packageScope',
  'model',
  'dev',
  'prod',
  'remotes',
  'exposes',
  'shared',
  'library',
  'filename',
  'staticDir',
  'serverDir',
  'viewDir',
  'analyzerOpen',
];

function resolve(dir) {
  return path.join(process.cwd(), dir || '');
}

function getPublicPathAndBase(outPublicPath) {
  let publicPath = '/static',
    basePath = 'static';
  try {
    publicPath = outPublicPath;
  } catch (e) {}
  publicPath.replace(
    /((?:(?:https|http?:)?\/\/[\w-]+(?:\.\w+)+)?\/?)?(.*)/,
    function (all, domain, base) {
      publicPath = domain || '';
      basePath = base;
    }
  );

  return {
    publicPath,
    basePath,
  };
}

function getConfig(
  baguaObj,
  env = 'dev',
  domainEnv = 'default',
  isWebpackConfig
) {
  let o = {};

  for (let i in baguaObj) {
    if (
      (isWebpackConfig ? !noWpConfig.includes(i) : noWpConfig.includes(i)) &&
      !['dev', 'prod'].includes(i)
    ) {
      o[i] = baguaObj[i];
    }
  }

  if (!baguaObj[env]) {
    if (baguaObj.name) {
      const emojified = emoji.emojify(':grin:', (name) => name);
      console.warn(emojified + chalk.yellow('你还未设置dev或prod的配置'));
    }
    return o;
  }

  //  判断是否选用了环境，没有将默认使用default配置，否则将default配置与环境配置相结合
  let domainEnvConfig =
    domainEnv != 'default'
      ? Object.assign({}, baguaObj[env]['default'], baguaObj[env][domainEnv])
      : baguaObj[env]['default'];

  for (let i in domainEnvConfig) {
    if (isWebpackConfig ? !noWpConfig.includes(i) : noWpConfig.includes(i)) {
      o[i] = domainEnvConfig[i];
    }
  }

  return o;
}

// 从.bagua.js获取原始的webpack配置
function getWpConfig(baguaObj, env, domainEnv) {
  return getConfig(baguaObj, env, domainEnv, true);
}

// 从.bagua.js获取自定义配置
function getCustomConfig(baguaObj, env, domainEnv) {
  return getConfig(baguaObj, env, domainEnv, false);
}

// 显示进度
const progress = (percentage, message, ...args) => {
  // e.g. Output each progress message directly to the console:
  console.info(percentage, message, ...args);
};

// 获取所有的models
function getModels() {
  const models = fs.readdirSync('./').filter((f) => {
    return (
      fs.statSync(f).isDirectory() &&
      f != 'node_modules' &&
      f != '.git' &&
      f != 'output'
    );
  });
  models.push('./');
  return models;
}

// 生成一个随机版本号
function randomVersion() {
  return uuidv4();
}

module.exports = {
  getPublicPathAndBase,
  resolve,
  progress,
  getWpConfig,
  getCustomConfig,
  getModels,
  randomVersion,
};

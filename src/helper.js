const path = require('path');
const noWpConfig = [
  'name',
  'isTop',
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

  if (!baguaObj[env]) return o;
  let domainEnvConfig = baguaObj[env][domainEnv];
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

module.exports = {
  getPublicPathAndBase,
  resolve,
  progress,
  getWpConfig,
  getCustomConfig,
};

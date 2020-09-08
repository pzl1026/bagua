const path = require('path');
const CWD = process.cwd();
const noWpConfig = ['name', 'isTop', 'domains', 'nomocker', 'port'];

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
    function(all, domain, base) {
      publicPath = domain || '';
      basePath = base;
    }
  );

  return {
    publicPath,
    basePath,
  };
}

// 从.bagua.js获取原始的webpack配置
function getWpConfig(baguaObj) {
  let o = {};
  for (let i in baguaObj) {
    if (!noWpConfig.includes(i)) {
      o[i] = baguaObj[i];
    }
  }
  return o;
}

// 从.bagua.js获取自定义配置
function getCustomConfig(baguaObj) {
  let o = {};
  for (let i in baguaObj) {
    if (noWpConfig.includes(i)) {
      o[i] = baguaObj[i];
    }
  }
  return o;
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

const chalk = require('chalk');
const emoji = require('node-emoji');

if (program.devConf === true || program.buildConf === true) {
  const emojified = emoji.emojify(':grin:', (name) => name);
  console.warn(
    emojified +
      chalk.yellow(
        '你还没有制定当前编译环境（如st1，st2等）,将默认使用default配置'
      )
  );
}

domainEnv = program.devConf || program.buildConf || 'default';

function getConfig(env) {
  let bgWpConfig = helper.getWpConfig(
    baguaObj,
    env,
    domainEnv === true ? 'default' : domainEnv
  );
  let bgCustomConfig = helper.getCustomConfig(
    baguaObj,
    env,
    domainEnv === true ? 'default' : domainEnv
  );

  return [bgWpConfig, bgCustomConfig];
}

if (program.devConf) {
  isDev = true;
  [bgWpConfig, bgCustomConfig] = getConfig('dev');
  require('../src/server');
}

if (program.buildConf) {
  isDev = false;
  [bgWpConfig, bgCustomConfig] = getConfig('prod');
  require('../src/build');
}

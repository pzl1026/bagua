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

const webpack = require('webpack');
const chalk = require('chalk');
const po = program.opts();
const ora = require('ora');
domainEnv = program.devConf || program.buildConf || 'default';

if (program.devConf) {
  // global.confFile = po.devConf;
  isDev = true;
  bgWpConfig = helper.getWpConfig(
    baguaObj,
    'dev',
    domainEnv === true ? 'default' : domainEnv
  );
  bgCustomConfig = helper.getCustomConfig(
    baguaObj,
    'dev',
    domainEnv === true ? 'default' : domainEnv
  );
  require('../src/server');
}

if (program.buildConf) {
  isDev = false;
  bgWpConfig = helper.getWpConfig(
    baguaObj,
    'prod',
    domainEnv === 'true' ? 'default' : domainEnv
  );
  bgCustomConfig = helper.getCustomConfig(
    baguaObj,
    'prod',
    domainEnv === 'true' ? 'default' : domainEnv
  );

  global.confFile = po.buildConf;
  const configs = require('../src/webpack.config');
  const spinner = ora('building for production...');
  spinner.start();
  const compiler = webpack(configs, (err, stats) => {
    spinner.stop();
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      process.exit(1);
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
      process.exit(1);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
      process.exit(1);
    }
    process.stdout.write(
      stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
      }) + '\n\n'
    );
    console.log(chalk.cyan('Build complete.\n'));
  });
}
// console.log(program.create, 'program.create')
if (program.createProjectName) {
  global.projectName = program.projectName || 'myproject';
  require('../src/repo');
}

#!/usr/bin/env node

const pa = process.argv;
const argv = pa[pa.length - 1];
const { spawn, fork } = require('child_process');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const CWD = process.cwd();
const program = require('./program');
const po = program.opts();
const ora = require('ora');
// global.smp = null;
const helper = require('../helper');
const baguaObj = require(helper.resolve('.bagua.js'));
bgWpConfig = helper.getWpConfig(baguaObj);
bgCustomConfig = helper.getCustomConfig(baguaObj);

global.analyzer = program.analyzer;

// if (program.speed) {
//   const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
//   global.smp = new SpeedMeasurePlugin();
// }
if (program.devConf) {
  // global.confFile = po.devConf;
  require('../server');
}

if (program.buildConf) {
  global.confFile = po.buildConf;
  const configs = require('../webpack.config');
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
  require('../repo');
}

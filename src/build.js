const webpack = require('webpack');
const chalk = require('chalk');
const po = program.opts();
const ora = require('ora');

const configs = require('./webpack.config');
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

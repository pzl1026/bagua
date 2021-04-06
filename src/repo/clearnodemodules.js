const helper = require('../helper');
const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');

function clearAllNodeModules() {
  const models = helper.getModels();
  let delCount = 0;
  let spinner = ora(chalk.yellow()).start();

  spinner.color = 'yellow';
  spinner.text = chalk.green('正在删除所有的node_modules...');
  for (let m of models) {
    fs.remove(helper.resolve(m + '/node_modules'), (err) => {
      if (err) return console.error(err);
      console.log(
        chalk.yellow(`${m == './' ? '当前目录' : m}的node_modules已删除`)
      );
      delCount++;
      if (delCount == models.length) {
        spinner.text = chalk.green('删除成功');
        spinner.succeed();
        spinner.stop();
        process.exit();
      }
    });
  }
}

clearAllNodeModules();

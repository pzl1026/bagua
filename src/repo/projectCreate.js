const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const helper = require('../helper');
const fs = require('fs');
let [type, value] = program.args;

// 创建项目
function createProject() {
  const tempDir = 'github:pzl1026/bagua-template#master';
  const spinner = ora(chalk.yellow('Create start')).start();

  spinner.color = 'yellow';
  spinner.text = '开始创建项目...';

  download(tempDir, './', function(err) {
    if (err) {
      throw err;
      process.exit();
      return;
    }
    fs.rename(helper.resolve('packages'), helper.resolve(value), (err) => {
      if (err) {
        throw err;
        return;
      }

      spinner.text = chalk.blue('项目目录创建成功！！');
      spinner.succeed();
      spinner.stop();
      spinner.clear();
      process.exit();
    });
  });
}

createProject();

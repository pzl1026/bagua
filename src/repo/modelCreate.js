const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const helper = require('../helper');
const fs = require('fs');
const inquirer = require('inquirer');
const promptList = require('./promptList.config');
const configChange = require('./configChange');
const install = require('./install');
let [type, value] = program.args;
const pName = 'mqj';

inquirer.prompt(promptList.frames).then((answers) => {
  let frame = answers.frame;
  createProject(answers.frame);
});

// 创建项目
function createProject(frame) {
  // const tempDir = `github:pzl1026/bagua-template#${frame}`;
  const tempDir = `github:pzl1026/mqj-template#${frame}`;
  const spinner = ora(chalk.yellow('Create start')).start();

  spinner.color = 'yellow';
  spinner.text = chalk.yellow('开始创建项目模块...');

  download(tempDir, './', function(err) {
    if (err) {
      throw err;
      process.exit();
      return;
    }
    let currentDir = helper.resolve(value);
    let projectDirName = helper
      .resolve()
      .split('/')
      .pop();

    fs.rename(helper.resolve(frame), currentDir, async (err) => {
      if (err) {
        throw err;
        return;
      }

      spinner.text = chalk.blue('模块目录创建完成！！');

      await configChange.handleConfig(
        currentDir + '/.bagua.js',
        /(?<=name:\s)(.*)/,
        `'${value}',`
      );

      spinner.text = chalk.blue('项目目录创建成功！！');
      await configChange.handleConfig(
        currentDir + '/package.json',
        /(?<=\"name\":\s)(.*)/,
        `"@${pName || projectDirName}/${value}",`
      );

      spinner.text = chalk.blue(`正在安装${value}的modules...`);
      let end = await install(value);
      if (end) {
        spinner.succeed();
        spinner.stop();
        spinner.clear();
        process.exit();
      }
    });
  });
}

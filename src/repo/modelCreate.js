const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const helper = require('../helper');
const fs = require('fs');
const inquirer = require('inquirer');
const { install } = require('./install');
const emoji = require('node-emoji');
const promptList = require('./promptList.config');
const configChange = require('./configChange');
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
  const spinner = ora(chalk.yellow('开始创建项目模块...')).start();

  spinner.color = 'yellow';
  spinner._spinner = require('./spinner.config');
  spinner.succeed();

  download(tempDir, './', function (err) {
    if (err) {
      throw err;
      process.exit();
      return;
    }
    let currentDir = helper.resolve(value);
    let projectDirName = helper.resolve().split('/').pop();

    fs.rename(helper.resolve(frame), currentDir, async (err) => {
      if (err) {
        throw err;
        return;
      }

      await configChange.handleConfig(
        currentDir + '/.bagua.js',
        /(?<=name:\s)(.*)/,
        `'${value}',`
      );

      await configChange.handleConfig(
        currentDir + '/package.json',
        /(?<=\"name\":\s)(.*)/,
        `"@${pName || projectDirName}/${value}",`
      );

      console.log(
        emoji.get(':palm_tree:') +
          chalk.yellow(`开始安装${value}的node_modules...`)
      );
      let end = await install(helper.resolve(value));
      if (end) {
        console.log(
          emoji.get(':palm_tree:') +
            chalk.yellow('模块创建完成，可能需要修改.bagua.js的port端口')
        );
        spinner.stop();
        spinner.clear();
        process.exit();
      }
    });
  });
}

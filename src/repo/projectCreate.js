const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const helper = require('../helper');
const fs = require('fs');
const configChange = require('./configChange');
const install = require('./install');
const installAll = require('./installAll');
const { exit } = require('process');
let [type, value] = program.args;

// 创建项目
function createProject() {
  const tempDir = 'github:pzl1026/bagua-template#master';
  const spinner = ora(chalk.yellow('Create start')).start();

  spinner.color = 'yellow';
  spinner.text = chalk.blue('开始创建项目...');

  download(tempDir, './', function(err) {
    if (err) {
      throw err;
      process.exit();
      return;
    }
    let currentDir = helper.resolve(value);
    // 重命名
    fs.rename(helper.resolve('packages'), currentDir, async (err) => {
      if (err) {
        throw err;
        process.exit();
        return;
      }
      spinner.text = chalk.blue('模块目录创建完成！！');

      try {
        // 修改.bagua.js的packageScope
        await configChange.handleConfig(
          currentDir + '/.bagua.js',
          /(?<=packageScope:\s)(.*)/,
          `'@${value}',`
        );

        spinner.text = chalk.blue('项目目录创建成功！！');
        // 修改package.json的name
        await configChange.handleConfig(
          currentDir + '/package.json',
          /(?<=\"name\":\s)(.*)/,
          `"${value}",`
        );

        let files = fs.readdirSync(currentDir);
        files.forEach((item) => {
          let fPath = currentDir + '/' + item;
          let stat = fs.statSync(fPath);
          if (stat.isDirectory() === true) {
            configChange.handleConfig(
              fPath + '/package.json',
              /(?<=\"name\":\s)(.*)/,
              `"@${value}/${item}",`
            );
          }
        });

        spinner.text = chalk.blue(`正在安装${value}的modules...`);
        let end = await install(value);
        let end2 = await installAll(value);
        if (end && end2) {
          spinner.text = chalk.blue('项目创建成功！！');
          spinner.succeed();
          spinner.stop();
          spinner.clear();
          process.exit();
        }
      } catch (err) {
        throw err;
        exit();
      }
    });
  });
}

createProject();

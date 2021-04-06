const download = require('download-git-repo');
const pathResolve = (name) => require('path').resolve(name);
const chalk = require('chalk');
const ora = require('ora');
const helper = require('../helper');
const { installAll } = require('./install');
const fs = require('fs');
const execa = require('execa');
const emoji = require('node-emoji');
const configChange = require('./configChange');
const { exit } = require('process');
let [type, value] = program.args;
const pName = value || 'mqj';

// 创建项目
function createProject() {
  // const tempDir = 'github:pzl1026/bagua-template#master';
  const tempDir = `github:pzl1026/mqj-template#main-vue3`;
  let spinner = ora(chalk.yellow()).start();

  spinner._spinner = require('./spinner.config');
  spinner.color = 'yellow';
  spinner.text = chalk.green('开始创建项目...');

  download(tempDir, './', async function (err) {
    if (err) {
      throw err;
      process.exit();
      return;
    }
    let currentDir = helper.resolve(value);

    async function doProject() {
      spinner.text = chalk.green('项目创建完成！！');
      spinner.succeed();
      try {
        // 修改.bagua.js的packageScope
        await configChange.handleConfig(
          currentDir + '/.bagua.js',
          /(?<=packageScope:\s)(.*)/,
          `'@${pName}',`
        );

        spinner.text = chalk.green('模块创建完成！！');
        spinner.succeed();
        // 修改package.json的name
        await configChange.handleConfig(
          currentDir + '/package.json',
          /(?<=\"name\":\s)(.*)/,
          `"${pName}",`
        );

        let files = fs.readdirSync(currentDir);
        files.forEach((item) => {
          if (item == '.git') return;
          let fPath = currentDir + '/' + item;
          let stat = fs.statSync(fPath);
          if (stat.isDirectory() === true) {
            configChange.handleConfig(
              fPath + '/package.json',
              /(?<=\"name\":\s)(.*)/,
              `"@${pName}/${item}",`
            );
          }
        });

        let installSuccess = await installAll();
        if (installSuccess) {
          spinner = ora(chalk.yellow()).start();
          spinner.text = chalk.green('项目创建成功！');
          spinner.stop();
          spinner.clear();
          process.exit();
        }
      } catch (err) {
        throw err;
        exit();
      }
    }

    if (value) {
      // 重命名
      // fs.rename(helper.resolve(pName), currentDir, async (err) => {
      //   if (err) {
      //     throw err;
      //     process.exit();
      //     return;
      //   }
      //   doProject();
      // });
    } else {
      doProject();
    }
  });
}

createProject();

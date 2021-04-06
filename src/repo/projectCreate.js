const download = require('download-git-repo');
const pathResolve = (name) => require('path').resolve(name);
const chalk = require('chalk');
const ora = require('ora');
const helper = require('../helper');
const fs = require('fs');
const execa = require('execa');
const emoji = require('node-emoji');
const configChange = require('./configChange');
// const install = require('./install');
// const installAll = require('./installAll');
const { exit } = require('process');
let [type, value] = program.args;
const pName = value || 'mqj';

function getModels() {
  const models = fs.readdirSync('./').filter((f) => {
    return fs.statSync(f).isDirectory() && f != 'node_modules';
  });
  models.push('./');
  return models;
}

// 安装所有模块的modules
async function installAll() {
  return new Promise(async (resolve, reject) => {
    const models = getModels();
    let successCount = 0;
    for (let m of models) {
      console.log(
        emoji.get(':palm_tree:') + chalk.yellow(`正在安装${m}的node_modules...`)
      );
      let res = await helper.install(pathResolve(m));
      if (res.success) {
        successCount++;
        console.log(emoji.get(':smile:') + chalk.green(res.desc));
        if (successCount == models.length) {
          console.log(
            emoji.get(':smile:') + chalk.green('所有node_modules安装成功')
          );
          resolve(true);
        }
      } else {
        console.log(emoji.get(':smile:') + chalk.green(res.desc));
        resolve(false);
        break;
        process.exit();
      }
    }
  });
}

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

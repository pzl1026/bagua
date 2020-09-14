const { spawn } = require('child_process');
const { type } = require('os');
const fs = require('fs');
const helper = require('../helper');
const chalk = require('chalk');
const ora = require('ora');
let [type2, value] = program.args;

function installChild(fPath, item, models) {
  return new Promise((resolve, reject) => {
    let spinner = ora(chalk.blue()).start();
    spinner.color = 'yellow';
    spinner.text = chalk.blue(`正在安装${models.join('、')}的modules...`);
    const subprocess = spawn(`npm`, ['install'], {
      cwd: fPath,
    });

    subprocess.stdout.on('data', (data) => {
      console.log(chalk.greenBright(data.toString()));
    });
    subprocess.on('close', (code) => {
      if (code !== 0) {
        console.log('\n' + `${item}的modules安装进程退出，退出码 ${code}`);
        reject(false);
        return;
      }

      resolve(true);
      spinner.text = chalk.blue(`已完成${item}的modules的安装！！`);
      spinner.succeed();
      subprocess.stdin.end();
    });
  });
}

function installAll(name) {
  let projectDir = helper.resolve(name);
  let files = fs.readdirSync(projectDir);
  let allInstalls = [];
  let needInstalls = files.filter((item) => {
    let fPath = projectDir + '/' + item;
    let stat = fs.statSync(fPath);
    return stat.isDirectory() === true && fPath.indexOf('node_modules') == -1;
  });
  needInstalls.forEach((item) => {
    let fPath = projectDir + '/' + item;
    allInstalls.push(installChild(fPath, item, needInstalls));
  });
  return Promise.all(allInstalls);
}

module.exports = installAll;

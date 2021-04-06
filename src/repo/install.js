const execa = require('execa');
const chalk = require('chalk');
const emoji = require('node-emoji');
const helper = require('../helper');
const pathResolve = (name) => require('path').resolve(name);

// 安装mode_modules
async function install(path) {
  return new Promise(async (resolve, reject) => {
    const { stdout } = await execa('npm', ['install'], {
      stdio: 'inherit',
      cwd: path,
    });

    if (!stdout) {
      resolve({
        path,
        desc: `${path} 的node_modules安装完成。`,
        success: true,
      });
    } else {
      reject({
        path,
        desc: `${path} 的node_modules安装失败。`,
        success: false,
      });
      throw new Error(stdout);
    }
  });
}

// 安装所有模块的modules
async function installAll() {
  return new Promise(async (resolve, reject) => {
    const models = helper.getModels();
    let successCount = 0;
    for (let m of models) {
      console.log(
        emoji.get(':palm_tree:') + chalk.yellow(`正在安装${m}的node_modules...`)
      );
      let res = await install(pathResolve(m));
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

module.exports = {
  install,
  installAll,
};

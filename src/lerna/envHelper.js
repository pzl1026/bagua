const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const { randomVersion } = require('../helper');
const version = randomVersion();

// const PORT = 3000;

// function getEnvPort() {
//   const portfinder = require('portfinder');
//   portfinder.basePort = PORT;
//   portfinder.getPort((err, port) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve((process.env.PORT = port));
//     }
//   });
// }

function getModels() {
  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), function (err, files) {
      let dirs = [];
      files.forEach((file) => {
        if (fs.statSync(process.cwd() + '/' + file).isDirectory()) {
          dirs.push(file);
        }
      });
      const filterDirs = ['.git', '.vscode', 'node_modules', 'output'];

      dirs = dirs.filter((d) => !filterDirs.includes(d));
      resolve(dirs);
    });
  });
}

// 获取env配置
function getEnvConfig(dir) {
  const conf = require('dotenv').config({
    path: path.resolve(process.cwd(), `./${dir}/.env`),
  });
  return conf.parsed;
}

// 修改config配置
function changeConfig(conf) {
  return config2EnvStr(Object.assign({}, conf, { version }));
}

// config转为envStr
function config2EnvStr(conf) {
  let envArgs = [];
  for (let [k, v] of Object.entries(conf)) {
    envArgs.push(`${k}=${v}`);
  }
  const envStr = envArgs.join('\n');
  return envStr;
}

function updateEnv() {
  return new Promise(async (resolve, reject) => {
    const moduleNames = await getModels();
    for (let i = 0; i < moduleNames.length; i++) {
      let dir = moduleNames[i];
      const conf = changeConfig(getEnvConfig());

      fs.writeFile(
        path.resolve(process.cwd(), `./${dir}/.env`),
        conf,
        (err) => {
          if (err) {
            throw err;
            exit();
            return;
          }
          if (i == moduleNames.length - 1) {
            resolve();
          }
        }
      );
    }
  });
}

module.exports = {
  getEnvConfig,
  changeConfig,
  config2EnvStr,
  updateEnv,
};

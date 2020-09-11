const { spawn } = require('child_process');
const { type } = require('os');
const fs = require('fs');
const helper = require('../helper');
let [type2, value] = program.args;

function installAll(name) {
  return new Promise((resolve, reject) => {
    let dir = helper.resolve(name);
    let files = fs.readdirSync(dir);

    files.forEach((item) => {
      let fPath = dir + '/' + item;
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        const subprocess = spawn(`npm`, ['install'], {
          cwd: fPath,
        });

        subprocess.stdout.on('data', (data) => {
          console.log(data.toString());
        });
        subprocess.on('close', (code) => {
          if (code !== 0) {
            console.log(`lerna add进程退出，退出码 ${code}`);
          }

          resolve(true);
          subprocess.stdin.end();
        });
      }
    });
  });
}

module.exports = installAll;

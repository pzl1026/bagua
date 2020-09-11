const { spawn } = require('child_process');
const { type } = require('os');
const helper = require('../helper');
let [type2, value] = program.args;

function install(name) {
  let dir = helper.resolve(name);
  return new Promise((resolve, reject) => {
    let dir = helper.resolve(name);

    const subprocess = spawn(`npm`, ['install'], {
      // stdio: 'inherit',
      cwd: dir,
    });
    subprocess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    subprocess.on('close', (code) => {
      if (code !== 0) {
        console.log(`ps 进程退出，退出码 ${code}`);
      }

      resolve(true);
      subprocess.stdin.end();
    });
  });
}

module.exports = install;

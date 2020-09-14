const { spawn } = require('child_process');
const { type } = require('os');
const chalk = require('chalk');
const helper = require('../helper');
let [type2, value] = program.args;

function install(name) {
  return new Promise((resolve, reject) => {
    let dir = helper.resolve(name);

    const subprocess = spawn(
      `npm${type == 'Windows_NT' ? '.cmd' : ''}`,
      ['install'],
      {
        cwd: dir,
      }
    );
    subprocess.stdout.on('data', (data) => {
      console.log(chalk.yellow(data.toString()));
    });
    subprocess.on('close', (code) => {
      if (code !== 0) {
        console.log(`\n npm install进程退出，退出码 ${code}`);
      }

      resolve(true);
      subprocess.stdin.end();
    });
  });
}

module.exports = install;

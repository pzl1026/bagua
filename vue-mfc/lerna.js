const fs = require('fs');
console.log('启动API自动生成命令成功...2');
const { spawn } = require('child_process');
const { type } = require('os');
fs.readdir(
  './',
  {
    recursive: true,
  },
  (event, filename) => {
    const packageScope = bgCustomConfig.packageScope || 'package';
    const model = bgCustomConfig.model || '*';
    let action;
    if (program.lernastart) {
      action = 'start';
    } else {
      action = 'build';
    }

    const subprocess = spawn('lerna', [
      'run',
      '--scope',
      `${packageScope}/${model}`,
      '--parallel',
      action,
    ]);

    subprocess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
  }
);

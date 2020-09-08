const fs = require('fs');
const { spawn } = require('child_process');
const { type } = require('os');
const helper = require('./helper');

fs.readdir(
  helper.resolve(),
  {
    recursive: true,
  },
  (event, filename) => {
    const packageScope = bgCustomConfig.packageScope || 'package';
    const model = bgCustomConfig.model || '*';
    let action;

    if (program.lernaStart) {
      action = 'start';
      console.log('正在启动项目...');
    } else {
      action = 'build';
      console.log('正在编译生产项目...');
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

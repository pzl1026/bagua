const fs = require('fs');
const { spawn } = require('child_process');
const { type } = require('os');
const helper = require('../helper');

fs.readdir(
  helper.resolve(),
  {
    recursive: true,
  },
  (event, filename) => {
    const packageScope = bgCustomConfig.packageScope || 'package';
    const model = bgCustomConfig.model || '*';

    if (program.lernaInstall) {
      console.log('正在安装各个包模块...');
      console.log(`lerna${type == 'Windows_NT' ? '.cmd' : ''}`);
      const subprocess = spawn(`lerna${type == 'Windows_NT' ? '.cmd' : ''}`, [
        'run',
        '--scope',
        `${packageScope}/${model}`,
        '--parallel',
        'add',
      ]);

      subprocess.stdout.on('data', (data) => {
        console.log(data.toString());
      });
    }
  }
);

const { spawn } = require('child_process');
const { type } = require('os');
const helper = require('../helper');

const packageScope = bgCustomConfig.packageScope || 'package';
const model = bgCustomConfig.model || '*';

if (program.lernaInstall) {
  console.log('正在安装各个包的modules...');
  const subprocess = spawn(
    `lerna${type == 'Windows_NT' ? '.cmd' : ''}`,
    ['run', '--scope', `${packageScope}/${model}`, '--parallel', 'add'],
    {
      // stdio: 'inherit',
      cwd: helper.resolve(),
    }
  );

  subprocess.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}

const { spawn } = require('child_process');
const { type } = require('os');
const chalk = require('chalk');
const helper = require('../helper');

const packageScope = bgCustomConfig.packageScope || 'package';
const model = bgCustomConfig.model || '*';
let action;

if (program.lernaStart) {
  action = program.lernaStart;
  console.log(action, 'action');
  chalk.yellow('正在启动项目...');
} else if (program.lernaBuildProduction) {
  action = program.lernaBuildProduction;
  chalk.yellow('正在编译生产项目...');
}

const subprocess = spawn(
  `lerna${type == 'Windows_NT' ? '.cmd' : ''}`,
  ['run', '--scope', `${packageScope}/${model}`, '--parallel', action],
  {
    cwd: helper.resolve(),
  }
);

subprocess.stdout.on('data', (data) => {
  console.log(data.toString());
});

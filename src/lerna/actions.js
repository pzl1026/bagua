const { spawn } = require('child_process');
const { type } = require('os');
const chalk = require('chalk');
const helper = require('../helper');
const { updateEnv } = require('./envHelper');

const packageScope = bgCustomConfig.packageScope || 'package';
const model = bgCustomConfig.model || '*';
let action;

updateEnv().then((res) => {
  if (program.lernaStart) {
    action = program.lernaStart;
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
    console.info(data.toString());
  });
});

function GetRandomNum(Min, Max) {
  var Range = Max - Min;
  var Rand = Math.random();
  return Min + Math.round(Rand * Range);
}

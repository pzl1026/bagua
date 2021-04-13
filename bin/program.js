const program = require('commander');
const path = require('path');
const packageData = require(path.resolve(__dirname, '../package.json'));

program
  .version(packageData.version, '-v, --vers', 'output the current version')
  // .option('-c, --create-project-name <projectName>', 'create project')
  .option('-d, --dev-conf [config]', 'server starting')
  .option('-b, --build-conf [config]', 'project compiling')
  // .option('-a, --analyzer', 'build analyzer')
  .option('-s, --lernaStart [script]', 'lerna start')
  .option('-m, --modelCreate', 'create model')
  .option('-p, --lernaBuildProduction [script]', 'lerna build production')
  // .option('-i, --lernaInstall', 'lerna install for packages')
  .command('init <source> [destination]')
  .command('createmodel <source> [destination]')
  .command('createpage <source> [destination]')
  .command('tempServe <source> [destination]')
  .command('staticServe <source> [destination]')
  .command('uninstallall <source> [destination]') //删除所有的node_modules
  .command('installall <source> [destination]'); //安装所有的node_modules

program.parse(process.argv);

module.exports = program;

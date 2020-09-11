const program = require('commander');
const path = require('path');
const packageData = require(path.resolve(__dirname, '../package.json'));

program
  // .option('-c, --create-project-name <projectName>', 'create project')
  .option('-d, --dev-conf [config]', 'server starting')
  .option('-b, --build-conf [config]', 'project compiling')
  .option('-a, --analyzer', 'build analyzer')
  .option('-s, --lernaStart', 'lerna start')
  .option('-m, --modelCreate', 'create model')
  .option('-p, --lernaBuildProduction', 'lerna build production')
  .option('-i, --lernaInstall', 'lerna install for packages')
  .command('create <source> [destination]')
  .version(packageData.version);

program.parse(process.argv);

module.exports = program;

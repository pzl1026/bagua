const program = require('commander');
const path = require('path');
const packageData = require(path.resolve(__dirname, '../package.json'));

program
  // .option('-c, --create-project-name <projectName>', 'create project')
  .option('-d, --dev-conf <confFile>', 'server starting')
  .option('-b, --build-conf <confFile>', 'project compiling')
  .option('-a, --analyzer', 'build analyzer')
  .option('-s, --lernaStart', 'lerna start')
  .option('-p, --lernaBuildProduction', 'lerna build production')
  .version(packageData.version);

program.parse(process.argv);

module.exports = program;

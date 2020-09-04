const program = require('commander');
const path = require('path');
const packageData = require(path.resolve(__dirname, '../package.json'));

program
  // .option('-c, --create-project-name <projectName>', 'create project')
  .option('-d, --dev-conf <confFile>', 'server starting')
  .option('-b, --build-conf <confFile>', 'project compiling')
  .option('-a, --analyzer', 'build analyzer')
  .option('-m, --module <name>', 'module name')
  .option('-p, --port <port>', 'port')
  .option('-t, --top', 'main common')
  .version(packageData.version);

program.parse(process.argv);

module.exports = program;

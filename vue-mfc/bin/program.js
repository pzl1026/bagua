const program = require('commander');
const path = require('path');
const packageData = require(path.resolve(__dirname, '../package.json'));

program
  .option('-p, --project-name <projectName>', 'create project')
  .option('-d, --dev-conf <confFile>', 'server starting')
  .option('-b, --build-conf <confFile>', 'project compiling')
  .option('-a, --analyzer', 'build analyzer')
  .version(packageData.version);

program.parse(process.argv);

module.exports = program;

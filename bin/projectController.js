require('../src/lerna');

if (program.createModel) {
  global.projectName = program.projectName || 'myproject';
  require('../src/repo');
}

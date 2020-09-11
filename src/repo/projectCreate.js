const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const program = require('../../bin/program');
const helper = require('../helper');
const fs = require('fs');
let [type, value] = program.args;

// 创建项目
function createProject() {
  const tempDir = 'github:pzl1026/bagua';
  const spinner = ora(chalk.yellow('Create start')).start();

  spinner.color = 'blue';
  spinner.text = 'Creating project directory...';

  download(tempDir, 'packages', function(err) {
    if (err) {
      throw err;
      process.exit();
      return;
    }
    // fs.rename(helper.resolve('packages'), helper.resolve(value), (err) => {
    //   if (err) {
    //     throw err;
    //     return;
    //   }

    spinner.text = chalk.blue('Project directory created successfully');
    spinner.succeed();
    spinner.stop();
    spinner.clear();
    process.exit();
    // });
  });
}

createProject();

#!/usr/bin/env node

program = require('./program');
helper = require('../src/helper');
let type = program.args[0];
if (type == 'create') {
  require('../src/repo/projectCreate');
  return;
}

baguaObj = require(helper.resolve('.bagua.js'));
bgCustomConfig = helper.getCustomConfig(baguaObj);
if (bgCustomConfig.packageScope) {
  bgWpConfig = helper.getWpConfig(baguaObj);
  require('./projectController');
} else {
  require('./modelController');
}

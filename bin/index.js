#!/usr/bin/env node

program = require('./program');
helper = require('../src/helper');
let type = program.args[0];
if (type == 'create') {
  require('../src/repo/projectCreate');
  return;
}

bgCustomConfig = helper.getCustomConfig(baguaObj);
baguaObj = require(helper.resolve('.bagua.js'));
if (bgCustomConfig.packageScope) {
  bgWpConfig = helper.getWpConfig(baguaObj);
  require('./projectController');
} else {
  require('./modelController');
}

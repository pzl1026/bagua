#!/usr/bin/env node

program = require('./program');
helper = require('../src/helper');
const { v4: uuidv4 } = require('uuid');

global.VERSION = uuidv4();

let type = program.args[0];
if (type == 'init') {
  require('../src/repo/projectCreate');
  return;
}

if (type == 'createmodel') {
  require('../src/repo/modelCreate');
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

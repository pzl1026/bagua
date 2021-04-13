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

if (type == 'createpage') {
  require('../src/repo/pageCreate');
  return;
}

if (type == 'tmpServe') {
  require('../src/prod/tmpServe');
  return;
}

if (type == 'staticServe') {
  require('../src/prod/staticServe');
  return;
}

if (type == 'init') {
  require('../src/repo/projectCreate');
  return;
}

if (type == 'createmodel') {
  require('../src/repo/modelCreate');
  return;
}

if (type == 'uninstallall') {
  require('../src/repo/clearnodemodules');
  return;
}

if (type == 'installall') {
  const { installAll } = require('../src/repo/install');
  installAll();
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

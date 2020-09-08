#!/usr/bin/env node

program = require('./program');
const helper = require('../helper');
const baguaObj = require(helper.resolve('.bagua.js'));
bgWpConfig = helper.getWpConfig(baguaObj);
bgCustomConfig = helper.getCustomConfig(baguaObj);

if (bgCustomConfig.packageScope) {
  require('./projectController');
} else {
  require('./modelController');
}

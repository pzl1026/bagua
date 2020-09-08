#!/usr/bin/env node

program = require('./program');
helper = require('../helper');
baguaObj = require(helper.resolve('.bagua.js'));
bgCustomConfig = helper.getCustomConfig(baguaObj);

if (bgCustomConfig.packageScope) {
  bgWpConfig = helper.getWpConfig(baguaObj);
  require('./projectController');
} else {
  require('./modelController');
}

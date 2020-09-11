const fs = require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
let [type, value] = program.args;

function getBaguaConfig(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, function(err, data) {
      if (err) {
        throw err;
        process.exit();
        return;
      }
      resolve(data.toString());
    });
  });
}

function handleConfig(filePath) {
  return new Promise((resolve, reject) => {
    getBaguaConfig(filePath).then((res) => {
      let conf = res.replace(/(?<=name:\s)(.*)/, `'${value}',`);
      console.log(conf, 'conf');
      fs.writeFile(filePath, conf, (err) => {
        if (err) {
          throw err;
          return;
        }
        resolve();
      });
    });
  });
}

module.exports = {
  handleConfig,
};

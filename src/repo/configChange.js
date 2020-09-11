const fs = require('fs');

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

function handleConfig(filePath, exp, name) {
  return new Promise((resolve, reject) => {
    getBaguaConfig(filePath).then((res) => {
      let conf = res.replace(exp, name);
      fs.writeFile(filePath, conf, (err) => {
        if (err) {
          throw err;
          return;
        }
        resolve(true);
      });
    });
  });
}

module.exports = {
  handleConfig,
};

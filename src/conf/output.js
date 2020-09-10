const helper = require('../helper');

module.exports = !isDev
  ? {
      path: helper.resolve(
        `./dist${!bgCustomConfig.isTop ? '/' + bgCustomConfig.name : ''}`
      ),
      publicPath: bgWpConfig.output.publicPath,
      filename: `${
        bgCustomConfig.isTop ? bgCustomConfig.name + '/' : ''
      }js/app.${hash}.js`,
    }
  : {
      publicPath: bgWpConfig.output.publicPath,
    };

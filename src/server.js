const webpack = require('webpack');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const apiMocker = require('webpack-api-mocker');
const fs = require('fs');
const config = require('./webpack.config.js');
const compiler = webpack(config);
// const conf = require('./bin/conf');
// const helper = require('./helper');
// const CWD = process.cwd();

let devServer = !bgCustomConfig.nomocker
  ? {
      before: function (app) {
        apiMocker(
          app,
          helper.resolve(`mocker/${program.devConf || 'default'}.js`),
          {
            proxy: bgWpConfig.devServer.proxy,
            changeHost: true,
          }
        );
      },
    }
  : bgWpConfig.devServer;
const options = {
  watchOptions: {
    ignored: /node_modules/,
    // aggregateTimeout: 100,
    // poll: 100,
  },
  disableHostCheck: true,
  historyApiFallback: {
    rewrites: [{ from: /.*/, to: '/index.html' }],
  },
  hot: true,
  compress: true,
  open: bgCustomConfig.autoOpen,
  overlay: true,
  // progress: true,
  publicPath: '/',
  quiet: false,
  ...devServer,
};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

webpackDevServer.addDevServerEntrypoints(config, options);
const server = new webpackDevServer(compiler, options);
// Serve the files on port 3000.
// require('./port').then((port) => {
//   let p = global.bgCustomConfig.port || port;
//   server.listen(p, '', function(res) {
//     console.log(`listening on port ${p}!\n`);
//   });
// });

server.listen(bgCustomConfig.port, '', function (res) {
  console.log(`listening on port ${bgCustomConfig.port}!\n`);
});

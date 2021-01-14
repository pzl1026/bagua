const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
// const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('../plugins/copy');
const webpack = require('webpack');

let MF_FIELDS = [
  'exposes',
  'filename',
  'library',
  'name',
  'remoteType',
  'remotes',
  'shareScope',
  'shared',
];

let mf = {
  // filename: 'remoteEntry.js',
};

for (let [key, value] of Object.entries(bgCustomConfig)) {
  if (MF_FIELDS.includes(key)) {
    mf[key] = value;
  }
}
// bgCustomConfig.isTop
//   ? {
//       name: bgCustomConfig.name,
//       filename: 'remoteEntry.js',
//       remotes: bgCustomConfig.remotes || {},
//       shared: {
//         react: { singleton: true },
//         'react-dom': { singleton: true },
//         vue: { singleton: true },
//       },
//     }
//   : {
//       name: bgCustomConfig.name,
//       library: { type: 'var', name: bgCustomConfig.name },
//       filename: 'remoteEntry.js',
//       exposes: bgCustomConfig.exposes || {},
//       shared: [{ vue: { singleton: true } }],
//     }
// {
let plugins = [
  new ModuleFederationPlugin(mf),
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: helper.resolve('./index.html'),
  }),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: 'true',
    __VUE_PROD_DEVTOOLS__: 'false',
  }),
];

if (!isDev) {
  plugins.push(
    new CopyPlugin([
      {
        from: 'dist',
        to: '../dist',
      },
    ])
  );
}

module.exports = plugins;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('../plugins/copy');

let plugins = [
  new ModuleFederationPlugin(
    bgCustomConfig.isTop
      ? {
          name: global.name,
          filename: 'remoteEntry.js',
          // exposes: {
          //   './Widget': helper.resolve('src/index'),
          // },
          remotes: bgCustomConfig.remotes,
          shared: {
            react: { singleton: true },
            'react-dom': { singleton: true },
            vue: { singleton: true },
          },
        }
      : {
          name: bgCustomConfig.name,
          library: { type: 'var', name: bgCustomConfig.name },
          filename: 'remoteEntry.js',
          exposes: bgCustomConfig.exposes,
          shared: [{ vue: { singleton: true } }],
        }
  ),
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: helper.resolve('./index.html'),
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

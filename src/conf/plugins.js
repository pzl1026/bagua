const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin =
  require('webpack').container.ModuleFederationPlugin;
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('../plugins/copy');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const helper = require('../helper');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const fs = require('fs');
const emoji = require('node-emoji');
const chalk = require('chalk');
// const zlib = require('zlib');

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

let plugins = [
  new ModuleFederationPlugin(mf),
  // new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    template: helper.resolve('./index.html'),
  }),
  // new webpack.DefinePlugin({
  //   __VUE_OPTIONS_API__: 'true',
  //   __VUE_PROD_DEVTOOLS__: 'false',
  // }),
];

if (!isDev) {
  const staticDir = helper.resolve('static');
  // 对static目录判断是否需要处理
  if (fs.existsSync(staticDir)) {
    const sdFiles = fs.readdirSync(staticDir);
    if (sdFiles.length) {
      plugins.push(
        new CopyWebpackPlugin({
          patterns: [{ from: 'static', to: bgCustomConfig.name + '/static' }],
        })
      );
    }
  }

  if (bgCustomConfig.analyzerOpen) {
    const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
    plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 8919 }));
  }

  plugins = [
    ...plugins,
    // new CompressionPlugin({
    //   filename: '[path][base].br',
    //   algorithm: 'brotliCompress',
    //   test: /\.(js|css|html|svg)$/,
    //   compressionOptions: {
    //     params: {
    //       [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //     },
    //   },
    //   threshold: 10240,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: false,
    // }),
    new CompressionPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash].css',
      chunkFilename: bgCustomConfig.name + '/css/[id].[contenthash].css',
    }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      handler(percentage, message, ...args) {
        // custom logic
        console.info(parseInt(percentage * 100) + '%', message, ...args);
      },
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),

    new CopyPlugin([
      {
        from: 'dist',
        to: bgCustomConfig.serverDir + bgCustomConfig.staticDir,
        module: bgCustomConfig.name,
        viewDir: bgCustomConfig.serverDir + (bgCustomConfig.viewDir || '/view'),
      },
    ]),
    // new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        productionSourceMap: false,
      },
    }),
  ];
} else {
  plugins = [...plugins, new webpack.HotModuleReplacementPlugin()];
}

module.exports = plugins;

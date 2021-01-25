const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('../plugins/copy');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const helper = require('../helper');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
// const zlib = require('zlib');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

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
  new CleanWebpackPlugin(),
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
    new CopyWebpackPlugin({
      patterns: [{ from: 'static', to: bgCustomConfig.name + '/static' }],
    }),
    new CopyPlugin([
      {
        from: 'dist',
        to: bgCustomConfig.serverDir + bgCustomConfig.staticDir,
        module: bgCustomConfig.name,
        viewDir: bgCustomConfig.serverDir + bgCustomConfig.viewDir,
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

const path = require('path');
const helper = require('./helper');
const plugins = require('./conf/plugins');
const output = require('./conf/output');
const performance = require('./conf/performance');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: helper.resolve('./src/index.js'),
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'cheap-module-source-map' : 'eval-cheap-module-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.vue', '.ts', 'tsx'],
    alias: {
      // vue$: 'vue/dist/vue.esm.js',
      // 'vue-router$': 'vue-router/dist/vue-router.js',
      '@': helper.resolve('src'),
    },
  },
  output,
  module: {
    rules: [
      {
        test: /\.js|jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [
          helper.resolve('src'),
          helper.resolve('node_modules/webpack-dev-server/client'),
        ],
        options: {
          presets: ['@babel/preset-react'],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: {
        //   loaders: {
        //     scss: ['vue-style-loader', 'css-loader', 'sass-loader'],
        //     sass: [
        //       'vue-style-loader',
        //       'css-loader',
        //       'sass-loader?indentedSyntax',
        //     ],
        //   },
        // },
      },
      {
        test: /\.(s[ac]ss)/i,
        use: [
          // MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/, // 处理 css 文件，以及 .vue 文件中的 <style>
        use: [
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          esModule: false,
          limit: 100,
          name: bgCustomConfig.name + '/assets/' + '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: bgCustomConfig.name + '/assets/' + '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: bgCustomConfig.name + '/assets/' + '[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    ...plugins,
    new MiniCssExtractPlugin({
      filename: bgCustomConfig.name + '/css/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  ...performance,
};

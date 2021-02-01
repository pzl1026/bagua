const helper = require('./helper');
const plugins = require('./conf/plugins');
const output = require('./conf/output');
const performance = require('./conf/performance');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const cssLoaders = () => {
  const ssExtUse = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'sass-loader',
  ];
  const cssExtUse = [
    'vue-style-loader',
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    'postcss-loader',
  ];

  return [
    {
      test: /\.s[ac]ss$/i,
      use: ssExtUse,
    },
    {
      test: /\.css$/, // 处理 css 文件，以及 .vue 文件中的 <style>
      use: cssExtUse,
    },
  ];
};

const config = merge(
  {
    entry: helper.resolve('./src/index.js'),
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-source-map' : 'eval-cheap-module-source-map',
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx', '.vue', '.ts', 'tsx'],
      alias: {
        vue$: 'vue/dist/vue.esm-browser.js',
        'vue-router$': 'vue-router/dist/vue-router.cjs.js',
        '@': helper.resolve('src'),
        echarts$: 'echarts/dist/echarts.simple.js',
      },
    },
    output,
    module: {
      noParse: /^(vue|vue-router|vuex|lodash|echarts)$/, // 忽略模块编译
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
        },
        ...cssLoaders(),
        // {
        //   test: /\.s[ac]ss$/i,
        //   use: [
        //     // Creates `style` nodes from JS strings
        //     'style-loader',
        //     // Translates CSS into CommonJS
        //     'css-loader',
        //     // Compiles Sass to CSS
        //     'sass-loader',
        //   ],
        // },
        // {
        //   test: /\.css$/, // 处理 css 文件，以及 .vue 文件中的 <style>
        //   use: [
        //     'style-loader',
        //     'css-loader',
        //     'postcss-loader',
        //     'vue-style-loader',
        //   ],
        // },
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
    plugins,
    ...performance,
  },
  bgWpConfig
);

module.exports = config;

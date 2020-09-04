const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container
  .ModuleFederationPlugin;
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const helper = require('./helper');

module.exports = {
  entry: helper.resolve('./src/index.js'),
  // entry: './temp/src/index.js',
  mode: 'development',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   port: 3005,
  //   open: true,
  // },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.vue', '.ts', 'tsx'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      'vue-router$': 'vue-router/dist/vue-router.js',
      '@': './src',
    },
  },
  output: {
    publicPath: 'http://localhost:8091/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
      // {
      //   test: /\.css$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader'],
      //     // options: {
      //     //     modules: true,
      //     // }
      //   }),
      // },
      {
        test: /\.css$/, // 处理 css 文件，以及 .vue 文件中的 <style>
        use: [
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
          name: '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'app4',
      library: { type: 'var', name: 'app4' },
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': helper.resolve('src/index'),
      },
      shared: [{ vue: { singleton: true } }],
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: helper.resolve('./index.html'),
    }),
  ],
};

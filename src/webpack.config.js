const path = require('path');
const helper = require('./helper');
const plugins = require('./conf/plugins');
const output = require('./conf/output');

module.exports = {
  entry: helper.resolve('./src/index.js'),
  mode: 'development',
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   port: 3005,
  //   open: true,
  // },
  // devtool: 'eval-cheap-module-source-map',
  // devtool: 'cheap-eval-source-map',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.vue', '.ts', 'tsx'],
    alias: {
      // vue$: 'vue/dist/vue.esm.js',
      // 'vue-router$': 'vue-router/dist/vue-router.js',
      '@': helper.resolve('src'),
    },
  },
  // output: {
  //   path: helper.resolve('dist/js/'),
  //   publicPath: bgWpConfig.output.publicPath,
  // },

  output,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
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
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
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
  plugins,
};

var webpack = require('webpack');
const CopyPlugin = require('mqj-confs/plugins/copy');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(process.cwd(), dir);
}

module.exports = {
  output: {
    publicPath: '//static-h5.towngasvcc.com/daojia',
  },
  plugins: [
    new webpack.DefinePlugin({
      SERVICE_URL: JSON.stringify('http://mobile-api.towngasvcc.com'),
      'process.env': {
        TARGET: JSON.stringify('prod'),
      },
    }),

    // 清除dist目录和output目录
    new CleanWebpackPlugin([resolve('output'), resolve('dist')], {
      allowExternal: true,
    }),

    // 用作部署使用，生成output/static和output/views，便于运维部署
    new CopyPlugin([
      {
        from: 'dist',
        to: 'output/static',
        include: 'dist/daojia',
      },
      {
        from: 'dist',
        to: 'output/views',
        exclude: 'dist/daojia',
      },
    ]),

    new CopyWebpackPlugin([
      //---这里还能指定特定文件输出的位置和文件名
      {
        from: path.resolve(__dirname, '../../static'),
        to: path.resolve('dist/daojia', 'assets'),
        ignore: ['.*'],
      },
    ]),
  ],
};

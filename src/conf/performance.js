const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const ESBuildPlugin = require('esbuild-webpack-plugin').default;

module.exports = isDev
  ? {
      optimization: {
        usedExports: true,
      },
    }
  : {
      performance: {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 10000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        // maxAssetSize: 1024 * 1024 * 3,
        //只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        },
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin(),
          // new ESBuildPlugin(),
        ],
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          maxSize: 3000000,
          minChunks: Infinity,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            styles: {
              name: 'styles',
              test: /\.css$/,
              chunks: 'all',
              enforce: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      },
    };

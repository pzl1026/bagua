// const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESBuildPlugin = require('esbuild-webpack-plugin').default;

module.exports = isDev
  ? {}
  : {
      performance: {
        hints: 'warning',
        //入口起点的最大体积
        maxEntrypointSize: 10000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function (assetFilename) {
          return assetFilename.endsWith('.js');
        },
      },
      optimization: {
        usedExports: true,
        minimize: true,
        minimizer: [
          // new TerserPlugin(),
          new CssMinimizerPlugin(),
          new ESBuildPlugin(),
        ],
        splitChunks: {
          chunks: 'async',
          minSize: 20000,
          minRemainingSize: 0,
          // maxSize: 1024 * 1024 * 0.5,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              // cacheGroupKey here is `commons` as the key of the cacheGroup
              name(module, chunks, cacheGroupKey) {
                const moduleFileName = module
                  .identifier()
                  .split('/')
                  .reduceRight((item) => item);
                const allChunksNames = chunks
                  .map((item) => item.name)
                  .join('~');
                return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
              },
              chunks: 'all',
            },
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

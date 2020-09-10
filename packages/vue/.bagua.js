const path = require('path');

module.exports = {
  name: 'vue',
  isTop: false,
  dev: {
    st1: {
      port: '3003',
      nomocker: false,
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
      },
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
          },
        },
      },
      output: {
        publicPath: '//localhost:3003/',
      },
    },
    default: {
      port: '3003',
      nomocker: false,
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
          },
        },
      },
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
  prod: {
    st1: {
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
      },
      output: {
        publicPath: '//localhost:3001/vue/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
};

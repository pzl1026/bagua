const path = require('path');

module.exports = {
  name: 'react',
  isTop: false,
  dev: {
    st1: {
      port: '3002',
      nomocker: false,
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
        './test': path.resolve(__dirname, 'src/test'),
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
        publicPath: '//localhost:3002/',
      },
    },
    default: {
      port: '3002',
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
        publicPath: '//localhost:3002/',
      },
    },
  },
  prod: {
    st1: {
      exposes: {
        './Widget': path.resolve(__dirname, 'src/index'),
        './test': path.resolve(__dirname, 'src/test'),
      },
      output: {
        publicPath: '//localhost:3001/react/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3002/',
      },
    },
  },
};

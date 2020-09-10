module.exports = {
  name: 'common',
  isTop: true,
  dev: {
    st1: {
      port: '3001',
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
        publicPath: '//localhost:3001/',
      },
    },
    default: {
      port: '3001',
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
        publicPath: '//localhost:3001/',
      },
    },
  },
  prod: {
    st1: {
      output: {
        publicPath: '//localhost:3001/js/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3001/',
      },
    },
  },
};

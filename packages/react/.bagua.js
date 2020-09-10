module.exports = {
  name: 'app2',
  isTop: false,
  dev: {
    st1: {
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
      output: {
        publicPath: '//localhost:3002/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3002/',
      },
    },
  },
};

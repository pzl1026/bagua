module.exports = {
  name: 'common',
  dev: {
    isTop: true,
    port: 3001,
    // domains: {
    //   st: {
    //     '/api': 'http://st1-manage.mingqijia.com/',
    //   },
    //   pre: {
    //     '/api': 'http://pre-manage.mingqijia.com/',
    //   },
    //   prod: {
    //     '/api': 'http://manage.towngasvcc.com/',
    //   },
    // },
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://st1-api.mingqijia.com/',
    //       changeOrigin: true,
    //     },
    //   },
    // },
    nomocker: false,
    output: {
      publicPath: '//localhost:3001/',
    },
  },

  prod: {
    st1: {
      output: {
        publicPath: '//localhost:3001/',
      },
    },

    default: {
      output: {
        publicPath: '//localhost:3001/',
      },
    },
  },
};

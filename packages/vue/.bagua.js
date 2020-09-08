module.exports = {
  name: 'vue',
  dev: {
    isTop: false,
    port: '3003',
    domains: {
      st: {
        '/api': 'http://st1-manage.mingqijia.com/',
      },
      pre: {
        '/api': 'http://pre-manage.mingqijia.com/',
      },
      prod: {
        '/api': 'http://manage.towngasvcc.com/',
      },
    },
    nomocker: false,
    output: {
      publicPath: '//localhost:3003/',
    },
  },

  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://st1-api.mingqijia.com/',
  //       changeOrigin: true,
  //     },
  //   },
  // },

  prod: {
    st1: {
      output: {
        publicPath: '//localhost:3003/',
      },
    },
    default: {
      output: {
        publicPath: '//localhost:3003/',
      },
    },
  },
};

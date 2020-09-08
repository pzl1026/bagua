module.exports = {
  name: 'react',
  dev: {
    isTop: false,
    port: '3002',
    nomocker: false,
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
    // devServer: {
    //   proxy: {
    //     '/api': {
    //       target: 'http://st1-api.mingqijia.com/',
    //       changeOrigin: true,
    //     },
    //   },
    // },
    output: {
      publicPath: '//localhost:3002/',
    },
  },
  prod: {
    st1: {
      output: {
        publicPath: '//localhost:3002/',
      },
    },
    default: {
      publicPath: '//localhost:3002/',
    },
  },
};

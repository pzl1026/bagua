module.exports = {
  name: 'app2',
  isTop: false,
  port: '3002',
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
  nomocker: false,
  output: {
    publicPath: '//localhost:3002/',
  },
};

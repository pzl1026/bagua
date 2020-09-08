module.exports = {
  name: 'app4',
  isTop: false,
  port: '3004',
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
    publicPath: '//localhost:3004/',
  },
};

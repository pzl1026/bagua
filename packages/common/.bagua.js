module.exports = {
  name: 'common',
  isTop: true,
  dev: {
    st1: {
      port: '3001',
      nomocker: false,
      remotes: {
        app3: 'vue@http://localhost:3003/remoteEntry.js',
        app2: 'react@http://localhost:3002/remoteEntry.js',
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
      remotes: {
        app3: 'vue@http://localhost:3001/vue/remoteEntry.js',
        app2: 'react@http://localhost:3001/react/remoteEntry.js',
      },
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

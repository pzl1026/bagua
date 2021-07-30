# bagua-cli

[文档说明](https://www.yuque.com/docs/share/83cf0e1b-157c-46e4-9cbe-f6161816a8c6?#)
基于 webpack5 的联邦模块，微前端方案

### 动机（相对于 vcmqj）

<pre>
1.出于开发环境，每次都要将所有的模块进行编译导致无用的资源进行编译浪费，缩小编译范围，提高项目的编译速度；
2.由于当前项目过于庞大，导致资源整合混乱，对一些通用模块可实现分包管理；
3.不受制于框架的局限性，vue,react 等均可，只需要完成相应的目录模块 clone 即可；
4.技术迭代更新过快，对使用新技术可运用在原有的框架上；
5.生产编译，可以只对当前多修改的应用模块进行编译，无需所有的编译。
</pre>

### 安装

```js
npm i bagua-cli -g
```

### 目录配置

```js
├─.bagua.js //项目配置
├─.babelrc //babel配置
├─.eslintrc.js //eslint配置
├─.gitignore
├─README.md
├─index.html  //通用模板
├─package.json
├─static  // 不需要变异的静态资源
├─src
|  ├─index.css
|  ├─index.js  //入口
|  ├─widgets  //业务组建
|  ├─views    //page组件
|  ├─router   //路由
|  ├─components  //通用组件
├─mocker
|  ├─data  //不分环境的公共配置,启动必会运行的配置
|  ├─default.js  //mocker数据请求代理
|  ├─st1.js //mocker数据
```

### 使用方式

```js
// 创建基本项目
bagua-cli create [项目名称]
// 创建项目某个模块
bagua-cli createmodel [项目包名称]

// 开发环境
// 所运行环境可从.bagua.js里面配置
bagua-cli -s [各个包下的package.json的scripts命令对应起来] // bagua-cli -s start 执行的是各个包下的npm run start命令
bagua-cli -d [运行环境] // 如st

// 生产环境
vcmqj -p [各个包下的package.json的scripts命令对应起来]// bagua-cli -p build 执行的是各个包下的npm run build命令
vcmqj -b [生产环境] // 如st

// 其他命令 -h查看
```

### .bagua.js 的配置

<pre>
<!-- bagua自带配置 -->
  'name',  //模块名称
  'isTop',  //是否是顶层模块
  'nomocker', //是否需要mocker
  'port',     // 编译环境
  'packageScope', //项目包的编译范围
  'dev',      //开发环境配置
  'prod',     //生产环境配置
  'remotes',  // 包与包的请求管理
  'exposes',  // 包与包的输出管理
  'shared',   // 共享模块
  'library'   // 将模块输出编译为module
</pre>

```js
// 可自定义配置webpack属性
const path = require('path');
const webpack = require('webpack');

module.exports = {
  name: 'common',
  autoOpen: true, // 是否自动打开浏览器
  staticDir: '/static/demo', // 以serverDir为base，静态资源目录
  viewDir: '/view', // 以serverDir为base，index.html目录
  serverDir: './output', // 输出目录
  isModuleFederation: false, //判断是否是模块联邦模式的项目
  serverTemplatePort: '3000', // html服务启动端口，模拟真实服务器
  serverStaticPort: '8080', // 静态资源服务启动端口，模拟真实服务器
  staticDir: 'output/static', // 静态资源服务启动目录，模拟真实服务器
  tmpDir: 'output/view', // html服务启动目录，模拟真实服务器
  shared: {
    vue: { singleton: true },
    'vue-router': { singleton: true },
    'ant-design-vue': { singleton: true },
  },
  // library: { type: "var", name: "common" },
  dev: {
    st1: {
      devServer: {
        proxy: {
          '/api': {
            target: 'http://st1-api.mingqijia.com/',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '',
            },
          },
        },
      },
    },
    default: {
      port: '3001',
      nomocker: true,
      filename: `${VERSION}.remoteEntry.js`,
      remotes: {
        asst: `asst@//localhost:3004/${VERSION}.remoteEntry.js`,
      },
      exposes: {
        './util': path.resolve(__dirname, 'src/util'),
      },
      output: {
        // publicPath: '//10.110.2.76:3001/',
        publicPath: '//localhost:3001/',
      },
      plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PROD_ENV: JSON.stringify(process.env.PROD_ENV),
        }),
      ],
    },
  },
  prod: {
    prod: {
      remotes: {
        asst: `asst@//xxx.com/asst/asst/js/${VERSION}.remoteEntry.js?v=${VERSION}`,
      },
      output: {
        publicPath: '//xxx.com/asst/',
      },
    },
    pre: {
      remotes: {
        asst: `asst@//xxx.com/asst/asst/js/${VERSION}.remoteEntry.js?v=${VERSION}`,
      },
      output: {
        publicPath: '//xxx.com/asst/',
      },
    },
    st1: {
      remotes: {
        asst: `asst@//xxx.com/asst/asst/js/${VERSION}.remoteEntry.js?v=${VERSION}`,
      },
      output: {
        publicPath: '//xxx.com/asst/',
      },
    },

    local: {
      remotes: {
        asst: `asst@//localhost:8080/asst/asst/js/${VERSION}.remoteEntry.js?v=${VERSION}`,
      },
    },
    default: {
      filename: `common/js/${VERSION}.remoteEntry.js`,
      exposes: {
        './util': path.resolve(__dirname, 'src/util'),
        './components': path.resolve(__dirname, 'src/components'),
      },
      output: {
        publicPath: '//localhost:8080/asst/',
      },
      plugins: [
        new webpack.DefinePlugin({
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PROD_ENV: JSON.stringify(process.env.PROD_ENV),
        }),
      ],
    },
  },
};
```

### 注意

<pre>
由于支持对不同框架的使用，但是框架组件之间仍存在使用的局限性，如react组建不可使用vue组件等。
</pre>

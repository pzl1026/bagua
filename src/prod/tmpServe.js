const Koa = require('koa');
var views = require('koa-views');
var Router = require('koa-router');
var helper = require('../helper');

const app = new Koa();
var router = new Router();

const render = views(helper.resolve('view/manage'), {
  map: {
    html: 'underscore',
  },
});

app.use(render);

// 指定一个url匹配
router.get('/:module', async (ctx, a, b) => {
  await ctx.render('index');
});

router.get('/', async (ctx, a, b) => {
  await ctx.render('index');
});

// 调用router.routes()来组装匹配好的路由，返回一个合并好的中间件
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`
app.use(router.routes());
app.use(
  router.allowedMethods({
    // throw: true, // 抛出错误，代替设置响应头状态
    // notImplemented: () => '不支持当前请求所需要的功能',
    // methodNotAllowed: () => '不支持的请求方式'
  })
);

app.listen(3000);

console.log('listening on port 3000');

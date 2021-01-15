const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
var helper = require('../helper');

// $ GET /
app.use(serve(helper.resolve('output/static/manage')));

app.listen(8080);

console.log('listening on port 8080');

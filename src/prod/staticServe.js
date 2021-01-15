const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

// $ GET /
app.use(serve('output/static/manage'));

app.listen(8080);

console.log('listening on port 8080');

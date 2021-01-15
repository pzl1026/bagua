const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
const helper = require('../helper');
const projectConfig = require(helper.resolve('.bagua'));
const port = projectConfig.serverTemplatePort;

// $ GET /
app.use(serve(helper.resolve('output/static/manage')));

app.listen(port);

console.log('listening on port ' + port);

let [type, value] = program.args;
const fs = require('fs-extra');
const path = require('path');
const { resolve } = require('../helper');
const chalk = require('chalk');

function createPage() {
  let [module, pagePath, tpl] = value.split(':');
  pagePath = `${module}/src/pages/${pagePath}`;
  fs.copy(
    path.resolve(__dirname, '../tpl/' + tpl),
    resolve(pagePath),
    (err) => {
      if (err) return console.error(err);
      console.log(
        chalk.blue(
          `${module}下的${pagePath}页面创建生成，还需手动添加菜单（common/router）和路由(pages/pagesAsync)`
        )
      );
    }
  );
  return;
}

createPage();

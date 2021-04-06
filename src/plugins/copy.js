var fs = require('fs-extra');
var path = require('path');

function Copy(options) {
  if (!Array.isArray(options)) {
    options = [options];
  }

  this.options = options;
}

Copy.prototype.apply = function (compiler) {
  var self = this;
  var chalk = require('chalk');

  compiler.hooks.done.tap('copy', function (compilation) {
    console.log(chalk.yellow('  Copy start....'));

    self.options.forEach(function (option) {
      let opts = option.options || {};
      let include = option.include,
        exclude = option.exclude;

      if (include || exclude) {
        opts.filter = function (from) {
          from = path.relative(compiler.context, from).replace(/\\+/g, '/');
          if (include) {
            return from.indexOf(include) > -1 || include.indexOf(from) > -1;
          }

          if (exclude) {
            return from.indexOf(exclude) == -1;
          }

          return true;
        };
      }
      let moduleDir = path.resolve(
        process.cwd(),
        option.to + '/' + option.module
      );

      fs.remove(moduleDir, (err) => {
        if (err) return console.error(err);

        fs.copy(
          path.join(compiler.context, option.from + '/' + option.module),
          path.join(compiler.context, option.to + '/' + option.module),
          opts
        )
          .then(function () {
            console.log(
              chalk.blue(
                '    ' + option.from + ' => ' + option.to + ' Complete!'
              )
            );

            if (option.module == 'common') {
              fs.copy(
                path.join(compiler.context, option.from + '/index.html'),
                path.join(
                  compiler.context,
                  (option.viewDir || '/view') + '/index.html'
                )
              ).then(() => {
                console.log(
                  chalk.blue(
                    '    ' +
                      option.from +
                      '/index.html' +
                      ' => ' +
                      (option.viewDir || '/view') +
                      '/index.html' +
                      ' Complete!'
                  )
                );
              });
            }
          })
          .catch(function () {
            console.log(
              chalk.red('    ' + option.from + ' => ' + option.to + ' Failure!')
            );
          });
      });
    });
  });
};

module.exports = Copy;

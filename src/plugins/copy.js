var fs = require('fs-extra');
var path = require('path');

function Copy(options) {
  if (!Array.isArray(options)) {
    options = [options];
  }

  this.options = options;
}

Copy.prototype.apply = function(compiler) {
  var self = this;
  var chalk = require('chalk').constructor({ enabled: true });

  compiler.hooks.done.tap('copy', function(compilation) {
    console.log(chalk.yellow('  Copy start....'));

    self.options.forEach(function(option) {
      let opts = option.options || {};
      let include = option.include,
        exclude = option.exclude;

      if (include || exclude) {
        opts.filter = function(from) {
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

      fs.copy(
        path.join(compiler.context, option.from),
        path.join(compiler.context, option.to),
        opts
      )
        .then(function() {
          console.log(
            chalk.blue('    ' + option.from + ' => ' + option.to + ' Complete!')
          );
        })
        .catch(function() {
          console.log(
            chalk.red('    ' + option.from + ' => ' + option.to + ' Failure!')
          );
        });
    });
  });
};

module.exports = Copy;

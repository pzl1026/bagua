const fs = require('fs');
console.log('启动API自动生成命令成功...2');
const { spawn } = require('child_process');
const { type } = require('os');

fs.readdir(
  './',
  {
    recursive: true,
  },
  (event, filename) => {
    const cmdStr = 'lerna run --scope @dynamic-system-host/* --parallel start';
    const subprocess = spawn('lerna', [
      'run',
      '--scope',
      '@dynamic-system-host/*',
      '--parallel',
      'start',
    ]);

    subprocess.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    //   console.warn(new Date(), ' 检测到文件变化，正在执行编译命令...');
    //   const exec = require('child_process').exec;
    //   const cmdStr =
    //     'lerna run --scope @dynamic-system-host/* --parallel start  > filename.fielExt';
    //   exec(cmdStr, (err, stdout, stderr) => {
    //     if (err) {
    //       console.log(111);
    //       console.log(err);
    //       console.warn(new Date(), ' API文档编译命令执行失败');
    //     } else {
    //       console.log(222);
    //       console.log(stdout);
    //       console.warn(new Date(), ' API文档编译命令执行成功');
    //     }
    //   });
  }
);

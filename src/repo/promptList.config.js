const promptList = {
  frames: [
    {
      type: 'rawlist',
      message: '请选择框架',
      name: 'frame',
      choices: ['vue3', 'react', 'vue'],
    },
  ],
  projectCheckConf: [
    {
      type: 'confirm',
      message: '该目录已存在，是否重新创建？',
      name: 'isProjectCreate',
    },
  ],
};

module.exports = promptList;

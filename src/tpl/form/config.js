export const formItems = [
  {
    label: '名称',
    name: 'username',
    value: 'mingcheng',
    type: 'input',
  },
  {
    label: '类型',
    name: 'type1',
    value: 0,
    type: 'select',
    itemProps: {
      showSearch: true,
      optionFilterProp: 'label',
      filterOption: (input, option) => {
        return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      },
      options: [
        {
          label: '启用',
          value: 1,
        },
        {
          label: '禁用',
          value: 0,
        },
      ],
    },
  },
  {
    label: '类型多选',
    name: 'multitype',
    value: [],
    type: 'select',
    itemProps: {
      mode: 'multiple',
      options: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 0,
        },
        {
          label: '选项3',
          value: 0,
        },
      ],
    },
  },
  {
    label: '多选',
    name: 'checks',
    value: [],
    type: 'checkbox-group',
    itemProps: {
      options: [
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        },
        {
          label: '选项3',
          value: 3,
        },
      ],
    },
  },
  {
    label: '是否',
    name: 'is',
    value: 1,
    type: 'switch',
  },
  {
    label: '文本',
    name: 'text',
    value: '',
    type: 'textarea',
  },
  {
    label: '日期',
    name: 'date',
    type: 'date-picker',
    valueType: 'number',
    format: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    label: '日期范围',
    name: 'dateRange',
    value: [],
    valueFields: ['startTime', 'endTime'],
    valueType: 'string',
    type: 'range-picker',
    format: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    label: '其他',
    name: 'other',
    value: 'iqiqi',
    slot: 'other',
  },
];

export const formItems2Rules = {
  username: [
    {
      required: true,
      message: 'Please input Activity name',
      trigger: 'blur',
    },
    {
      max: 15,
      message: 'Length should be max 15',
      trigger: 'blur',
    },
  ],
  type: [
    {
      type: 'number',
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change',
    },
  ],
  multitype: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  checks: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity checks',
      trigger: 'change',
    },
  ],
  is: [
    {
      type: 'boolean',
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ],
  text: [
    {
      required: true,
      message: 'Please textarea activity form',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'object',
      required: true,
      message: 'Please date activity form',
      trigger: 'change',
    },
  ],
  dateRange: [
    {
      type: 'array',
      required: true,
      message: 'Please dateRange activity form',
      trigger: 'change',
    },
  ],
  other: [
    {
      required: true,
      message: 'Please input activity form',
      trigger: 'blur',
    },
  ],
};

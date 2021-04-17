export const formItems = [
  {
    label: 'searchName',
    name: 'searchname',
    value: 'mingcheng',
    type: 'input'
  },
  {
    label: 'searchSelect',
    name: 'searchSelect',
    span: 8,
    type: 'select',
    itemProps: {
      options: [
        {
          label: 'aa',
          value: 'aa1',
        },
        {
          label: 'bb',
          value: 'bb1',
        },
      ],
    }
  },
  {
    label: 'searchNumber',
    name: 'searchNumber',
    span: 8,
    type: 'input-number'
  },
  {
    label: 'searchDate',
    name: 'searchDate',
    span: 8,
    valueType: 'number',
    value: '',
    type: 'date-picker',
    format: 'YYYY-MM-DD HH:mm:ss'
  },
  {
    label: 'searchRangeDate',
    name: 'searchRangeDate',
    span: 8,
    valueFields: ['startTime', 'endTime'],
    valueType: 'string',
    value: [],
    type: 'range-picker',
    format: 'YYYY-MM-DD HH:mm:ss',
  },
  {
    label: 'searchOther',
    name: 'searchOther',
    span: 8,
    slot: 'searchOther'
  },
];

export const searchRules = {
  searchName: [
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
  ]
};

export const columns = [
  {
    title: '操作',
    dataIndex: 'action',
    slots: { customRender: 'action' },
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

export const formItems2 = [
  {
    label: '名称',
    name: 'username',
    value: 'mingcheng',
    type: 'input'
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
          value: 1
        },
        {
          label: '禁用',
          value: 0
        }
      ]
    }
  },
  {
    label: '类型多选',
    name: 'multitype',
    value: [],
    type: 'select',
    itemProps:{
      mode: 'multiple',
      options: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 0
        },
        {
          label: '选项3',
          value: 0
        }
      ]
    }
  },
  {
    label: '多选',
    name: 'checks',
    value: [],
    type: 'checkbox-group',
    itemProps:{
      options: [
        {
          label: '选项1',
          value: 1
        },
        {
          label: '选项2',
          value: 2
        },
        {
          label: '选项3',
          value: 3
        }
      ]
    }
  },
  {
    label: '是否',
    name: 'is',
    value: 1,
    type: 'switch'
  },
  {
    label: '文本',
    name: 'text',
    value: '',
    type: 'textarea'
  },
  {
    label: '日期',
    name: 'date',
    value: '',
    type: 'date-picker'
  },
  {
    label: '日期范围',
    name: 'dateRange',
    value: [],
    type: 'range-picker'
  },
  {
    label: '其他',
    name: 'other',
    value: 'iqiqi',
    slot: 'other',
  },
];

export const formItems2Rules2 = {
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
  ]
};

export const info = {
  name: 'pzl',
  age: 18,
  height: 183,
  birth: '13月8日'
};

export const itemLabel = [
  {
    key: 'name',
    label: '姓名',
    span: 12,
    itemLayout: {
      labelSpan: 8,
      valueSpan: 16
    }
  },
  {
    key: 'age',
    label: '年龄',
    span: 12,
  },
  {
    key: 'height',
    label: '身高',
    span: 12,
  },
  {
    key: 'birth',
    label: '生日',
    span: 12,
  },
];

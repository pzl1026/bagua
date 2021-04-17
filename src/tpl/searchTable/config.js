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

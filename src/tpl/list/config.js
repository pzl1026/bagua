export const formItems = [
  {
    label: 'ID',
    name: 'id',
    value: '222',
    component: {
      name: 'MInput',
    },
  },
  {
    label: 'Name',
    name: 'name',
    span: 8,
    component: {
      name: 'MSelect',
    },
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
  },
  {
    label: 'Age',
    name: 'age',
    span: 8,
    component: {
      name: 'MInputNumber',
    },
  },
  {
    label: 'Date',
    name: 'date',
    span: 8,
    valueFields: ['startTime', 'endTime'],
    value: [],
    component: {
      name: 'MRangePicker',
    },
  },
];

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

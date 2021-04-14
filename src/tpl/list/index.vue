<template>
  <div>
    <SearchTable :formItems="formItems" :columns="columns" :api="getData">
      <template #actions>
        <a-button>创建</a-button>
      </template>
      <template #action>
        <a>操作</a>
      </template>
    </SearchTable>
  </div>
</template>

<script>
import { formItems, columns } from './config';
import { getData } from './api';

export default {
  data() {
    return {
      formItems,
      getData,
      columns,
    };
  },
};
</script>

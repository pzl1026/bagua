<template>
  <div>
    <SearchTable :formItems="formItems" :columns="columns" :api="getData" />
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

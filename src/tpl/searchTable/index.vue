<template>
  <div>
  <SearchTable :formItems="formItems" :columns="columns" :api="getData" :rules="searchRules">
    <template #searchOther="{item, formParams}">
      <div>
        searchOther
      </div>
    </template>
    <template #actions>
      <a-button>创建</a-button>
    </template>
    <template #action>
      <a @click="toggleVisible">操作</a>
    </template>
  </SearchTable>
  </div>
</template>

<script>
import { ref, toRefs, reactive } from 'vue';
import { 
  formItems, 
  searchRules, 
  columns 
} from './config';
import { getData } from './api';

export default {
  data() {
    return {
      getData,
      formItems, 
      searchRules, 
      columns,
    };
  },
  setup(props, context) {
  
  }
}
</script>
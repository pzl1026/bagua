<template>
  <div>
    <form-content
      :rules="formItems2Rules"
      :form-items="formItems"
      :handleInitFormData="handleInitFormData"
      :submitApi="getData"
      :afterSubmit="afterSubmit"
    >
      <template #other="{ item, formState }">
        <div>
          <a-input v-model:value="formState[item.name]"></a-input>
        </div>
      </template>
    </form-content>
  </div>
</template>

<script>
import { ref, toRefs, reactive } from 'vue';
import { formItems, formItems2Rules } from './config';
import { getData } from './api';

export default {
  data() {
    return {
      getData,
      formItems,
      formItems2Rules,
    };
  },
  setup(props, context) {
    const afterSubmit = (res) => {
      console.log(res, 'afterSubmit');
    };

    const handleInitFormData = (data) => {
      data.is = data.is == 1 ? true : false;
      return data;
    };

    return {
      handleInitFormData,
      afterSubmit,
    };
  },
};
</script>

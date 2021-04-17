<template>
  <div>
    <SearchTable
      :formItems="formItems"
      :columns="columns"
      :api="getData"
      :rules="searchRules"
    >
      <template #searchOther="{ item, formParams }">
        <div>searchOther</div>
      </template>
      <template #actions>
        <a-button>创建</a-button>
      </template>
      <template #action>
        <a @click="toggleVisible">操作</a>
      </template>
    </SearchTable>
    <a-modal
      title="详情"
      :visible="visible"
      width="1000"
      @ok="modalSubmit"
      @cancel="() => toggleVisible()"
    >
      <a-space direction="vertical">
        <info-content
          :info="info"
          :item-label="itemLabel"
          :line-count="2"
          :handleInfo="handleInfo"
        />
        <form-content
          ref="formcontent"
          :rules="formItems2Rules2"
          :form-items="formItems2"
          :handleInitFormData="handleInitFormData"
          :needSubmitButton="false"
          :submitApi="getData"
          :afterSubmit="afterSubmit"
          :columnsCount="2"
        >
          <template #other="{ item, formState }">
            <div>
              <a-input v-model:value="formState[item.name]"></a-input>
            </div>
          </template>
        </form-content>
      </a-space>
    </a-modal>
  </div>
</template>

<script>
import { ref, toRefs, reactive } from 'vue';
import {
  formItems2,
  formItems2Rules2,
  itemLabel,
  info,
  formItems,
  searchRules,
  columns,
} from './config';
import { getData } from './api';

export default {
  data() {
    return {
      getData,
      info,
      itemLabel,
      formItems,
      searchRules,
      columns,
      formItems2,
      formItems2Rules2,
    };
  },
  setup(props, context) {
    const formcontent = ref(null);
    const state = reactive({
      visible: false,
    });

    const afterSubmit = (res) => {
      console.log(res, 'afterSubmit');
    };

    const modalSubmit = () => {
      formcontent.value.onSubmit();
    };

    const handleInitFormData = (data) => {
      data.is = data.is == 1 ? true : false;
      return data;
    };

    const handleInfo = (info) => {
      delete info.birth;
    };

    const toggleVisible = () => {
      state.visible = !state.visible;
    };

    return {
      modalSubmit,
      formcontent,
      handleInitFormData,
      handleInfo,
      afterSubmit,
      toggleVisible,
      ...toRefs(state),
    };
  },
};
</script>

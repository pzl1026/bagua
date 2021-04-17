<template>
  <div>
    <info-content 
      :info="info" 
      :item-label="itemLabel" 
      :line-count="3" 
      :handleInfo="handleInfo"/>
  </div>
</template>

<script>
import { ref, toRefs, reactive } from 'vue';
import { 
  itemLabel, 
  info
} from './config';

export default {
  data() {
    return {
      info,
      itemLabel,
    };
  },
  setup(props, context) {
    const handleInfo = (info) => {
      delete info.birth;
    }

    return {
      handleInfo
    };
  }
}
</script>
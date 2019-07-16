<template>
  <div id="app">
    <vuelator/>
    <vuelator-log/>
  </div>
</template>

<script>
import Vuelator from '@/components/Vuelator/Vuelator.vue';
import VuelatorLog from '@/components/Vuelator/VuelatorLog.vue';

export default {
  name: 'app',
  components: {
    Vuelator,
    VuelatorLog,
  },
};
</script>

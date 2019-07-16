<template>
  <div id="app">
    <div class="container">
      <vuelator/>
    </div>
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

<style lang="scss">
  @import "@/assets/scss/main.scss";
</style>

<template>
  <div class="vuelator-log">
    <ul v-if="logs.length > 0">
      <li v-for="(log, index) in logs" :key="index">{{log}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Vuelator',
  computed: {
    logs() {
      return this.$store.getters.logs;
    },
  },
};
</script>

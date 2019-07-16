<template>
  <div class="vuelator-log">
    <ul v-if="logs.length > 0">
      <li v-for="(log, index) in logs" :key="index">{{logs}}</li>
    </ul>
    <ul v-else>
      <li>0</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Vuelator',
  props: {
    logs: {
      type: Array,
      required: true,
    },
  },
};
</script>

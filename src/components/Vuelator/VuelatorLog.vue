<template>
  <div class="vuelator-log">
    <h2 class="text-center heading-2">Histroy</h2>
    <ul class="vuelator-loglist" v-if="logs.length > 0">
      <li v-for="(log, index) in logs" :key="index">{{log}}</li>
      <li class="no-border"><button class="btn btn-pill btn-info" @click="doReset">Reset</button></li>
    </ul>
    <ul class="vuelator-loglist" v-else>
      <li class="text-center">Opps... is empty!</li>
      <li class="no-border text-center text-copyright">Created by <br/> Ian Maulana</li>
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
  methods: {
    doReset() {
      this.$store.commit('RESET_LOGS');
    },
  },
};
</script>

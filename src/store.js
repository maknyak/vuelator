import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logs: [],
  },
  mutations: {
    SET_LOGS: (state, logs) => {
      state.logs = logs;
    },
  },
  actions: {

  },
});

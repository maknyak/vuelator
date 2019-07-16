import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logs: [],
  },
  mutations: {
    SET_LOGS: (state, log) => {
      state.logs.push(log)
    },
  },
  getters: {
    logs: state => state.logs,
  },
});

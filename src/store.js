import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logs: [],
  },
  mutations: {
    SET_LOGS: (state, log) => {
      state.logs.push(log);
    },
    RESET_LOGS: (state) => {
      state.logs = [];
    },
  },
  getters: {
    logs: state => state.logs,
  },
});

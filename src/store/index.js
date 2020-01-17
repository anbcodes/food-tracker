import Vue from 'vue';
import Vuex from 'vuex';
import Goal from '../util/Goal';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    goals: [],
  },
  mutations: {
    setGoals(state, goals) {
      state.goals = goals;
    },

    setGoal(state, goal) {
      const newGoals = [...state.goals];
      newGoals[state.goals.map(v => v.id).indexOf(goal.id)] = goal;
      state.goals = newGoals;
    },

    createGoal(state, goal) {
      const newGoals = [...state.goals];
      newGoals.push(goal);
      state.goals = newGoals;
    },

    removeGoal(state, id) {
      this.goals = this.goals.filter(goal => goal.id !== id);
    },
  },
  actions: {
    pull({ commit }) {
      const data = JSON.parse(localStorage.getItem('sampleData'));
      commit('setGoals', data.goals.map(goal => new Goal(goal)));
    },

    push({ state }) {
      const data = { goals: state.goals.map(goal => goal.toObject()) };
      localStorage.setItem('sampleData', JSON.stringify(data));
    },
  },

  getters: {
    getGoalsForDay: state => day => state.goals.map(goal => ({ goal, done: goal.getDay(day) })),
  },

  modules: {
  },
});

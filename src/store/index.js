import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const defaultField = {
  id: 0,
  active: true,
  hidden: false,
  city: "",
  arrival: "",
  departure: "",
  duration: 1,
  radius: 1,
  lat: 0,
  lon: 0,
  country: "",
};

export default new Vuex.Store({
  state: {
    destinations: [{ ...defaultField }],
    showOnly: [],
    animationDuration: 0.8,
  },
  getters: {
    activeDestinations: (state) => {
      return state.destinations.filter((d) => d.active).reverse();
    },
    durations: (state, getters) => {
      return getters.activeDestinations.map((d) => parseInt(d.duration));
    },
  },
  mutations: {
    loadState(state, payload) {
      state.destinations = payload;
    },
    addField(state) {
      let id = state.destinations.length;
      let newField = { ...defaultField };
      newField.id = id;
      state.destinations.push(newField);
    },
    removeField(state, payload) {
      state.destinations.find((e) => e.id === payload.id).active = false;
    },
    updateField(state, payload) {
      let destination = state.destinations.find((e) => e.id === payload.id);
      destination.city = payload.d.city;
      destination.arrival = payload.d.arrival;
      destination.departure = payload.d.departure;
      destination.radius = payload.d.radius || 3;
      destination.duration = payload.d.duration;
      destination.lat = payload.d.lat;
      destination.lon = payload.d.lon;
      destination.country = payload.d.country;
    },
    sortBy(state, payload) {
      let prop = payload.field;
      function compare(a, b) {
        if (!isNaN(parseInt(a[prop]))) {
          a[prop] = parseInt(a[prop]);
          b[prop] = parseInt(b[prop]);
        }
        if (a[prop] < b[prop]) {
          let i = payload.direction ? -1 : 1;
          return i;
        }
        if (a[prop] > b[prop]) {
          let j = payload.direction ? 1 : -1;
          return j;
        }
        return 0;
      }
      state.destinations = state.destinations.sort(compare);
    },
    showOnly(state, payload) {
      state.showOnly = payload;
    },
  },
  actions: {},
  modules: {},
});

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
      state.destinations[payload.id].city = payload.d.city;
      state.destinations[payload.id].arrival = payload.d.arrival;
      state.destinations[payload.id].departure = payload.d.departure;
      state.destinations[payload.id].radius = payload.d.radius || 3;
      state.destinations[payload.id].duration = payload.d.duration;
      state.destinations[payload.id].lat = payload.d.lat;
      state.destinations[payload.id].lon = payload.d.lon;
      state.destinations[payload.id].country = payload.d.country;
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
      state.destinations.forEach((e) => {
        if (payload.includes(e.id)) {
          e.radius = 8;
        } else {
          e.radius = 2;
        }
      });
    },
  },
  actions: {},
  modules: {},
});

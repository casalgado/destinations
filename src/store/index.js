import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    destinations: [
      {
        id: 0,
        active: true,
        city: "",
        arrival: "",
        departure: "",
        duration: 1,
        radius: 1,
        lat: 0,
        lon: 0,
        country: "",
      },
    ],
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
      state.destinations.push({
        id: id,
        active: true,
        city: "",
        arrival: "",
        departure: "",
        duration: 1,
        radius: 1,
        lat: 0,
        lon: 0,
        country: "",
      });
    },
    removeField(state, payload) {
      state.destinations[payload.id].active = false;
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
  },
  actions: {},
  modules: {},
});

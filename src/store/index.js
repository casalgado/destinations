import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const emptyDestination = {
  id: 0,
  active: true,
  hidden: false,
  city: "",
  arrival: "",
  departure: "",
  duration: 1,
  radius: 10,
  lat: 0,
  lon: 0,
  country: "",
};

export default new Vuex.Store({
  state: {
    destinations: [{ ...emptyDestination }],
    showOnly: [],
    animationDuration: 0.8,
    maxRadius: 20,
    minRadius: 5,
    maxColor: "rgb(176,0,0)",
    minColor: "rgb(254,255,0)",
    defaultColor: "rgb(63,111,222)",
    colorScalingAlgorithm: "",
    scaling: {
      color: false,
      size: false,
      Dmax: 0,
      Dmin: 0,
    },
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
    addDestination(state) {
      let id = state.destinations.length;
      let newField = { ...emptyDestination };
      newField.id = id;
      state.destinations.push(newField);
    },
    removeDestination(state, payload) {
      state.destinations.find((e) => e.id === payload.id).active = false;
    },
    updateDestination(state, payload) {
      let destination = state.destinations.find((e) => e.id === payload.id);
      destination.city = payload.d.city || destination.city;
      destination.arrival = payload.d.arrival || destination.arrival;
      destination.departure = payload.d.departure || destination.departure;
      destination.radius = payload.d.radius || destination.radius;
      destination.duration = payload.d.duration || destination.duration;
      destination.lat = payload.d.lat || destination.lat;
      destination.lon = payload.d.lon || destination.lon;
      destination.country = payload.d.country || destination.country;
    },
    sortBy(state, payload) {
      let prop = payload.field;
      function compare(a, b) {
        if (a[prop] == parseInt(a[prop])) {
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
    scalingProps(state, payload) {
      let props = {};
      props.color = payload.color;
      props.size = payload.size;
      props.Dmax = payload.Dmax;
      props.Dmin = payload.Dmin;
      state.scaling = { ...props };
    },
    setDmaxDmin(state) {
      let Dmax = Math.max(
        ...state.destinations
          .filter((d) => d.active)
          .map((e) => parseInt(e.duration))
      );
      let Dmin = Math.min(
        ...state.destinations
          .filter((d) => d.active)
          .map((e) => parseInt(e.duration))
      );
      state.scaling.Dmax = Dmax;
      state.scaling.Dmin = Dmin;
    },
  },
  actions: {},
  modules: {},
});

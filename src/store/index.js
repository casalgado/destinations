import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

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

function latScale(coord) {
  let maxdeg = 90;
  let maxpix = 300;
  coord = parseFloat(coord);
  if (coord < 0) {
    return maxpix + (Math.abs(coord) / maxdeg) * maxpix;
  } else {
    return maxpix - (coord / maxdeg) * maxpix;
  }
}

function lonScale(coord) {
  let maxdeg = 180;
  let maxpix = 600;
  coord = parseFloat(coord);
  if (coord > 0) {
    return maxpix + (coord / maxdeg) * maxpix;
  } else {
    return maxpix - (Math.abs(coord) / maxdeg) * maxpix;
  }
}

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
    refresh: true,
  },
  getters: {
    activeDestinations: (state) => {
      return state.destinations.filter((d) => d.active).reverse();
    },
    durations: (state, getters) => {
      return getters.activeDestinations.map((d) => parseInt(d.duration));
    },
    destination: (state) => (id) => {
      return state.destinations.find((d) => d.id === id);
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
      state.destinations.forEach((e) => {
        if (e.id === payload.id) {
          Object.assign(e, payload);
        }
      });
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
  actions: {
    UpdateDestination({ dispatch, commit, getters }, destination) {
      let current = getters.destination(destination.id);
      if (
        current.city !== destination.city ||
        current.country !== destination.country
      ) {
        dispatch("findCoordinates", {
          city: destination.city,
          country: destination.country,
        }).then((e) => {
          destination.country = e.country;
          destination.lat = latScale(e.lat);
          destination.lon = lonScale(e.lon);
          commit("updateDestination", destination);
        });
      } else {
        commit("updateDestination", destination);
        commit("setDmaxDmin");
      }
    },
    findCoordinates({ state }, place) {
      console.time(state);
      return new Promise((resolve) => {
        axios({
          method: "GET",
          url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "a4155f4872msh83b76cd21659288p1f840fjsnae620982cab8",
            useQueryString: true,
          },
          params: {
            name: place.city,
            country: place.country || null,
          },
        })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
  modules: {},
});

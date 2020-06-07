<template>
  <div class="home">
    <div>
      <button @click="addField">
        field
      </button>
    </div>
    <div id="map-container">
      <img id="map-background" src="@/assets/world.svg" alt="" />
      <svg id="map">
        <circle cx="50" cy="50" r="40" fill="red" />
      </svg>
    </div>
    <table>
      <tr>
        <th>city</th>
        <th>arrival</th>
        <th>departure</th>
        <th>duration</th>
      </tr>
      <CityInput
        v-for="d in activeDestinations"
        :key="d.id"
        :id="d.id"
        :populate="d"
        @remove-field="removeField"
        @update-field="updateField"
      />
    </table>

    <button @click="findCoordenates">find</button>
    <p>{{ destinations }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import CityInput from "../components/CityInput.vue";

import axios from "axios";

export default {
  name: "Home",
  components: { CityInput },
  data() {
    return {
      destinations: [
        {
          id: 0,
          active: true,
          name: "",
          arrival: "",
          departure: "",
          duration: 0,
          lat: 0,
          long: 0,
          country: "",
        },
      ],
      places: [],
    };
  },
  computed: {
    activeDestinations: function() {
      return this.destinations.filter((e) => e.active);
    },
  },
  methods: {
    addField() {
      let id = this.destinations.length;
      this.destinations.push({
        id: id,
        active: true,
        name: "",
        arrival: "",
        departure: "",
        duration: 0,
        lat: 0,
        long: 0,
        country: "",
      });
    },
    removeField(payload) {
      this.destinations[payload.id].active = false;
    },
    updateField(payload) {
      console.log(payload);
      this.destinations[payload.id].city = payload.d.city;
      this.destinations[payload.id].arrival = payload.d.arrival;
      this.destinations[payload.id].departure = payload.d.departure;
      this.destinations[payload.id].duration = payload.d.duration;

      console.log(this.destinations);
    },
    findCoordenates: function(city) {
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
          name: city,
        },
      })
        .then((response) => {
          let r = response.data;
          let obj = {
            name: r.name,
            lat: r.lat,
            lon: r.lon,
            country: r.country,
          };
          this.places.push(obj);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
table,
th {
  border: 1px solid gray;
  border-collapse: collapse;
}
table {
  max-width: 500px;
  margin: 0 auto;
  border-right: none;
  border-bottom: none;
}

#map-container {
  position: relative;
  width: 800px;
  height: 400px;
  margin: 0 auto;
}

#map-background {
  width: 100%;
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0;
  left: 0;
}

#map {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

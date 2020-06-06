<template>
  <div class="home">
    <p>{{ places }}</p>
    <div v-for="city in cities" :key="city.id">
      <input v-model="city" />
    </div>
    <button @click="findCoordenates">find</button>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: "Home",
  components: {},
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
        },
      ],
      places: [],
    };
  },
  methods: {
    findCoordenates: function() {
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
          name: this.city,
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

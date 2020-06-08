<template>
  <div class="home">
    <div id="map-container">
      <img id="map-background" src="@/assets/world.svg" alt="" />
      <svg id="map">
        <circle
          v-for="dest in activeDestinations"
          :key="dest.id"
          :cx="dest.lon"
          :cy="dest.lat"
          :r="dest.radius"
          fill="red"
        />
      </svg>
    </div>
    <button @click="addField">
      add destination
    </button>
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

    <p>{{ destinations }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import CityInput from "../components/CityInput.vue";

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
          duration: 1,
          radius: 1,
          lat: 0,
          lon: 0,
          country: "",
        },
      ],
    };
  },
  computed: {
    activeDestinations: function() {
      return this.destinations.filter((e) => e.active).reverse();
    },
    durations: function() {
      return this.destinations
        .filter((e) => e.active)
        .map((e) => parseInt(e.duration));
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
        duration: 1,
        radius: 1,
        lat: 0,
        long: 0,
        country: "",
      });
    },
    removeField(payload) {
      this.destinations[payload.id].active = false;
    },
    updateField(payload) {
      this.destinations[payload.id].city = payload.d.city;
      this.destinations[payload.id].arrival = payload.d.arrival;
      this.destinations[payload.id].departure = payload.d.departure;
      this.destinations[payload.id].radius = 3;
      this.destinations[payload.id].duration = payload.d.duration;
      this.destinations[payload.id].lat = payload.d.lat;
      this.destinations[payload.id].lon = payload.d.lon;
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

#test {
  z-index: 999;
}

#map-container {
  position: relative;
  width: 1200px;
  height: 600px;
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

button {
  margin: 10px;
}
</style>

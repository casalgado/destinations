<template>
  <div class="field">
    <div id="map-container">
      <img id="map-background" src="@/assets/world.svg" alt="" />
      <svg id="map">
        <circle
          v-for="dest in activeDestinations"
          :key="dest.id"
          :cx="dest.lon"
          :cy="dest.lat"
          :r="dest.radius"
          fill="blue"
        />
      </svg>
    </div>
    <div id="table-container">
      <button @click="addField">
        add destination
      </button>
      <button @click="save">
        save
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
        />
      </table>
    </div>
    <div id="controls-container">
      <p>controls</p>
    </div>

    <p>{{ activeDestinations }}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import CityInput from "../components/CityInput.vue";

export default {
  name: "Field",
  components: { CityInput },
  created() {
    if (localStorage.getItem("destinations")) {
      try {
        let destinations = JSON.parse(localStorage.getItem("destinations"));
        this.$store.commit("loadState", destinations);
      } catch (e) {
        console.log(JSON.parse(localStorage.getItem("destinations")));
      }
    }
  },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
    durations: function() {
      return this.$store.getters.durations;
    },
  },
  methods: {
    addField() {
      this.$store.commit("addField");
    },
    removeField(payload) {
      this.$store.commit("removeField", payload);
    },
    save: function() {
      const parsed = JSON.stringify(this.destinations);
      localStorage.setItem("destinations", parsed);
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

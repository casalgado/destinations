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
          fill="lightblue"
        />
      </svg>
    </div>
    <DurationsFilter />
    <CityTable />
    <ul class="print">
      <li v-for="a in activeDestinations" :key="a.id">{{ a }}</li>
    </ul>
    <ul class="print">
      <li v-for="a in allDestinations" :key="a.id">{{ a }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import CityTable from "../components/CityTable.vue";
import DurationsFilter from "../components/DurationsFilter.vue";

export default {
  name: "Field",
  components: { CityTable, DurationsFilter },
  created() {
    if (localStorage.getItem("destinations")) {
      try {
        let destinations = JSON.parse(localStorage.getItem("destinations"));
        console.log(destinations);
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
    allDestinations: function() {
      return this.$store.state.destinations;
    },
  },
};
</script>
<style scoped>
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

.print {
  margin-top: 25px;
}
</style>

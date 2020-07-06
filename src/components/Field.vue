<template>
  <div class="field">
    <div id="map-container">
      <img id="map-background" src="@/assets/world.svg" alt="" />
      <svg id="map">
        <Pointer
          v-for="dest in activeDestinations"
          :key="dest.id"
          :destination="dest"
        />
      </svg>
    </div>
    <DurationsFilter />
    <DurationsScaling />
    <ShowAnimation />
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
import Pointer from "../components/Pointer.vue";
import CityTable from "../components/CityTable.vue";
// below are components that go in 'controls'
import ShowAnimation from "../components/ShowAnimation.vue";
import DurationsFilter from "../components/DurationsFilter.vue";
import DurationsScaling from "../components/DurationsScaling.vue";

export default {
  name: "Field",
  components: {
    CityTable,
    DurationsFilter,
    Pointer,
    ShowAnimation,
    DurationsScaling,
  },
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

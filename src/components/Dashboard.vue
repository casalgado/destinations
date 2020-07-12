<template>
  <div>
    <Map />
    <ul>
      <li v-for="c in this.configuration" :key="c.id">{{ c }}</li>
    </ul>
    <DurationsFilter />
    <DurationsScaling />
    <Animation />
    <Save />
    <Table />
  </div>
</template>

<script>
import Map from "./map/Map.vue";
import Table from "./table/Table.vue";
import Save from "./buttons/Save.vue";
import Animation from "./buttons/Animation.vue";
import DurationsFilter from "./DurationsFilter.vue";
import DurationsScaling from "./DurationsScaling.vue";

export default {
  name: "Dashboard",
  components: {
    Table,
    DurationsFilter,
    Map,
    Animation,
    DurationsScaling,
    Save,
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
    configuration: function() {
      return this.$store.state.configuration;
    },
  },
};
</script>
<style scoped></style>

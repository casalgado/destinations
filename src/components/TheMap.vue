<template>
  <div id="map-container">
    <img id="map-background" src="@/assets/world.svg" alt="" />
    <svg id="map">
      <TheMapPointer
        v-for="dest in activeDestinations"
        :key="dest.id"
        :destination="dest"
      />
    </svg>
  </div>
</template>

<script>
import TheMapPointer from "./TheMapPointer.vue";
export default {
  name: "Map",
  components: { TheMapPointer },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
  },
};
</script>

<style scoped>
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
</style>

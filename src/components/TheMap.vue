<template>
  <div id="map-container">
    <img id="map-background" src="@/assets/world.svg" alt="" />
    <div class="tooltip">
      <p v-if="!tooltip.city">Hover points on the map!</p>
      <div v-else>
        <p>city: {{ tooltip.city }}, {{ tooltip.country }}</p>
        <p>
          duration of stay: {{ tooltip.duration }} day{{
            `${tooltip.duration == 1 ? "" : "s"}`
          }}
        </p>
      </div>
    </div>
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
    activeDestinations: function () {
      return this.$store.getters.activeDestinations;
    },
    tooltip: function () {
      return this.$store.getters.tooltip;
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

.tooltip {
  position: absolute;
  bottom: 20%;
  left: 2%;
  z-index: 99;
  text-align: left;
}
</style>

<template>
  <form>
    <label for="">Scale destinations using: </label>
    <input type="checkbox" id="color" v-model="color" />
    <label for="color">color</label>
    <input type="checkbox" id="size" v-model="size" />
    <label for="size">size</label>
  </form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DurationsScaling",
  data() {
    return {
      color: false,
      size: false,
    };
  },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
    ...mapState(["maxRadius", "minRadius"]),
  },
  methods: {
    getNewRadius: function(duration) {
      let Rmax = this.maxRadius;
      let Rmin = this.minRadius;
      let Dmax = Math.max(
        ...this.activeDestinations.map((e) => parseInt(e.duration))
      );
      let Dmin = Math.min(
        ...this.activeDestinations.map((e) => parseInt(e.duration))
      );
      if (this.size) {
        // linear squishing
        let newR = Rmin + (Rmax - Rmin) * ((duration - Dmin) / (Dmax - Dmin));
        return newR;
      } else {
        return Rmin;
      }
    },
    resizeAll: function() {
      this.activeDestinations.forEach((e) => {
        let newR = this.getNewRadius(e.duration);
        this.$store.commit("updateField", {
          id: e.id,
          d: {
            radius: newR,
          },
        });
      });
    },
  },
  watch: {
    size() {
      this.resizeAll();
    },
  },
};
</script>

<style scoped></style>

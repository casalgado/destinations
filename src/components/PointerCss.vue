<template>
  <div :id="`id${destination.id}`" :style="styleObject"></div>
</template>

<script>
import { gsap } from "gsap";
import { mapState } from "vuex";
export default {
  name: "Pointer",
  props: {
    destination: Object,
  },
  computed: {
    styleObject: function() {
      let lon = this.destination.lon;
      let lat = this.destination.lat;
      let rad = this.destination.radius;
      let so = {
        left: lon + rad + "px",
        top: lat - rad + "px",
        width: rad * 2 + "px",
        height: rad * 2 + "px",
        backgroundColor: "lightblue",
      };
      return so;
    },
    ...mapState(["showOnly"]),
  },
  watch: {
    showOnly() {
      if (this.showOnly.includes(this.destination.id)) {
        gsap.to(`#id${this.destination.id}`, {
          duration: 5,
          ease: "bounce",
          width: "8",
          height: "8",
          left: "-=4",
          top: "-=4",
        });
      }
    },
  },
};
</script>

<style scoped>
div {
  position: absolute;
  border-radius: 999px;
}
</style>

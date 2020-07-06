<template>
  <circle
    ref="pointer"
    :cx="destination.lon"
    :cy="destination.lat"
    :r="destination.radius"
    fill="lightblue"
  />
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
    duration: function() {
      return this.destination.radius;
    },
    colorScaling: function() {
      return this.scaling.color;
    },
    sizeScaling: function() {
      console.log(this.scaling.size);
      return this.scaling.size;
    },
    ...mapState([
      "maxRadius",
      "minRadius",
      "showOnly",
      "animationDuration",
      "scaling",
    ]),
  },
  methods: {
    getScaledRadius: function(duration) {
      let Rmax = this.maxRadius;
      let Rmin = this.minRadius;
      let Dmax = this.scaling.Dmax;
      let Dmin = this.scaling.Dmin;
      if (this.sizeScaling) {
        // linear squishing
        let newR = Rmin + (Rmax - Rmin) * ((duration - Dmin) / (Dmax - Dmin));
        return newR;
      } else {
        return Rmin;
      }
    },
  },
  watch: {
    showOnly() {
      const { pointer } = this.$refs;
      if (this.showOnly.includes(this.destination.id)) {
        gsap.to(pointer, {
          duration: this.animationDuration,
          attr: { r: 8 },
          ease: "elastic",
        });
      } else {
        gsap.to(pointer, {
          duration: this.animationDuration,
          attr: { r: 2 },
          ease: "expo",
        });
      }
    },
    sizeScaling() {
      const { pointer } = this.$refs;
      let newR = this.getScaledRadius(this.destination.duration);
      console.log(newR);
      gsap.to(pointer, {
        duration: this.animationDuration,
        attr: { r: newR },
        ease: "easeOut",
      });
    },
  },
};
</script>

<style></style>

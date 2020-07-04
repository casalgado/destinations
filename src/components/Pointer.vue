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
    ...mapState(["showOnly"]),
  },
  watch: {
    showOnly() {
      const { pointer } = this.$refs;
      if (this.showOnly.includes(this.destination.id)) {
        gsap.to(pointer, {
          duration: 5,
          attr: { r: 8 },
          ease: "easeIn",
        });
      } else {
        gsap.to(pointer, {
          duration: 5,
          attr: { r: 2 },
          ease: "easeIn",
        });
      }
    },
  },
};
</script>

<style></style>

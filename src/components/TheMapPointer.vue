<template>
  <circle
    ref="pointer"
    :cx="destination.lon"
    :cy="destination.lat"
    :r="destination.radius"
    :fill="this.configuration.default.color"
  />
</template>

<script>
import { gsap } from "gsap";
import { mapState } from "vuex";
import { PointerHelpers } from "@/mixins/PointerHelpers";
export default {
  name: "TheMapPointer",
  props: {
    destination: Object,
  },
  mixins: [PointerHelpers],
  computed: {
    filter: function() {
      return this.configuration.filter;
    },
    scaling: function() {
      return this.configuration.scaling;
    },
    duration: function() {
      return this.destination.duration;
    },
    Dmax: function() {
      return this.configuration.scaling.maxDuration;
    },
    Dmin: function() {
      return this.configuration.scaling.minDuration;
    },
    durationsChange: function() {
      return this.$store.getters.durations.reduce((total, current) => {
        return current + total;
      }, 0);
    },
    colorScaling: function() {
      return this.scaling.color.active;
    },
    sizeScaling: function() {
      return this.scaling.size.active;
    },
    filtering: function() {
      return this.configuration.filter.show;
    },
    ...mapState(["configuration"]),
  },
  methods: {
    resize() {
      const { pointer } = this.$refs;
      gsap.to(pointer, {
        duration: this.scaling.size.duration,
        attr: { r: this.getScaledRadius(this.duration) },
        ease: "easeOut",
      });
    },
    recolor() {
      const { pointer } = this.$refs;
      gsap.to(pointer, {
        duration: this.scaling.color.duration,
        attr: { fill: this.getScaledColor(this.duration) },
        ease: "easeOut",
      });
    },
    getScaledRadius: function(duration) {
      let Rmax = this.scaling.size.maxRadius;
      let Rmin = this.scaling.size.minRadius;
      let Dmax = this.Dmax;
      let Dmin = this.Dmin;
      if (this.scaling.size.active) {
        // linear squishing
        let newR = Rmin + (Rmax - Rmin) * ((duration - Dmin) / (Dmax - Dmin));
        // log squishing tbd
        return newR;
      } else {
        return Rmin;
      }
    },
    getScaledColor: function(duration) {
      // Dmax stands for Max Duration
      let Dmax = this.Dmax;
      let Dmin = this.Dmin;
      // mix is a number from 0 to 1
      let mix = (duration - Dmin) / (Dmax - Dmin);
      // if color scaling is active
      if (this.scaling.color.active) {
        // get each color from state, squish into 0..1 range and inverse color compression
        let c1 = this.rgbStringToArray(this.scaling.color.maxColor)
          .map((e) => parseInt(e) / 255)
          .map((e) => this.invertCompression(e, this.scaling.color.algorithm));
        let c2 = this.rgbStringToArray(this.scaling.color.minColor)
          .map((e) => parseInt(e) / 255)
          .map((e) => this.invertCompression(e, this.scaling.color.algorithm));

        // mix both colors together and produce a resulting color 'r'
        let r1 = [];
        c1.forEach((e, i) => {
          r1.push(e * (1 - mix) + c2[i] * mix);
        });

        // reapply compression to r and expand into 0..255 range
        r1 = r1.map(
          (e) => this.reapplyCompression(e, this.scaling.color.algorithm) * 255
        );

        // return as rgb string
        return `rgb(${r1})`;
      } else {
        return this.configuration.default.color;
      }
    },
  },
  watch: {
    filtering() {
      const { pointer } = this.$refs;
      console.log(this.filter.show);
      if (this.filter.show.includes(this.destination.id)) {
        gsap.to(pointer, {
          duration: this.filter.duration,
          attr: { r: this.configuration.default.radius },
          ease: this.filter.easin,
        });
      } else {
        gsap.to(pointer, {
          duration: this.filter.duration,
          attr: { r: this.configuration.filter.hiddenRadius },
          ease: this.filter.easout,
        });
      }
    },
    sizeScaling() {
      this.resize();
    },
    colorScaling() {
      this.recolor();
    },
    durationsChange() {
      this.resize();
      this.recolor();
    },
  },
  mounted() {
    this.resize();
    this.recolor();
  },
};
</script>

<style></style>

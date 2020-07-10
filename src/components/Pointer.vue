<template>
  <circle
    ref="pointer"
    :cx="destination.lon"
    :cy="destination.lat"
    :r="destination.radius"
    :fill="this.defaultColor"
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
      return this.scaling.size;
    },
    durationsChange: function() {
      return this.$store.getters.durations.reduce((total, current) => {
        return current + total;
      }, 0);
    },
    ...mapState([
      "maxRadius",
      "minRadius",
      "maxColor",
      "minColor",
      "showOnly",
      "animationDuration",
      "scaling",
      "colorScalingAlgorithm",
      "defaultColor",
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
    getScaledColor: function(duration) {
      // Dmax stands for Max Duration
      let Dmax = this.scaling.Dmax;
      let Dmin = this.scaling.Dmin;
      let mix = (duration - Dmin) / (Dmax - Dmin);
      if (this.colorScaling) {
        // console.log(` `);
        // console.log(` `);
        // console.log(`duration: ${duration}`);
        // console.log(`Dmin: ${Dmin}`);
        // console.log(`Dmax: ${Dmax}`);
        // console.log(`mix: ${mix}`);
        let c1 = this.rgbStringToArray(this.maxColor)
          .map((e) => parseInt(e) / 255)
          .map((e) => this.invertCompression(e, this.colorScalingAlgorithm));
        let c2 = this.rgbStringToArray(this.minColor)
          .map((e) => parseInt(e) / 255)
          .map((e) => this.invertCompression(e, this.colorScalingAlgorithm));
        // console.log(`c1 ${this.maxColor}`);
        // console.log(`-   c1 inverted: ${c1}`);
        // console.log(`c2 ${this.minColor}`);
        // console.log(`-   c2 inverted: ${c2}`);
        let r1 = [];
        c1.forEach((e, i) => {
          r1.push(e * (1 - mix) + c2[i] * mix);
        });
        // console.log(`r1 mixed: ${r1}`);
        r1 = r1.map(
          (e) => this.reapplyCompression(e, this.colorScalingAlgorithm) * 255
        );
        // console.log(`r1 compressed:(${r1})`);
        return `rgb(${r1})`;
      } else {
        return this.defaultColor;
      }
    },
    rgbStringToArray(string) {
      return string
        .slice(0, -1)
        .split("(")[1]
        .split(",");
    },
    invertCompression(num, blending) {
      switch (blending) {
        case "squared":
          return Math.pow(num, 2);
        case "gamma":
          if (num > 0.04045) {
            return Math.pow((num + 0.055) / 1.055, 2.4);
          } else {
            return num / 12.92;
          }
        default:
          return num;
      }
    },
    reapplyCompression(num, blending) {
      switch (blending) {
        case "squared":
          return Math.pow(num, 0.5);
        case "gamma":
          if (num > 0.0031308) {
            return 1.055 * Math.pow(num, 1 / 2.4) - 0.055;
          } else {
            return num * 12.92;
          }
        default:
          return num;
      }
    },
    resize() {
      const { pointer } = this.$refs;
      let newR = this.getScaledRadius(this.destination.duration);
      gsap.to(pointer, {
        duration: this.animationDuration,
        attr: { r: newR },
        ease: "easeOut",
      });
    },
    recolor() {
      const { pointer } = this.$refs;
      let newC = this.getScaledColor(this.destination.duration);
      gsap.to(pointer, {
        duration: 2,
        attr: { fill: newC },
        ease: "easeOut",
      });
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
};
</script>

<style></style>

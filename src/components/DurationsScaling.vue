<template>
  <form>
    <label for="">Scale destinations using: </label>
    <input
      type="checkbox"
      id="color"
      v-model="scaling.color"
      @change="update"
    />
    <label for="color">color</label>
    <input type="checkbox" id="size" v-model="scaling.size" @change="update" />
    <label for="size">size</label>
  </form>
</template>

<script>
export default {
  name: "DurationsScaling",
  data() {
    return {
      scaling: {
        color: false,
        size: false,
        Dmax: 0,
        Dmin: 0,
      },
    };
  },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
  },
  methods: {
    update: function() {
      let Dmax = Math.max(
        ...this.activeDestinations.map((e) => parseInt(e.duration))
      );
      let Dmin = Math.min(
        ...this.activeDestinations.map((e) => parseInt(e.duration))
      );
      this.scaling.Dmax = Dmax;
      this.scaling.Dmin = Dmin;
      this.$store.commit("scalingProps", this.scaling);
    },
  },
  mounted() {
    this.update();
  },
};
</script>

<style scoped></style>

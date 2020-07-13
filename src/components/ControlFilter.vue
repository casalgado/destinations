<template>
  <form>
    <label for="durationFilter" id="dflabel"
      >Show me destinations I have visited for:</label
    >
    <select
      name="durationFilter"
      id="dfilter"
      @change="applyFilter"
      v-model="direction"
    >
      <option v-for="o in filterOptions" :key="o.value" :value="o.value">
        {{ o.text }}
      </option>
    </select>
    <select
      name="durationOptions"
      id="doptions"
      @change="applyFilter"
      v-model="range"
    >
      <option v-for="o in durationOptions" :key="o.value" :value="o.value">
        {{ o.text }}
      </option>
    </select>
  </form>
</template>

<script>
export default {
  name: "ControlFilter",
  data() {
    return {
      direction: ">=",
      range: 0,
    };
  },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
    filterOptions: function() {
      return [
        { value: ">=", text: "more than" },
        { value: "<", text: "less than" },
        { value: "=", text: "around" },
      ];
    },
    durationOptions: function() {
      return [
        { value: 0, text: "..." },
        { value: 1, text: "1 day" },
        { value: 7, text: "1 week" },
        { value: 30, text: "1 month" },
        { value: 90, text: "3 months" },
        { value: 180, text: "6 months" },
        { value: 365, text: "1 year" },
        { value: 730, text: "2 years" },
        { value: 1825, text: "5 years" },
        { value: 3650, text: "10 years" },
        { value: 7300, text: "20 years" },
      ];
    },
  },
  methods: {
    applyFilter: function() {
      let shown;
      switch (this.direction) {
        case ">=":
          shown = this.activeDestinations
            .filter((e) => e.duration >= this.range)
            .map((e) => e.id);
          break;
        case "<":
          shown = this.activeDestinations
            .filter((e) => e.duration < this.range)
            .map((e) => e.id);
          break;

        default:
          break;
      }

      this.$store.commit("filter", shown);
    },
  },
};
</script>

<style scoped>
#dflabel {
  padding-right: 5px;
}

select {
  -webkit-appearance: button;
  background-color: var(--color-background);
  color: var(--color-neutral);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  border: none;
  position: relative;
  top: 1px;
}

option {
  text-align: center;
}
</style>

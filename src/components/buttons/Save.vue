<template>
  <button @click="save">
    save
  </button>
</template>

<script>
export default {
  name: "save",
  methods: {
    save: function() {
      const parsed = JSON.stringify(this.$store.state.destinations);
      const config = JSON.stringify({ maxR: 12, minR: 10 });
      localStorage.setItem("destinations", parsed);
      localStorage.setItem("configuration", config);
    },
  },
};
</script>

<style></style>

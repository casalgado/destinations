<template>
  <button @click="save">
    save
  </button>
</template>

<script>
export default {
  name: "ActionSave",
  methods: {
    save: function() {
      const parsed = JSON.stringify(this.$store.state.destinations);
      const config = JSON.stringify(this.$store.state.configuration);
      localStorage.setItem("destinations", parsed);
      localStorage.setItem("configuration", config);
    },
  },
};
</script>

<style></style>

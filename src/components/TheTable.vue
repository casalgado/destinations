<template>
  <div id="table-container">
    <button @click="addDestination">
      add destination
    </button>
    <table>
      <tr>
        <th @click="sortBy('city')">city</th>
        <th @click="sortBy('country')">CO</th>
        <th @click="sortBy('arrival')">arrival</th>
        <th @click="sortBy('departure')">departure</th>
        <th @click="sortBy('duration')">duration</th>
      </tr>
      <TheTableRow
        v-for="destination in activeDestinations"
        :key="destination.id"
        :id="destination.id"
        :populate="destination"
      />
    </table>
  </div>
</template>
<script>
import TheTableRow from "./TheTableRow";
export default {
  name: "TheTable",
  components: { TheTableRow },
  data() {
    return {
      direction: {
        city: true,
        arrival: true,
        departure: true,
        duration: true,
        country: true,
      },
    };
  },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
  },
  methods: {
    addDestination() {
      this.$store.commit("addDestination");
    },
    removeDestination(payload) {
      this.$store.commit("removeDestination", payload);
    },
    sortBy: function(field) {
      this.direction[field] = !this.direction[field];
      this.$store.commit("sortBy", {
        field: field,
        direction: this.direction[field],
      });
    },
  },
};
</script>

<style scoped>
table,
th {
  border: 1px solid gray;
  border-collapse: collapse;
}
table {
  margin: 0 auto;
  border-right: none;
  border-bottom: none;
  color: var(--color-neutral);
}
</style>

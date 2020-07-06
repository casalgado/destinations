<template>
  <div id="table-container">
    <button @click="addDestination">
      add destination
    </button>
    <button @click="save">
      save
    </button>
    <table>
      <tr>
        <th @click="sortBy('city')">city</th>
        <th @click="sortBy('country')">CO</th>
        <th @click="sortBy('arrival')">arrival</th>
        <th @click="sortBy('departure')">departure</th>
        <th @click="sortBy('duration')">duration</th>
      </tr>
      <CityInput
        v-for="d in activeDestinations"
        :key="d.id"
        :id="d.id"
        :populate="d"
        @remove-field="removeDestination"
      />
    </table>
  </div>
</template>
<script>
import CityInput from "../components/CityInput";
export default {
  name: "CityTable",
  components: { CityInput },
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
    save: function() {
      const parsed = JSON.stringify(this.activeDestinations);
      localStorage.setItem("destinations", parsed);
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
button {
  margin: 10px;
}
</style>

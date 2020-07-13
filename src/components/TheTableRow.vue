<template>
  <tr>
    <td>
      <input type="text" v-model="d.city" @change="onChange('location')" />
    </td>
    <td>
      <input type="text" v-model="d.country" @change="onChange('location')" />
      <!--
      <select name="" v-model="d.country" @change="onChange('location')">
        <option v-for="c in countries" :key="c.value" :value="c.value">
          {{ c.text }}
        </option>
      </select>
      -->
    </td>
    <td>
      <input type="date" v-model="d.arrival" @change="onChange('date')" />
    </td>
    <td>
      <input type="date" v-model="d.departure" @change="onChange('date')" />
    </td>
    <td>
      <input
        type="number"
        v-model="d.duration"
        @change="onChange('duration')"
      />
    </td>
    <td>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        id="clear"
        @click="remove"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </td>
  </tr>
</template>

<script>
import moment from "moment";
import { countries } from "@/countries";
export default {
  name: "TheTableRow",
  props: {
    id: Number,
    populate: Object,
  },
  data() {
    return {
      countries: [],
      d: {
        city: "",
        arrival: "",
        departure: "",
        duration: 1,
        lon: 0,
        lat: 0,
        country: "",
      },
    };
  },
  mounted() {
    if (this.populate) {
      this.d = { ...this.populate };
    }
    this.countries = countries;
  },
  computed: {
    thisDestination: function() {
      return { ...this.$store.getters.destination(this.id) };
    },
  },
  watch: {
    thisDestination() {
      this.d = this.thisDestination;
    },
  },
  methods: {
    remove: function() {
      this.$store.commit("removeDestination", { id: this.id });
    },
    onChange: function(field) {
      let updated = { ...this.d };
      switch (field) {
        case "date":
          updated.duration =
            moment(this.d.departure).diff(moment(this.d.arrival), "days") || "";
          break;
        case "duration":
          updated.departure = moment(this.d.arrival)
            .add(this.d.duration, "days")
            .format("YYYY-MM-DD");
          break;
        default:
          break;
      }
      this.$store.dispatch("UpdateDestination", updated);
    },
  },
};
</script>

<style scoped>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}

input {
  border: none;
  background-color: var(--color-background);
  color: var(--color-neutral);
}

input[type="text"],
input[type="number"] {
  height: 20px;
}

td {
  border: 1px solid gray;
  border-collapse: collapse;
  padding: 2px;
}

td:last-child {
  border: none;
  position: absolute;
}

#clear {
  fill: lightgray;
  cursor: pointer;
}
#clear:hover {
  fill: rgb(163, 16, 16);
}
</style>

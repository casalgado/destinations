<template>
  <tr>
    <td>
      <input type="text" v-model="d.city" @change="onChange('city')" />
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
import axios from "axios";
export default {
  name: "CityInput",
  props: {
    id: Number,
    populate: Object,
  },
  data() {
    return {
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
      const p = this.populate;
      this.d.city = p.city;
      this.d.arrival = p.arrival;
      this.d.departure = p.departure;
      this.d.duration = p.duration;
      this.d.lon = p.lon;
      this.d.lat = p.lat;
    }
  },
  methods: {
    remove: function() {
      this.$emit("remove-field", { id: this.id });
    },
    onChange: function(field) {
      let arr = this.d.arrival || null;
      let dep = this.d.departure || null;
      let dur = this.d.duration || 1;

      // update field is repeated below because in city it is async
      switch (field) {
        case "date":
          this.d.duration = moment(dep).diff(moment(arr), "days") || "";
          this.$store.commit("updateField", { d: this.d, id: this.id });
          break;
        case "duration":
          this.d.departure = moment(arr)
            .add(dur, "days")
            .format("YYYY-MM-DD");
          console.log(this.d);
          this.$store.commit("updateField", { d: this.d, id: this.id });
          break;
        case "city":
          console.log(this.d);
          this.findCoordinates(this.d.city).then((e) => {
            console.log(e);
            this.d.lon = this.lonScale(e.lon);
            this.d.lat = this.latScale(e.lat);
            this.d.country = e.country;
            this.$store.commit("updateField", { d: this.d, id: this.id });
          });
          console.log(this.d);

          break;
        default:
          break;
      }

      console.log("afterswitch");
    },
    latScale: function(coord) {
      let maxdeg = 90;
      let maxpix = 300;
      coord = parseFloat(coord);
      if (coord < 0) {
        return maxpix + (Math.abs(coord) / maxdeg) * maxpix;
      } else {
        return maxpix - (coord / maxdeg) * maxpix;
      }
    },
    lonScale: function(coord) {
      let maxdeg = 180;
      let maxpix = 600;
      coord = parseFloat(coord);
      if (coord > 0) {
        return maxpix + (coord / maxdeg) * maxpix;
      } else {
        return maxpix - (Math.abs(coord) / maxdeg) * maxpix;
      }
    },
    findCoordinates: function(city) {
      return new Promise((resolve) => {
        axios({
          method: "GET",
          url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
            "x-rapidapi-key":
              "a4155f4872msh83b76cd21659288p1f840fjsnae620982cab8",
            useQueryString: true,
          },
          params: {
            name: city,
          },
        })
          .then((response) => {
            let r = response.data;
            let obj = {
              lat: r.lat,
              lon: r.lon,
              country: r.country,
            };
            resolve(obj);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
  },
};
</script>

<style scoped>
input {
  border: none;
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

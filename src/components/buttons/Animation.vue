<template>
  <button @click="animate">{{ btnText }}</button>
</template>

<script>
import moment from "moment";
export default {
  name: "Animation",
  data() {
    return {
      btnText: "animate",
      active: true,
    };
  },
  computed: {
    arrivals: function() {
      return this.$store.getters.activeDestinations.map((e) => {
        return {
          arrival: moment(e.arrival),
          id: e.id,
        };
      });
    },
  },
  methods: {
    animate: function() {
      // function declaration to be used below
      function getMin(min, current) {
        if (min < current) {
          return min;
        } else {
          return current;
        }
      }

      function getMax(min, current) {
        if (min > current) {
          return min;
        } else {
          return current;
        }
      }

      if (this.active) {
        // deactivate button while animation is running
        this.active = false;

        // hide all destinations
        let shown = [];
        this.$store.commit("showOnly", shown);

        // find earliest arrival date to set as start of animation
        let earliestArrival = this.arrivals
          .map((e) => e.arrival)
          .reduce(getMin, moment().format("YYYY-MM-DD"));

        // get latest arrival date to end animation
        let latestArrival = this.arrivals
          .map((e) => e.arrival)
          .reduce(getMax, moment("1900-01-01").format("YYYY-MM-DD"));

        // set animation to start 6 months before earliest arrival
        let current = moment(earliestArrival).subtract(6, "months");

        // set period per interval iteration
        let period = "month";

        // set seconds per interval iteration
        let seconds = 200;

        // create interval
        let int = setInterval(
          function() {
            this.btnText = current.format("MMM YYYY");
            this.arrivals.forEach((e) => {
              if (e.arrival.isSame(current, period)) {
                shown.push(e.id);
                this.$store.commit("showOnly", shown);
              }
            });
            // clear interval when current = latest
            if (current.isSame(latestArrival, period)) {
              this.btnText = "again!";
              this.active = true;
              clearInterval(int);
            }
            current = current.add(1, period);
          }.bind(this),
          seconds
        );
      }
    },
  },
};
</script>

<style></style>

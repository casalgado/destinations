<template>
  <div class="field">
    <div id="map-container">
      <img id="map-background" src="@/assets/world.svg" alt="" />

      <div id="map">
        <Pointer
          v-for="dest in activeDestinations"
          :key="dest.id"
          :destination="dest"
        />
      </div>
    </div>
    <button @click="animate">animate</button>
    <DurationsFilter />
    <CityTable />
    <ul class="print">
      <li v-for="a in activeDestinations" :key="a.id">{{ a }}</li>
    </ul>
    <ul class="print">
      <li v-for="a in allDestinations" :key="a.id">{{ a }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import { gsap } from "gsap";
import { mapState } from "vuex";
import Pointer from "../components/Pointer.vue";
import CityTable from "../components/CityTable.vue";
import DurationsFilter from "../components/DurationsFilter.vue";

export default {
  name: "Field",
  components: { CityTable, DurationsFilter, Pointer },
  created() {
    if (localStorage.getItem("destinations")) {
      try {
        let destinations = JSON.parse(localStorage.getItem("destinations"));
        this.$store.commit("loadState", destinations);
      } catch (e) {
        console.log(JSON.parse(localStorage.getItem("destinations")));
      }
    }
  },
  computed: {
    activeDestinations: function() {
      return this.$store.getters.activeDestinations;
    },
    durations: function() {
      return this.$store.getters.durations;
    },
    allDestinations: function() {
      return this.$store.state.destinations;
    },
    ...mapState(["showOnly"]),
  },
  methods: {
    animate: function() {
      console.log(this.showOnly);
      this.activeDestinations.forEach((d) => {
        if (this.showOnly.includes(d.id)) {
          gsap.to(`#id${d.id}`, {
            duration: 5,
            ease: "easeInOut",
            width: "8",
            height: "8",
            left: "-=4",
            top: "-=4",
          });
        }
      });
    },
  },
};
</script>
<style scoped>
#test {
  z-index: 999;
}

#tanim {
  position: absolute;
  top: 200px;
  left: 400px;
  background-color: red;
  width: 100px;
  height: 100px;
  border-radius: 999px;
}

#map-container {
  position: relative;
  width: 1200px;
  height: 600px;
  margin: 0 auto;
}

#map-background {
  width: 100%;
  padding: 0px;
  margin: 0px;
  position: absolute;
  top: 0;
  left: 0;
}

#map {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.print {
  margin-top: 25px;
}
</style>

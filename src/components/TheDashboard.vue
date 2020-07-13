<template>
  <div>
    <TheMap />
    <ControlFilter />
    <ControlScaling />
    <ActionAnimation />
    <ActionSave />
    <TheTable />
  </div>
</template>

<script>
import TheMap from "./TheMap.vue";
import ControlFilter from "./ControlFilter.vue";
import ControlScaling from "./ControlScaling.vue";
import ActionAnimation from "./ActionAnimation.vue";
import ActionSave from "./ActionSave.vue";
import TheTable from "./TheTable.vue";
export default {
  name: "TheDashboard",
  data() {
    return {
      state: {
        destinations: null,
        configuration: null,
      },
    };
  },
  components: {
    TheMap,
    ControlFilter,
    ControlScaling,
    ActionAnimation,
    ActionSave,
    TheTable,
  },
  created() {
    var t = true;
    console.log(localStorage.getItem("destinations"));
    console.log(localStorage.getItem("configuration"));
    if (localStorage.getItem("destinations")) {
      try {
        this.state.destinations = JSON.parse(
          localStorage.getItem("destinations")
        );
      } catch (e) {
        console.log(JSON.parse(localStorage.getItem("destinations")));
      }
    }
    if (t) {
      try {
        this.state.configuration = JSON.parse(
          localStorage.getItem("configuration")
        );
      } catch (e) {
        console.log(JSON.parse(localStorage.getItem("configuration")));
      }
    }
    console.log(this.state);
    this.$store.commit("loadState", this.state);
  },
};
</script>
<style scoped></style>

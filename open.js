/** 
- handle errors in places api request
- clean scaling props mutation
- case around in durationsFilter
- clean repetition Dmin - Dmax scaling props + setDminMax
- animation configuration state object
  animationConfig: {
    period: '',
    timeframe: 0,
  }
- test all possible cases at onChange in InputRow
- change components to multi-word components, vue styleguide
- change 'buttons' dir to 'actions' dir, add Base, App, or V to component names in this dir
- Components that should only ever have a single active instance should begin with 
  the The prefix, to denote that there can be only one. (table, dashboard)
- change InputRow component to TheTableInputRow
- remove nested directories, show relationships with component names
- modify components according to Component/instance options order in https://vuejs.org/v2/style-guide/

<ul class="print">
  <li v-for="a in activeDestinations" :key="a.id">{{ a }}</li>
</ul>
<ul class="print">
  <li v-for="a in allDestinations" :key="a.id">{{ a }}</li>
</ul>

*/

let o = {
  DurationFilter: {
    get: activeDestinations,
    commits: filter,
  },
  DurationScaling: {
    get: activeDestinations,
    commits: ScalingProps,
  },
  Animation: {
    get: activeDestinations,
    commits: filter,
  },
  Save: {
    get: null,
    commit: null,
  },
  Table: {
    get: activeDestinations,
    commit: [addDestination, SortBy],
  },
  InputRow: {
    get: ThisDestination,
    commit: RemoveDestination,
    dispatch: UpdateDestination,
  },
  Map: {
    get: activeDestinations,
    commit: null,
  },
};

let config = {
  animation: {
    active: false,
    period: "period",
    timeframe: 0,
  },
  scaling: {
    size: {
      active: false,
      algorith: "",
      minRadius: 0,
      maxRadius: 0,
      duration: 0,
    },
    color: {
      active: false,
      algorith: "",
      minColor: "rgb",
      maxColor: "rgb",
      duration: 0,
    },
    minDuration: 0,
    maxDuration: 0,
  },
};

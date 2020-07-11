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
    commits: ShowOnly,
  },
  DurationScaling: {
    get: activeDestinations,
    commits: ScalingProps,
  },
  Animation: {
    get: activeDestinations,
    commits: ShowOnly,
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

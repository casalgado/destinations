<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

:root {
  --color-background: #202020;
  --color-neutral: #eeeeee;
}
body {
  color: var(--color-neutral);
  background-color: var(--color-background);
}

*:active,
*:focus {
  -moz-outline-style: none;
  outline-style: none;
  outline: none;
}
</style>

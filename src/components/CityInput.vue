<template>
  <tr>
    <td>
      <input type="text" v-model="city" />
    </td>
    <td>
      <input type="date" v-model="arrival" />
    </td>
    <td>
      <input type="date" v-model="departure" />
    </td>
    <td>
      <input type="number" v-model="duration" />
    </td>
    <td>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        id="clear"
      >
        <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        />
      </svg>
    </td>
  </tr>
</template>

<script>
export default {};
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
  border: 1px solid black;
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

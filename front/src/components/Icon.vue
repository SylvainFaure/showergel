<template>
  <span class="h-8 w-8 inline-flex justify-center items-center">
    <i :class="`mdi mdi-${name}`"></i>
  </span>
</template>

<script>
export default {
  props: {
    name: String,
  },
};
</script>

<style>
</style>
<script setup lang="ts">

const envName = import.meta.env.VITE_ENV_NAME;
</script>

<template>
  <div class="home">
    <h1>Welcome to the Home Page - {{ envName }}</h1>
    <p>This is a placeholder for the home page content.</p>
  </div>
</template>

<style scoped lang="scss">

</style>

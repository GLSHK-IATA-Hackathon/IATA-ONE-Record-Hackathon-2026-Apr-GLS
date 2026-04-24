<script setup lang="ts">

</script>

<template>
<div class="loading-wrapper">
  <div class="loading-wrapper__spinner"></div>
  <slot></slot>
</div>
</template>

<style scoped lang="scss">
.loading-wrapper {
  flex: 1;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading-wrapper__spinner {
    width: 50px;
    height: 50px;
    border: 2px solid $gls-color-23;
    border-top: 2px solid $gls-color-28;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 10px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}
</style>
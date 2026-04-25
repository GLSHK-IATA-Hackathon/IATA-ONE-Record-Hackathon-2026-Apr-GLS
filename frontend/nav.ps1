$navComponent = @"
<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="nav-bar">
    <router-link to="/shipment-list" custom v-slot="{ navigate }">
      <span @click="navigate">Shipment List</span>
    </router-link>
    <router-link to="/dashboard" custom v-slot="{ navigate }">
      <span @click="navigate">Cargo iQ</span>
    </router-link>
    <router-link to="/carrier-code" custom v-slot="{ navigate }">
      <span @click="navigate">Carrier code Maintenance</span>
    </router-link>
    <span>Terminal</span>
    <span>Airline</span>
  </nav>
</template>

<style scoped>
.nav-bar {
  background-color: #1A8242;
  color: white;
  display: flex;
  padding: 0 30px;
  font-family: 'Source Sans Pro', sans-serif;
}
.nav-bar span {
  cursor: pointer;
  padding: 24px 19px;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  flex: 1;
}
</style>
"@
Set-Content -Path "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\libs\component\common\AppNavBar.vue" -Value $navComponent -Encoding UTF8

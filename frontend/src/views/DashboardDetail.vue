<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';

const route = useRoute();
const router = useRouter();

const awb = ref(route.query.awb || '');
const loid = ref(route.query.loid || '');

const goBack = () => {
  router.push('/dashboard');
};
</script>

<template>
  <div class="dashboard-page">
    <AppHeader />

    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <router-link to="/dashboard" custom v-slot="{ navigate }">
        <span @click="navigate">Shipment List</span>
      </router-link>
      <router-link to="/carrier-code" custom v-slot="{ navigate }">
        <span @click="navigate">Carrier code Maintenance</span>
      </router-link>
      <span>Terminal</span>
      <span>Airline</span>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; border-bottom: 2px solid #1A8242; padding-bottom: 10px;">
        <h2 class="page-title" style="color: #1A8242; font-weight: bold; font-size: 24px; margin: 0;">Shipment List - Detail</h2>
        <button @click="goBack" class="btn" style="background-color: #d1d5db; color: #333; padding: 6px 16px; border: none; border-radius: 4px; cursor: pointer;">
          Back to List
        </button>
      </div>

      <section class="card" style="background: #fff; border: 1px solid #eaeaea; border-radius: 4px; padding: 30px;">
        <div style="display: flex; gap: 40px;">
          <div style="flex: 1;">
            <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">Air Waybill Number</p>
            <div style="font-size: 20px; font-weight: bold; color: #333;">{{ awb || 'N/A' }}</div>
          </div>
          <div style="flex: 2;">
            <p style="color: #666; font-size: 14px; margin: 0 0 5px 0;">1R (ONE Record) LO</p>
            <div style="font-family: monospace; font-size: 18px; color: #333; word-break: break-all; background: #f4f6f8; padding: 8px 12px; border-radius: 4px;">
              {{ loid || 'N/A' }}
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.dashboard-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Nav Bar */
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

/* Main Content */
.main-content {
  flex: 1;
  padding: 30px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}
</style>

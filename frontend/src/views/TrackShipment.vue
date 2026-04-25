<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppNavBar from '@/libs/component/common/AppNavBar.vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';

const route = useRoute();
const awb = ref(route.query.awb || '160-55554444');
const loid = ref(route.query.loid || '3c8e4f1a-b615-492c-ad2f-e8b91a78370f');   
const activeTab = ref('Temperature Log');

const logs = [
  { desc: "[NRT] ULD Temperature Alert", time: "2026-06-03 15:49:00", remark: "3°C Exceed control temperature range +2°C to +8°C" },
  { desc: "[NRT] Normal", time: "2026-06-03 14:00:00", remark: "In range" },
  { desc: "[NRT] Cargo Accepted", time: "2026-06-03 12:30:00", remark: "" }
];
</script>

<template>
  <div class="dashboard-page">
    <AppHeader />
    <AppNavBar />

    <main class="main-content">
      <div class="page-header">
        <h2 class="page-title">Track Shipment</h2>
      </div>
      <div class="one-record-badge">
        <img src="../assets/1R Logo.png" alt="IATA ONE Record" class="badge-icon" />
        <span class="badge-text" style="color: #1d4ed8; padding: 4px 12px; background: #eef2ff; border-radius: 12px; font-weight: 600; font-size: 13px;">Backed by ONE Record</span>
      </div>

      <div class="layout-container">

        <!-- Left Panel -->
        <div class="left-panel">
            <div class="info-row">
                <span class="info-label">AWB Number</span>
                <span class="info-val">{{ awb }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">One Record LO ID</span>
                <span class="info-val loid-val">{{ loid }}</span>
            </div>

            <div class="divider"></div>

            <h3 class="section-title">Shipment Status</h3>
            <div class="info-row status-row">
                <span class="info-label">Alert Status</span>
                <span class="info-val" style="color: #ef4444;">Critical Alert</span>
            </div>

            <div class="divider"></div>

            <h3 class="section-title">Temperature Control</h3>     
            <div class="info-row">
                <span class="info-label">Requirement</span>
                <span class="info-val text-gray">+2°C to +8°C</span>
            </div>
            <div class="info-row">
                <span class="info-label">Current reading</span>
                <span class="info-val" style="color: #ef4444; font-weight: bold;">+11°C</span>
            </div>

            <div class="divider"></div>

            <h3 class="section-title">Location</h3>
            <div class="info-row">
                <span class="info-label">Check Point</span>
                <span class="info-val text-gray">NRT (Narita)</span>
            </div>
            <div class="info-row">
                <span class="info-label">ULD</span>
                <span class="info-val text-gray">AKE12345JL</span>
            </div>

        </div>

        <!-- Right Panel -->
        <div class="right-panel">
            <div class="alert-banner">
                <svg style="width: 18px; height: 18px; margin-right: 8px;" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <div style="flex: 1;">
                   <strong style="display: block; margin-bottom: 2px;">Temperature Alert Detected</strong>
                   <span style="font-size: 12px;">Immediate action requested for ULD AKE12345JL at NRT. Reading exceeded bounds by +3°C.</span>
                </div>
            </div>

            <div class="tabs-container">
                <button :class="['tab-btn', { active: activeTab === 'Temperature Log' }]" @click="activeTab='Temperature Log'">Temperature Log</button>
                <button :class="['tab-btn', { active: activeTab === 'Action History' }]" @click="activeTab='Action History'">Action History</button>
            </div>

            <div class="table-container">
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th style="width: 35%">Event</th>
                            <th>Date Time</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(log, idx) in logs" :key="idx" :class="{ 'alt-row': idx % 2 === 0 }">
                            <td :style="idx === 0 ? 'color: #ef4444; font-weight: bold;' : 'font-weight: 500; color: #444;'">{{ log.desc }}</td>
                            <td class="text-gray">{{ log.time }}</td>
                            <td :style="idx === 0 ? 'color: #ef4444;' : 'color: #666;'">{{ log.remark }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>

      </div>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* Inherit DashboardDetail styles, add specific alert banner styles */
.dashboard-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 30px 40px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 12px;
  border-bottom: 2px solid #2E8B57;
  padding-bottom: 8px;
}

.one-record-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.badge-icon {
  height: 28px;
  object-fit: contain;
}

.page-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 20px;
  color: #2E8B57;
  font-weight: bold;
}

.layout-container {
  display: flex;
  gap: 30px;
  align-items: flex-start;
}

/* Left Panel */
.left-panel {
  flex: 0 0 320px;
  border: 1px solid #eaeaea;
  padding: 20px;
  border-radius: 4px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 11px;
}

.status-row {
  margin-bottom: 10px;
}

.info-label {
  color: #666;
  font-weight: 500;
}

.info-val {
  color: #333;
  font-weight: 600;
  text-align: right;
  max-width: 150px;
}

.loid-val {
  word-break: break-all;
  font-size: 10px;
  color: #777;
  font-family: monospace;
}

.text-gray {
  color: #666;
  font-weight: 500;
}

.divider {
  height: 1px;
  background-color: #f0f0f0;
  margin: 20px 0;
}

.section-title {
  font-size: 11px;
  color: #555;
  font-weight: bold;
  margin: 0 0 16px 0;
}

/* Right Panel */
.right-panel {
  flex: 1;
}

.alert-banner {
  display: flex;
  align-items: center;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 12px 16px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.tabs-container {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 16px;
  background: #fff;
  border: 1px solid #ddd;
  color: #555;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background-color: #3b9b6d;
  color: #fff;
  border-color: #3b9b6d;
  font-weight: bold;
}

.table-container {
  margin-bottom: 20px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
}

.detail-table th {
  text-align: left;
  padding: 12px;
  color: #333;
  font-weight: bold;
  border-bottom: 1px solid #eaeaea;
}

.detail-table td {
  padding: 12px;
  border-bottom: 1px solid #f9f9f9;
}

.alt-row {
  background-color: #f4f8f9;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppNavBar from '@/libs/component/common/AppNavBar.vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, TitleComponent, TooltipComponent, MarkAreaComponent, MarkLineComponent } from "echarts/components";
import VChart from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  MarkAreaComponent,
  MarkLineComponent
]);

const route = useRoute();
const awb = ref(route.query.awb || '618 - 82491603');
const activeTab = ref(route.query.tab ? String(route.query.tab) : 'ULD Sensors');

const shipmentLogs = [
  { desc: "[NRT] ULD Temperature Alert", time: "2026-06-03 15:49:00", remark: "3°C Exceed control temperature range +2°C to +8°C" },
  { desc: "[NRT] Normal", time: "2026-06-03 14:00:00", remark: "In range" },
  { desc: "[NRT] Cargo Accepted", time: "2026-06-03 12:30:00", remark: "" }
];

const sensorHistoryLogs = [
  { timeDesc: "30 Mar 26", time: "15:21", temp: "-12.1°C", status: "Normal" },
  { timeDesc: "30 Mar 26", time: "14:16", temp: "-12.1°C", status: "Normal" },
  { timeDesc: "30 Mar 26", time: "3:10", temp: "-13.4°C", status: "Normal" },
  { timeDesc: "30 Mar 26", time: "2:23", temp: "-13.2°C", status: "Normal" },
  { timeDesc: "28 Mar 26", time: "21:08", temp: "-12.9°C", status: "Normal" }
];

const chartOption = ref({
  grid: { top: 60, right: 30, bottom: 20, left: 40, containLabel: false },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'],
    axisLine: { symbol: ['none', 'arrow'], symbolSize: [8, 12], lineStyle: { color: '#333', width: 2 } },
    axisTick: { show: false },
    axisLabel: {
      show: true,
      interval: 3,
      color: '#333',
      fontWeight: 'bold',
      margin: 12
    },
    splitLine: { show: true, interval: 3, lineStyle: { type: 'dashed', color: '#999', width: 1.5 } }
  },
  yAxis: {
    type: 'value',
    min: 20,
    max: 42,
    axisLine: { show: true, symbol: ['none', 'arrow'], symbolSize: [8, 12], lineStyle: { color: '#333', width: 2 } },
    axisTick: { show: false },
    axisLabel: {
      formatter: (value: number) => {
        if (value === 30 || value === 35) return String(value);
        return '';
      },
      color: '#333',
      fontWeight: 'bold',
      margin: 12
    },
    splitLine: { show: false } 
  },
  series: [
    {
      data: [21.5, 21, 21.8, 32, 32.5, 34, 33, 37, 36.5, 38],
      type: 'line',
      smooth: true,
      symbol: 'none',
      itemStyle: { color: '#2b4d8a' },
      lineStyle: { width: 3 },
      markArea: {
        data: [
          [
            { xAxis: '09:00', itemStyle: { color: '#f0f9f4' } }, // light green
            { xAxis: '15:00' }
          ],
          [
            { xAxis: '15:00', itemStyle: { color: '#fdf0f0' } }, // light red
            { xAxis: '18:00' }
          ]
        ]
      },
      markLine: {
        symbol: 'none',
        silent: true,
        label: { show: false },
        lineStyle: { type: 'dashed', color: '#333', width: 1.5, opacity: 0.8 },
        data: [
          { yAxis: 30 },
          { yAxis: 35 }
        ]
      }
    }
  ]
});
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

      <div class="header-info-container">
        <div class="awb-section">
          <h2>{{ awb }}</h2>
          <div class="subtitle">
            HKG > GRU <span class="sep">|</span>
            <svg style="width:12px; height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> 96 pc <span class="sep">|</span>
            <svg style="width:12px; height:12px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13h18"></path><path d="M12 2v11"></path><path d="M8 6l4-4 4 4"></path><path d="M5 22h14"></path><path d="M8 18h8"></path></svg> 1094 kg
          </div>
        </div>

        <div class="tabs-container">
          <button :class="['tab-btn', { active: activeTab === 'Shipment Details' }]" @click="activeTab='Shipment Details'">Shipment Details</button>
          <button :class="['tab-btn', { active: activeTab === 'Weather Forecast' }]" @click="activeTab='Weather Forecast'">Weather Forecast</button>
          <button :class="['tab-btn', { active: activeTab === 'ULD Sensors' }]" @click="activeTab='ULD Sensors'">ULD Sensors</button>
        </div>
      </div>

      <!-- Shipment Details -->
      <div v-if="activeTab === 'Shipment Details'" class="tab-content">
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
              <tr v-for="(log, idx) in shipmentLogs" :key="idx" :class="{ 'alt-row': idx % 2 === 0 }">
                <td :style="idx === 0 ? 'color: #ef4444; font-weight: bold;' : 'font-weight: 500; color: #444;'">{{ log.desc }}</td>
                <td class="text-gray">{{ log.time }}</td>
                <td :style="idx === 0 ? 'color: #ef4444;' : 'color: #666;'">{{ log.remark }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Weather Forecast -->
      <div v-if="activeTab === 'Weather Forecast'" class="tab-content weather-tab">
         <!-- Two column layout -->
         <div class="weather-cols">
            <!-- Left Forecast -->
            <div class="weather-col-left">
              <h3 class="green-title" style="margin-bottom: 8px;">Arrival Weather Forecast</h3>
              <p class="eta-text">ETA: 26Apr 13:55</p>

              <div class="forecast-card gradient-card">
                 <div class="fc-icon">
                    <svg style="width:50px;height:50px;color:#FFD700" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                       <circle cx="12" cy="12" r="5"></circle>
                       <line x1="12" y1="1" x2="12" y2="3"></line>
                       <line x1="12" y1="21" x2="12" y2="23"></line>
                       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                       <line x1="1" y1="12" x2="3" y2="12"></line>
                       <line x1="21" y1="12" x2="23" y2="12"></line>
                       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                 </div>
                 <div class="fc-temp">38°C</div>
                 <div class="fc-loc">Brazil</div>
                 
                 <div class="fc-stats">
                    <div class="fc-stat">
                       <svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="4 6 8 10 12 6 16 10 20 6"></polyline>
                          <polyline points="4 14 8 18 12 14 16 18 20 14"></polyline>
                       </svg>
                       <div class="fc-stat-text"><strong>48%</strong><br>Humidity</div>
                    </div>
                    <div class="fc-stat">
                       <svg style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M4 8h12c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3"></path>
                          <path d="M20 16h-9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3"></path>
                          <path d="M2.5 12h14"></path>
                       </svg>
                       <div class="fc-stat-text"><strong>11.02</strong><br>Wind Speed</div>
                    </div>
                 </div>
              </div>
            </div>

            <!-- Right Impact Chart -->
            <div class="weather-col-right">
              <h3 class="green-title" style="margin-bottom: 24px;">Predicted Arrival Impact</h3>

              <div class="weather-alert-row">
                <div class="weather-alert-box">
                  <div class="weather-alert-header">
                    <img src="../assets/Critical Temperature Alert.png" class="critical-icon" alt="Warning!" />
                    <strong>Critical Temperature Alert</strong>
                  </div>
                  <div class="wa-time">15:00 - 18:00 [GRU✈JFK]</div>
                  <div class="wa-desc">Hot Weather Alert, Potential Over-Heat (38°C.)</div>
                </div>
              </div>
              
              <div class="chart-wrapper">
                 <!-- Absolute Title Overlay -->
                 <div class="chart-y-title">
                     <span class="tmean">T<sub>mean</sub></span>
                     <span class="celsius">(°C)</span>
                     <span class="desc">-> average temperature over a 24h day</span>
                 </div>

                 <v-chart class="arrival-chart" :option="chartOption" autoresize />

                 <!-- Timeline points -->
                 <div class="flight-timeline">
                    <div class="ft-point">HKG</div>
                    <div class="ft-part" style="flex: 2;">
                        <div class="ft-line"></div>
                        <div class="ft-icon">
                        <img src="../assets/airplate.png" alt="Flight route" class="airplane-icon" />
                        </div>
                        <div class="ft-line"></div>
                    </div>
                    <div class="ft-point">GRU</div>
                    <div class="ft-part" style="flex: 1;">
                        <div class="ft-line"></div>
                    </div>
                    <div class="ft-point" style="margin-right:-8px;">JFK</div>
                 </div>
              </div>
            </div>
         </div>
      </div>

      <!-- ULD Sensors -->
      <div v-if="activeTab === 'ULD Sensors'" class="tab-content uld-tab">
        <div class="top-row">
          <!-- Thermo Cover Block -->
          <div class="thermo-block box-card">
            <div class="thermo-header">
              <svg style="width:16px;height:16px;margin-right:8px;color:#f59e0b;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              Thermo Cover Service (Recommended)
            </div>
            <div class="thermo-img-container">
              <img src="../assets/Thermo Cover ULD.png" alt="Thermo Cover" class="thermo-img" />
            </div>
            <button class="requested-btn">Requested</button>
          </div>

          <!-- ULD Info Block -->
          <div class="uld-info-block box-card">
            <div class="uld-info-content">
              <h3 class="green-title">ULD Info</h3>
              <div class="info-grid">
                <div class="grid-row"><span>ULD Type</span><span>RAP</span></div>
                <div class="grid-row"><span>ULD Leased By</span><span>Jettainer</span></div>
                <div class="grid-row"><span>Controlled Temperature Range</span><span>-10°C to -20°C</span></div>
                <div class="grid-row">
                  <span>Number of ULD temperature sensors</span>
                  <div class="sensor-details-val">
                    <span>12</span>
                    <button class="sensor-btn">
                      <svg style="width:16px;height:16px;margin-right:4px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                        <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
                        <circle cx="12" cy="12" r="2"/>
                        <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
                        <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
                      </svg>
                      Sensor Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="uld-img-container">
               <img src="../assets/ULD.png" alt="Jettainer ULD" class="uld-img" />
            </div>
          </div>
        </div>

        <h3 class="green-title" style="margin-top: 10px;">Temperature Sensor History</h3>
        <div class="history-block box-card">
          <div class="timeline">
            <div class="timeline-item" v-for="(log, idx) in sensorHistoryLogs" :key="idx">
              <div class="time-col">
                <div class="date-lbl">{{ log.timeDesc }}</div>
                <div class="time-lbl">{{ log.time }}</div>
              </div>
              <div class="dot-col">
                <div class="timeline-dot"></div>
                <div class="timeline-line" v-if="idx < sensorHistoryLogs.length - 1"></div>
              </div>
              <div class="content-col">
                <div class="data-box">
                  <span class="temp-val">{{ log.temp }}</span>
                  <span class="status-lbl">{{ log.status }}</span>
                  <svg style="width:16px;height:16px;color:#aaa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>
            </div>
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

.header-info-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  margin-bottom: 30px;
}

.awb-section h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.awb-section .subtitle {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.sep {
  color: #ccc;
  margin: 0 4px;
}

.tabs-container {
  display: flex;
  gap: 8px;
}

.tab-btn {
  padding: 10px 20px;
  background: #fff;
  border: 1px solid #ddd;
  color: #555;
  font-size: 13px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #fdfdfd;
}

.tab-btn.active {
  background-color: #3b9b6d;
  color: #fff;
  border-color: #3b9b6d;
  font-weight: bold;
}

/* Tab contents */
.tab-content {
  background: #fff;
  border-top: none;
}

.table-container {
  margin-bottom: 20px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
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

/* ULD Sensors Layout */
.top-row {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}

.box-card {
  background: #fff;
  border: 1px solid #eaeaea;
  border-radius: 6px;
  padding: 24px;
}

.thermo-block {
  flex: 0 0 280px;
  display: flex;
  flex-direction: column;
}

.thermo-header {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #6B8080;
  margin-bottom: 24px;
  padding: 12px;
  background: #fffbea;
  border: 1px solid #fde68a;
  border-radius: 4px;
}

.thermo-img-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.thermo-img {
  max-width: 100%;
  height: auto;
}

.requested-btn {
  display: block;
  width: 100%;
  padding: 12px;
  border: 1px solid #3b9b6d;
  background: transparent;
  color: #3b9b6d;
  font-weight: bold;
  border-radius: 4px;
  text-align: center;
}

.uld-info-block {
  flex: 1;
  display: flex;
  gap: 30px;
}

.uld-info-content {
  flex: 1;
}

.green-title {
  color: #2E8B57;
  font-size: 15px;
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 24px;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.grid-row {
  display: grid;
  grid-template-columns: 240px 1fr;
  align-items: center;
  font-size: 13px;
  color: #6B8080;
}

.grid-row span:first-child {
  color: #6B8080;
}

.grid-row span:last-child {
  color: #6B8080;
  text-align: right;
}

.sensor-details-val {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.sensor-btn {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #3bafff;
  background: #fff;
  color: #3bafff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.uld-img-container {
  flex: 0 0 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uld-img {
  max-width: 100%;
  height: auto;
}

.history-block {
  width: 100%;
}

.timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  min-height: 60px;
}

.time-col {
  width: 80px;
  text-align: right;
  padding-right: 15px;
  font-size: 12px;
  padding-top: 5px;
}

.date-lbl {
  color: #333;
  font-weight: bold;
}

.time-lbl {
  color: #888;
}

.dot-col {
  width: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  background: #2E8B57;
  border-radius: 50%;
  margin-top: 8px;
}

.timeline-line {
  width: 2px;
  background: #2E8B57;
  flex: 1;
}

.content-col {
  flex: 1;
  padding-left: 15px;
  padding-bottom: 20px;
}

.data-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eaeaea;
  padding: 12px 20px;
  background: #fff;
  border-radius: 4px;
}

.temp-val {
  color: #2E8B57;
  font-weight: bold;
  font-size: 14px;
  flex: 1;
}

.status-lbl {
  color: #333;
  font-size: 13px;
  flex: 3;
}

/* Weather Forecast Tab */
.weather-tab {
  background: transparent;
  border-top: none;
}
.weather-cols {
  display: flex;
  gap: 40px;
  margin-top: 10px;
}
.weather-col-left {
  flex: 0 0 260px;
}
.eta-text {
  color: #333;
  font-size: 13px;
  margin-bottom: 20px;
  font-weight: 500;
}
.forecast-card.gradient-card {
  background: linear-gradient(160deg, #f7b388 0%, #dda294 100%);
  border-radius: 12px;
  padding: 30px;
  color: #fff;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}
.fc-icon {
  margin-bottom: 12px;
}
.fc-temp {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 4px;
}
.fc-loc {
  font-size: 16px;
  margin-bottom: 24px;
}
.fc-stats {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.3);
  padding-top: 20px;
}
.fc-stat {
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: left;
}
.fc-stat-text {
  font-size: 11px;
  line-height: 1.4;
}

.weather-col-right {
  flex: 1;
}
.weather-alert-row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}
.chart-wrapper {
  position: relative;
  background: #fff;
  width: 100%;
}
.arrival-chart {
  width: 100%;
  height: 350px;
}
.weather-alert-box {
  position: static;
  background: white;
  padding: 10px 14px;
  border-radius: 6px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-left: 4px solid #facc15;
  text-align: center;
  z-index: 10;
  font-size: 11px;
}
.weather-alert-header {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d97706;
  font-weight: bold;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 13px;
}
.critical-icon {
  width: 16px;
  height: 16px;
}
.wa-time {
  color: #333;
  margin-bottom: 2px;
}
.wa-desc {
  color: #333;
}

.chart-y-title {
  position: absolute;
  top: 15px;
  left: 20px;
  z-index: 5;
}
.chart-y-title .tmean { font-size: 18px; font-weight: 900; font-style: italic; color: #000; }
.chart-y-title .celsius { font-size: 16px; font-weight: 900; color: #000; margin-left: 2px; }
.chart-y-title .desc { font-size: 12px; color: #555; font-style: italic; margin-left: 6px; }

.flight-timeline {
  display: flex;
  align-items: center;
  padding-right: 32px;
  padding-left: 26px;
  color: #666;
  font-size: 12px;
  font-weight: bold;
}
.ft-point {
  color: #333;
}
.ft-part {
  display: flex; 
  align-items: center;
}
.ft-line {
  flex: 1;
  height: 2px;
  background: #ccc;
  margin: 0 10px;
}
.ft-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.airplane-icon {
  width: 18px;
  height: 18px;
  opacity: 0.75;
}
</style>

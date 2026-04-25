<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import RecordOffcanvas from '@/libs/component/common/RecordOffcanvas.vue';

const activeTab = ref('Air Waybill');
const searchAwb = ref('');
const searchOneRecordLO = ref('');
const searchDateRange = ref(null);
const searchLastUpdateDate = ref(null);

const isOffCanvasOpen = ref(false);
const selectedRecordData = ref<any>(null);

const openOffCanvas = (record: any) => {
  selectedRecordData.value = record;
  isOffCanvasOpen.value = true;
};

const allRecords = [
  {
    awb: '160-12345675',
    oneRecordLo: 'fecbe019-f3d6-4436-ad35-66ce87a7d985',
    source: 'Manual',
    hse: '0',
    flightDate: '2026-04-26',
    origin: 'HKG',
    destination: 'LHR',
    status: 'Pending',
    print: 'N',
    shipper: 'ABC Logistics',
    consignee: 'XYZ Imports',
    user: 'admin',
    lastUpdate: '2026-04-25 10:00',
    routeMap: [
      { code: 'FWB', status: 'complete', pDate: '24Apr 05:45', mDate: '-', aDate: '-' },
      { code: 'LAT', status: 'complete', pDate: '24Apr 05:50', mDate: '22Apr 12:46', aDate: '22Apr 12:45' },
      { code: 'RCS', status: 'complete', pDate: '24Apr 05:50', mDate: '22Apr 12:46', aDate: '22Apr 12:46' },
      { code: 'FOW', status: 'new', pDate: '24Apr 07:20', mDate: '-', aDate: '-' },
      { code: 'DEP', status: 'new', pDate: '24Apr 09:20', mDate: '-', aDate: '-' },
      { isFlight: true, from: 'HKG', to: 'SGN', flightNo: 'CX767', sDate: '24Apr 08:20', aDate: '-' },
      { code: 'ARR', status: 'new', pDate: '24Apr 10:50', mDate: '-', aDate: '-' },
      { code: 'RCF', status: 'new', pDate: '24Apr 13:05', mDate: '-', aDate: '-' },
      { code: 'NFD', status: 'new', pDate: '24Apr 13:05', mDate: '-', aDate: '-', bDate: '24Apr 13:05' },
      { code: 'AWD', status: 'new', pDate: '24Apr 12:35', mDate: '-', aDate: '-' },
      { code: 'DLV', status: 'new', pDate: '26Apr 10:05', mDate: '-', aDate: '-' }
    ],
    events: [
      { code: 'FWB', desc: 'Creation of MAWB', time: '24 Apr 05:45' },
      { code: 'LAT', desc: 'Latest Acceptance Time', time: '24 Apr 05:50' },
      { code: 'RCS', desc: 'Freight Checked in at Departure Airline', time: '24 Apr 05:50' }
    ]
  },
  {
    awb: '160-98765432',
    oneRecordLo: '7a2f1b40-8c29-4d6d-9286-a51b5e282b8a',
    source: 'API',
    hse: '2',
    flightDate: '2026-04-27',
    origin: 'SIN',
    destination: 'FRA',
    status: 'Accepted',
    print: 'Y',
    shipper: 'Global Freight',
    consignee: 'Euro Cargo',
    user: 'system',
    lastUpdate: '2026-04-25 11:30',
    routeMap: [
      { code: 'BKG', status: 'complete', pDate: '25Apr 08:00', mDate: '26Apr', aDate: '26Apr 09:00' },
      { code: 'RCS', status: 'partial', pDate: '25Apr 12:00', mDate: '-', aDate: '26Apr 10:30' },
      { code: 'DEP', status: 'new', pDate: '26Apr 15:00', mDate: '-', aDate: '-' },
      { isFlight: true, from: 'SIN', to: 'FRA', flightNo: 'SQ326', sDate: '26Apr 14:00', aDate: '-' },
      { code: 'ARR', status: 'new', pDate: '26Apr 21:00', mDate: '-', aDate: '-' }
    ],
    events: [
      { code: 'BKG', desc: 'Booking Confirmed', time: '25 Apr 08:00' },
      { code: 'RCS', desc: 'Freight Received Partially', time: '26 Apr 10:30' }
    ]
  },
  {
    awb: '160-55554444',
    oneRecordLo: '3c8e4f1a-b615-492c-ad2f-e8b91a78370f',
    source: 'Manual',
    hse: '1',
    flightDate: '2026-04-28',
    origin: 'NRT',
    destination: 'JFK',
    status: 'Rejected',
    print: 'N',
    shipper: 'Tokyo Exp',
    consignee: 'NY Dist',
    user: 'jl',
    lastUpdate: '2026-04-25 09:15',
    routeMap: [
      { code: 'RCS', status: 'complete', pDate: '27Apr 07:00' },
      { code: 'DG Check', status: 'discrepancy', pDate: '27Apr 08:00', mDate: '27Apr 08:15', aDate: '27Apr 08:20' },
      { code: 'DEP', status: 'new', pDate: '28Apr 09:00', mDate: '-', aDate: '-' }
    ],
    events: [
      { code: 'RCS', desc: 'Consignment received', time: '27 Apr 07:00' },
      { code: 'DG', desc: 'Dangerous Goods AutoCheck Failed - EHC needed', time: '27 Apr 08:20' }
    ]
  }
];

const displayedRecords = ref([...allRecords]);

const triggerSearch = () => {
  // 1. Filter the table records locally
  displayedRecords.value = allRecords.filter(record => {
    const termAwb = searchAwb.value ? searchAwb.value.trim().toLowerCase() : '';
    const term1R = searchOneRecordLO.value ? searchOneRecordLO.value.trim().toLowerCase() : '';
    
    const matchAwb = !termAwb || record.awb.toLowerCase().includes(termAwb);
    const match1R = !term1R || record.oneRecordLo.toLowerCase().includes(term1R);
    // Note: Can add robust date checking against searchDateRange/searchLastUpdateDate here internally
    return matchAwb && match1R;
  });

  // 2. Clear old mock data
};

const clearSearch = () => {
  searchAwb.value = '';
  searchOneRecordLO.value = '';
  searchDateRange.value = null;
  searchLastUpdateDate.value = null;
  triggerSearch();
};
</script>

<template>
  <div class="dashboard-page">
    <AppHeader />

    <!-- Off-canvas Overlay Component -->
    <RecordOffcanvas v-model:isOpen="isOffCanvasOpen" :recordData="selectedRecordData" />

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
      <h2 class="page-title" style="color: #1A8242; font-weight: bold; font-size: 24px; border-bottom: 2px solid #1A8242; padding-bottom: 10px; margin-bottom: 20px;">Shipment List</h2>

      <div class="page-tabs">
        <span 
          :class="['tab', { active: activeTab === 'Air Waybill' }]"
          @click="activeTab = 'Air Waybill'"
        >
          Air Waybill
        </span>
        <span 
          :class="['tab', { active: activeTab === 'Template' }]"
          @click="activeTab = 'Template'"
        >
          Template
        </span>
      </div>

      <!-- Search Section -->
      <section class="card search-card">
        <div class="card-header">
          <h3>Search</h3>
          <button class="btn btn-outline">+ Create FWB</button>
        </div>
        
        <div class="form-grid">
          <div class="form-group">
            <label>Air Waybill Number</label>
            <input type="text" v-model="searchAwb" placeholder="Enter AWB..." />
          </div>
          <div class="form-group">
            <label>1R (ONE Record) LO</label>
            <input type="text" v-model="searchOneRecordLO" placeholder="Enter LO URI or ID..." />
          </div>
          <div class="form-group" style="z-index: 10;">
            <label>Date Range</label>
            <VueDatePicker v-model="searchDateRange" range multi-calendars placeholder="Select Date Range" />
          </div>
          <div class="form-group" style="z-index: 10;">
            <label>Last Update Date</label>
            <VueDatePicker v-model="searchLastUpdateDate" placeholder="Select Last Update Date" />
          </div>
        </div>

        <div class="search-actions" style="gap: 12px; display: flex; justify-content: flex-end;">
          <button class="btn btn-outline" @click="clearSearch">Clear</button>
          <button class="btn btn-green" @click="triggerSearch">Search</button>
        </div>
      </section>

      <!-- Results Section -->
      <section class="card results-card">
        <h4 class="card-subtitle">Recent FWB Record</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>AWB</th>
                <th>1R LO</th>
                <th>Source</th>
                <th>Hse</th>
                <th>Flight Date</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Print</th>
                <th>Shipper</th>
                <th>Consignee</th>
                <th>User</th>
                <th>Last Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedRecords.length === 0">
                <td colspan="14" style="text-align: center; padding: 20px; color: #888;">No recent records found matching search criteria.</td>
              </tr>
              <tr v-for="(record, index) in displayedRecords" :key="index">
                <td>{{ record.awb }}</td>
                <td>{{ record.oneRecordLo }}</td>
                <td>{{ record.source }}</td>
                <td>{{ record.hse }}</td>
                <td>{{ record.flightDate }}</td>
                <td>{{ record.origin }}</td>
                <td>{{ record.destination }}</td>
                <td>{{ record.status }}</td>
                <td>{{ record.print }}</td>
                <td>{{ record.shipper }}</td>
                <td>{{ record.consignee }}</td>
                <td>{{ record.user }}</td>
                <td>{{ record.lastUpdate }}</td>
                <td><a href="#" class="action-link" @click.prevent="openOffCanvas(record)">View</a></td>
              </tr>
            </tbody>
          </table>
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

.page-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 22px;
  color: #222;
}

.page-tabs {
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #eaeaea;
  margin-bottom: 20px;
}
.tab {
  padding: 10px 0;
  cursor: pointer;
  color: #777;
  font-weight: 500;
  position: relative;
}
.tab.active {
  color: #333;
}
.tab.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #8cc63f;
}

/* Cards */
.card {
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

/* Buttons */
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn-outline {
  border-color: #999;
  background: white;
  color: #555;
}
.btn-green {
  background-color: #8cc63f;
  color: white;
  border-color: #8cc63f;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-group label {
  font-size: 13px;
  color: #666;
}
.form-group input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}
.form-group input:focus {
  border-color: #8cc63f;
}

.search-actions {
  display: flex;
  justify-content: flex-end;
}
.expand-action {
  text-align: right;
  margin-top: 10px;
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

/* Results */
.card-subtitle {
  margin: 0 0 16px 0;
  color: #888;
  font-weight: normal;
  font-size: 14px;
}
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
th, td {
  text-align: left;
  padding: 12px 8px;
  border-bottom: 1px solid #f0f0f0;
}
th {
  color: #666;
  font-weight: 500;
}
.skeleton-box {
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 2px;
  width: 80%;
}
.action-link {
  color: #555;
  text-decoration: none;
}
.mock-data-container pre {
  background-color: #272822;
  color: #f8f8f2;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  margin: 0;
}
</style>

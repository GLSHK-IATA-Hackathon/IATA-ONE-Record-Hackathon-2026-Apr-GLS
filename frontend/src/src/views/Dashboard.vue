<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const activeTab = ref('Air Waybill');
const searchAwb = ref('');
const searchOneRecordLO = ref('');
const searchDateRange = ref(null);
const searchLastUpdateDate = ref(null);
const mockOneRecordData = ref<any>(null);

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
    lastUpdate: '2026-04-25 10:00'
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
    lastUpdate: '2026-04-25 11:30'
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
    lastUpdate: '2026-04-25 09:15'
  }
];

const displayedRecords = ref([...allRecords]);

const triggerSearch = () => {
  // 1. Filter the table records locally
  displayedRecords.value = allRecords.filter(record => {
    const matchAwb = !searchAwb.value || record.awb.includes(searchAwb.value);
    const match1R = !searchOneRecordLO.value || record.oneRecordLo.includes(searchOneRecordLO.value);
    // Note: Can add robust date checking against searchDateRange/searchLastUpdateDate here internally
    return matchAwb && match1R;
  });

  // 2. Populate the mock data for ONE Record view if an LO is provided
  if (searchOneRecordLO.value) {
    mockOneRecordData.value = {
      "id": searchOneRecordLO.value || "waybill-123-45678905",
      "logisticsObjects": ["fecbe019-f3d6-4436-ad35-66ce87a7d985", "b0c39f28-d74a-4ab0-b49e-1082c57a9e33"],
      "origin": "HKG",
      "destination": "LHR",
      "cargoIQTimeline": [
        { "code": "RCS", "name": "Ready for Carriage", "status": "PENDING", "timestamp": null },
        { "code": "SAC", "name": "Acceptance Check", "status": "FAILED", "timestamp": "2026-04-25T10:15:30Z" }
      ],
      "dgResults": {
        "status": "FAIL",
        "checkedAt": "2026-04-25T10:16:00Z",
        "passedRules": [
          { "id": "DG-R001", "description": "UN Number identified and valid (UN1845)" },
          { "id": "DG-R002", "description": "Proper Shipping Name matches UN Number" }
        ],
        "failedRules": [
          { 
            "id": "DG-E045", 
            "description": "Packaging Instruction 954 weight limits exceeded.",
            "severity": "CRITICAL",
            "actionRequired": "Re-pack or reject shipment"
          }
        ]
      }
    };
  } else {
    // Clear mock ONE record panel if no LO ID provided in search
    mockOneRecordData.value = null;
  }
};
</script>

<template>
  <div class="dashboard-page">
    <AppHeader />

    <!-- Navigation Bar -->
    <nav class="nav-bar">
      <span>Booking</span>
      <span>Operation</span>
      <span>Terminal</span>
      <span>Airline</span>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <h2 class="page-title">FWB Neutral AWB Printing</h2>

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

        <div class="search-actions">
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
                <td><a href="#" class="action-link" @click.prevent="searchOneRecordLO = record.oneRecordLo; triggerSearch()">View</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Mock Data Result Viewer -->
      <section class="card results-card" v-if="mockOneRecordData">
        <h4 class="card-subtitle">ONE Record LO Search Result</h4>
        <div class="mock-data-container">
          <pre>{{ JSON.stringify(mockOneRecordData, null, 2) }}</pre>
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

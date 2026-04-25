<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';
import { VueDatePicker } from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import RecordOffcanvas from '@/libs/component/common/RecordOffcanvas.vue';

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
  { chk: false, awb: '160-52711536', oneRecordLo: 'fecbe019', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', hse: '1', flight: 'CX366', fltDate: '04 Mar', std: '', mStatus: 'error', hmStatus: 'view', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '2', wgt: '15.0K', desc: 'CONSOL SHI..', lastEventTime: '15 May 10:25' },
  { chk: false, awb: '160-52711540', oneRecordLo: '2cd2f6a9', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', hse: '1', flight: 'CX366', fltDate: '04 Mar', std: '', mStatus: 'error', hmStatus: 'view', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '42', wgt: '507.0K', desc: 'CONSOL SHI..', lastEventTime: '16 May 14:43' },
  { chk: false, awb: '160-10448690', oneRecordLo: '7a2f1b40', hasIconPencil: true, hasIconBox: true, pouch: '', sshc: '', hse: '0', flight: 'CX472', fltDate: '29 Apr', std: '29 Apr 15:45', mStatus: 'error', hmStatus: 'none', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'TPE', pcs: '1', wgt: '10.2K', desc: 'CONSOL', lastEventTime: '19 May 12:01' },
  { chk: false, awb: '160-10193341', oneRecordLo: '3c8e4f1a', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', hse: '1', flight: 'CX366', fltDate: '01 Sep', std: '', mStatus: 'error-part', hmStatus: 'error-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '1', wgt: '1.0K', desc: 'CONSOL', lastEventTime: '29 Aug 16:27' },
  { chk: false, awb: '160-33333322', oneRecordLo: 'c5d18196', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', hse: '1', flight: 'CX1234', fltDate: '21 Nov', std: '', mStatus: 'view-part', hmStatus: 'view-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'BKK', pcs: '1', wgt: '123.0K', desc: 'GOODS', lastEventTime: '03 Sep 16:13' },
  { chk: false, awb: '160-52001176', oneRecordLo: '8b4566c3', hasIconPencil: false, hasIconBox: true, pouch: 'EAP', sshc: '', hse: '0', flight: 'CX100', fltDate: '08 Sep', std: '', mStatus: 'error-part', hmStatus: 'none', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'TPE', pcs: '1', wgt: '11.5K', desc: 'TESTTESTTE..', lastEventTime: '08 Sep 09:39' },
  { chk: false, awb: '160-10314942', oneRecordLo: 'd22dcc1a', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', hse: '3', flight: 'CX705', fltDate: '29 Apr', std: '', mStatus: 'error-file', hmStatus: 'error-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'BKK', pcs: '1', wgt: '100.0K', desc: 'BATTERY', lastEventTime: '12 Sep 10:51' },
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
      <router-link to="/shipment-list" custom v-slot="{ navigate }">
        <span @click="navigate">Shipment List</span>
      </router-link>
      <router-link to="/dashboard" custom v-slot="{ navigate }">
        <span @click="navigate">Shipment Performance Monitor</span>
      </router-link>
      <router-link to="/carrier-code" custom v-slot="{ navigate }">
        <span @click="navigate">Carrier code Maintenance</span>
      </router-link>
      <span>Terminal</span>
      <span>Airline</span>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
      <h2 class="page-title">Shipment Summary</h2>

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
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 13px; color: #555;">
          <span>38 records in 4 page(s).</span>
          <div style="color: #00A3C5;">
            <span style="cursor: pointer; margin-right: 8px;">1</span>
            <span style="cursor: pointer; margin-right: 8px; color: #333;">2</span>
            <span style="cursor: pointer; margin-right: 8px; color: #333;">3</span>
            <span style="cursor: pointer; color: #333;">4</span>
          </div>
        </div>
        <div class="table-container">
          <table class="modern-table">
            <thead>
              <tr>
                <th style="width: 40px; text-align: center;"><input type="checkbox" /></th>
                <th>Air Waybill No.</th>
                <th>Pouch</th>
                <th>S-SHC</th>
                <th>Hse.</th>
                <th>Flight</th>
                <th>Flt Date</th>
                <th>STD</th>
                <th style="width: 30px; text-align: center;" title="M">M</th>
                <th style="width: 30px; text-align: center;" title="HM">HM</th>
                <th style="width: 30px; text-align: center;" title="F">F</th>
                <th style="width: 30px; text-align: center;" title="AP">AP</th>
                <th>Org.</th>
                <th>Dest.</th>
                <th>Pcs.</th>
                <th>Wgt.</th>
                <th>Desc.</th>
                <th>Last Event Time</th>
                <th style="text-align: center;">Hist.</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedRecords.length === 0">
                <td colspan="19" style="text-align: center; padding: 20px; color: #888;">No recent records found matching search criteria.</td>
              </tr>
              <tr v-for="(record, index) in displayedRecords" :key="index" class="table-row-hover">
                <td style="text-align: center;"><input type="checkbox" v-model="record.chk" /></td>
                <td>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <div style="width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; background-color: #fce8e8; border-radius: 50%; color: #d32f2f;">
                      <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" stroke-width="2" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="none" fill="currentColor"></path><path d="M2 12l20 -6L12 22"></path></svg>
                    </div>
                    <span style="color: #666;">{{ record.awb }}</span>
                    <button v-if="record.hasIconPencil" class="icon-btn tooltip-trigger" title="Edit">✏️</button>
                    <button v-if="record.hasIconBox" class="icon-btn tooltip-trigger" title="Box">📦</button>
                  </div>
                </td>
                <td>{{ record.pouch }}</td>
                <td>{{ record.sshc }}</td>
                <td>{{ record.hse }}</td>
                <td>{{ record.flight }}</td>
                <td>{{ record.fltDate }}</td>
                <td>{{ record.std }}</td>
                <td style="text-align: center;">
                  <span v-if="record.mStatus === 'error'" class="status-icon err">⊖</span>
                  <span v-if="record.mStatus === 'error-part'" class="status-icon err-part">⊝</span>
                  <span v-if="record.mStatus === 'view-part'" class="status-icon view-part">👁️‍🗨️</span>
                  <span v-if="record.mStatus === 'error-file'" class="status-icon err-file">📄⛔</span>
                </td>
                <td style="text-align: center;">
                  <span v-if="record.hmStatus === 'view'" class="status-icon view">👁️</span>
                  <span v-if="record.hmStatus === 'error-part'" class="status-icon err-part">⊝</span>
                  <span v-if="record.hmStatus === 'view-part'" class="status-icon view-part">👁️‍🗨️</span>
                </td>
                <td style="text-align: center;">
                  <!-- F column mostly blank in screenshot -->
                </td>
                <td style="text-align: center;">
                  <span v-if="record.apStatus === 'folder'" class="status-icon folder">📁</span>
                </td>
                <td style="color: #00A3C5;">{{ record.org }}</td>
                <td>{{ record.dest }}</td>
                <td style="color: #00A3C5;">{{ record.pcs }}</td>
                <td>{{ record.wgt }}</td>
                <td>{{ record.desc }}</td>
                <td>{{ record.lastEventTime }}</td>
                <td style="text-align: center;">
                  <button class="icon-btn tooltip-trigger" title="History" @click.prevent="openOffCanvas(record)">🔍</button>
                </td>
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

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 13px;
}
.modern-table th, .modern-table td {
  text-align: left;
  padding: 10px 8px;
  border-bottom: 1px solid #eaeaea;
  white-space: nowrap;
}
.modern-table th {
  background-color: #e6f3eb; /* gentle green tone from screenshot */
  color: #00A3C5;
  font-weight: 500;
  border-bottom: 2px solid #fff;
}
.modern-table th:first-child {
  border-top-left-radius: 4px;
}
.modern-table th:last-child {
  border-top-right-radius: 4px;
}
.table-row-hover:hover {
  background-color: #f9fdfa;
}
.table-row-hover td {
  color: #555;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 4px;
  border-radius: 4px;
  transition: background 0.2s;
}
.icon-btn:hover {
  background: #f0f0f0;
}

/* Modern SVG/Status Icons for M, HM, F */
.status-icon {
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.status-icon.err { color: #d32f2f; font-weight: bold; }
.status-icon.err-part { color: #d32f2f; background: #ffebee; border-radius: 50%; opacity: 0.8; }
.status-icon.view { color: #1976d2; }
.status-icon.view-part { color: #1976d2; background: #e3f2fd; border-radius: 50%; padding: 2px; }
.status-icon.err-file { color: #d32f2f; }
.status-icon.folder { color: #5c8fc0; font-size: 18px; }

.skeleton-box {
  height: 16px;
  background-color: #f0f0f0;
  border-radius: 2px;
  width: 80%;
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

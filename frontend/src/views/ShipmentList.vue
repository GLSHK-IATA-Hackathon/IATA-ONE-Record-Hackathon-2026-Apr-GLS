<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppNavBar from '@/libs/component/common/AppNavBar.vue';
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

const router = useRouter();

const openDetail = (record: any) => {
  router.push({ path: '/dashboard/detail', query: { awb: record.awb, loid: record.oneRecordLo } });
};

const allRecords = [
  { chk: false, awb: '160-52711536', oneRecordLo: 'fecbe019-f3d6-4436-ad35-66ce87a7d985', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: 'SHC', flight: 'CX366', fltDate: '2026-04-26', std: '2026-04-26 19:21', mStatus: 'error', hmStatus: 'view', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '2', wgt: '15.5 K', desc: 'Battery', lastEventTime: '2026-04-24 10:23' },
  { chk: false, awb: '160-52711540', oneRecordLo: '2cd2f6a9-8c29-4d6d-9286-a51b5e282b8a', hasIconPencil: true, hasIconBox: true, pouch: 'EAP', sshc: '', flight: 'CX366', fltDate: '2026-04-26', std: '2026-04-26 19:21', mStatus: 'error', hmStatus: 'view', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '42', wgt: '507.0 K', desc: 'CONSOL', lastEventTime: '2026-04-24 14:43' },
  { chk: false, awb: '160-10448690', oneRecordLo: '7a2f1b40-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: '', sshc: 'VAL', flight: 'CX472', fltDate: '2026-04-29', std: '2026-04-29 15:45', mStatus: 'error', hmStatus: 'none', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'TPE', pcs: '1', wgt: '10.2 K', desc: 'CONSOL', lastEventTime: '2026-04-28 12:01' },
  { chk: false, awb: '160-10193341', oneRecordLo: '3c8e4f1a-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', flight: 'CX366', fltDate: '2026-09-01', std: '', mStatus: 'error-part', hmStatus: 'error-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '1', wgt: '1.0 K', desc: 'CONSOL', lastEventTime: '2026-08-29 16:27' },
  { chk: false, awb: '160-33333322', oneRecordLo: 'c5d18196-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', flight: 'CX1234', fltDate: '2026-11-21', std: '', mStatus: 'view-part', hmStatus: 'view-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'BKK', pcs: '1', wgt: '123.0 K', desc: 'GOODS', lastEventTime: '2026-09-03 16:13' },
  { chk: false, awb: '160-52001176', oneRecordLo: '8b4566c3-b615-492c-ad2f-e8b91a78370f', hasIconPencil: false, hasIconBox: true, pouch: 'EAP', sshc: '', flight: 'CX100', fltDate: '2026-09-08', std: '', mStatus: 'error-part', hmStatus: 'none', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'TPE', pcs: '1', wgt: '11.5 K', desc: 'TEST', lastEventTime: '2026-09-08 09:39' },
  { chk: false, awb: '160-10314942', oneRecordLo: 'd22dcc1a-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', flight: 'CX705', fltDate: '2026-04-29', std: '', mStatus: 'error-file', hmStatus: 'error-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'BKK', pcs: '1', wgt: '100.0 K', desc: 'BATTERY', lastEventTime: '2026-04-28 10:51' },
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
    <AppNavBar />

      <!-- Main Content -->
      <main class="main-content">
        <h2 class="page-title">Shipment List</h2>

        <!-- Search Section -->
      <section class="search-section">
        <div class="search-grid">
          <div class="form-group" style="grid-column: 1 / 3;">
            <label>Air Waybill Number</label>
            <input type="text" v-model="searchAwb" placeholder="" />
          </div>
          <div class="form-group" style="grid-column: 3 / 6;">
            <label>One Record LOID</label>
            <input type="text" v-model="searchOneRecordLO" placeholder="" />
          </div>
          
          <div class="form-group">
            <label>Flight Number</label>
            <input type="text" placeholder="" />
          </div>
          <div class="form-group" style="z-index: 10;">
            <label>Flight Date</label>
            <VueDatePicker v-model="searchDateRange" placeholder="Select Date" :enable-time-picker="false" />
          </div>
          <div class="form-group" style="grid-column: 3 / 6;">
            <label>Forwarder</label>
            <div style="display: flex; gap: 10px;">
                <input type="text" placeholder="" style="flex: 1;" />
                <button class="btn btn-search" @click="triggerSearch" style="width: 120px;">Search</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Results Section -->
      <section class="results-section">
        <div class="table-container">
          <table class="modern-table">
            <thead>
              <tr>
                <th>Air WayBill No.</th>
                <th>LOID</th>
                <th>Pouch</th>
                <th>SHC</th>
                <th>Flight</th>
                <th>Flight Date</th>
                <th>STD</th>
                <th style="width: 30px; text-align: center;" title="M">M</th>
                <th style="width: 30px; text-align: center;" title="HM">HM</th>
                <th style="width: 30px; text-align: center;" title="F">F</th>
                <th style="width: 30px; text-align: center;" title="AP">AP</th>
                <th>Pcs</th>
                <th>Wgt</th>
                <th>Description</th>
                <th>Last Event Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="displayedRecords.length === 0">
                <td colspan="15" style="text-align: center; padding: 20px; color: #888;">No recent records found matching search criteria.</td>
              </tr>
              <tr v-for="(record, index) in displayedRecords" :key="index" class="table-row-hover" @click="openDetail(record)" style="cursor: pointer;">
                <td style="color: #333; font-weight: 500;">
                  {{ record.awb }}
                </td>
                <td style="color: #666; font-size: 12px; font-family: monospace; max-width: 150px; word-wrap: break-word;">
                  <div style="background: #f4f6f8; padding: 4px 8px; border-radius: 4px; border: 1px solid #e1e4e8;">
                    {{ record.oneRecordLo }}
                  </div>
                </td>
                <td style="color: #666;">{{ record.pouch }}</td>
                <td style="color: #666;">{{ record.sshc }}</td>
                <td style="color: #666;">{{ record.flight }}</td>
                <td style="color: #666;">{{ record.fltDate }}</td>
                <td style="color: #666;">{{ record.std }}</td>
                
                <!-- Status Icons -->
                <td style="text-align: center;">
                  <span v-if="record.mStatus === 'error'" class="badge badge-error">E</span>
                  <span v-else-if="record.mStatus === 'error-part'" class="badge badge-error-part">EP</span>
                  <span v-else-if="record.mStatus === 'view-part'" class="badge badge-view-part">VP</span>
                  <span v-else class="badge badge-none">-</span>
                </td>
                <td style="text-align: center;">
                  <span v-if="record.hmStatus === 'view'" class="badge badge-view">V</span>
                  <span v-else-if="record.hmStatus === 'error-part'" class="badge badge-error-part">EP</span>
                  <span v-else class="badge badge-none">-</span>
                </td>
                <td style="text-align: center;">
                  <span v-if="record.fStatus === 'none'" class="badge badge-none">-</span>
                </td>
                <td style="text-align: center;">
                  <span v-if="record.apStatus === 'folder'" class="badge badge-folder">F</span>
                </td>

                <td style="color: #666;">{{ record.pcs }}</td>
                <td style="color: #666;">{{ record.wgt }}</td>
                <td style="color: #666;">{{ record.desc }}</td>
                <td style="color: #666;">{{ record.lastEventTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="pagination-container">
            <span class="pagination-info">1-10 of 855 items</span>
            <div class="pagination-controls">
                <span style="color: #666;">Items per page</span>
                <select class="items-per-page"><option>10</option></select>
                <div class="page-numbers">
                    <span class="active">1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>...</span>
                    <span>9</span>
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

.page-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #1A8242;
  font-weight: bold;
  border-bottom: 2px solid #1A8242;
  padding-bottom: 10px;
}

.search-section {
  margin-bottom: 30px;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  color: #333;
}

.btn-search {
  background-color: #d1d1d1;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
}

.btn-search:hover {
  background-color: #b0b0b0;
}

.results-section {
  margin-top: 20px;
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.modern-table th {
  background-color: #f4f6f8;
  color: #333;
  font-weight: 600;
  text-align: left;
  padding: 12px 10px;
  border-bottom: none;
}

.modern-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.table-row-hover:hover {
  background-color: #fafafa;
}

.badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.badge-error, .badge-error-part {
  color: #d32f2f;
}

.badge-view, .badge-view-part {
  color: #1976d2;
}

.badge-folder {
  color: #8c8c8c;
}

.badge-none {
  color: transparent;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  font-size: 13px;
  color: #666;
  gap: 30px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.items-per-page {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-numbers span {
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.page-numbers span.active {
  background-color: #e0f7fa;
  color: #00796b;
  font-weight: bold;
}

</style>













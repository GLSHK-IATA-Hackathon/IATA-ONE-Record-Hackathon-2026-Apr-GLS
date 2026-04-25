<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppNavBar from '@/libs/component/common/AppNavBar.vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';

const route = useRoute();

const awb = ref(route.query.awb || '160-12345678');
const loid = ref(route.query.loid || 'fecbe019-f3d6-4436-ad35-66ce87a7d985');   
const activeTab = ref('DG Checking');
const showUploadSection = ref(false);
const showProceedBtn = ref(false);

const fullDocumentList = ref<string[]>([]);
const selectedFileName = ref('');

const docs = [
  { desc: "Shipper's Declaration for Dangerous Goods (DGD)", time: "2026-04-20 08:23:52" },
  { desc: "UN Test Summary", time: "2026-04-20 08:24:51" },
  { desc: "Packing List", time: "2026-04-22 10:45:12" },
  { desc: "Commercial Invoice", time: "2026-04-23 12:30:45" },
  { desc: "Certificate of Origin", time: "2026-04-24 14:05:18" },
  { desc: "Safety Data Sheet (SDS)", time: "2026-04-25 16:20:33" }
];

const fileInputRef = ref<HTMLInputElement | null>(null);

const triggerFileInput = () => {
    fileInputRef.value?.click();
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFileName.value = target.files[0].name;
    }
};

const handleUpload = () => {
    if (selectedFileName.value) {
        fullDocumentList.value.push(selectedFileName.value);
        selectedFileName.value = '';
        showProceedBtn.value = true;
        if (fileInputRef.value) {
            fileInputRef.value.value = '';
        }
    }
};
</script>

<template>
  <div class="dashboard-page">
    <AppHeader />
    <AppNavBar />

    <main class="main-content">
        <div class="page-header">
          <h2 class="page-title">Air Waybill Detail</h2>
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
                <span class="info-label">Status</span>
                <span class="info-val text-gray">In Progress</span>
            </div>
            <div class="action-buttons">
                <button class="btn btn-action">Accept</button>
                <button class="btn btn-action">Reject</button>
            </div>

            <div class="divider"></div>

            <h3 class="section-title">Special Handing Code Declaration</h3>
            <div class="info-row">
                <span class="info-label">Pouch Declare Code</span>
                <span class="info-val text-gray">EAW</span>
            </div>
            <div class="info-row">
                <span class="info-label">FWB Declare Code</span>
                <span class="info-val text-gray">EAW / SPX</span>
            </div>
            <div class="info-row">
                <span class="info-label">Booking Declare Code</span>
                <span class="info-val text-gray">EAW / SPX</span>
            </div>

            <div class="divider"></div>

            <h3 class="section-title">FOH</h3>
            <div class="info-row">
                <span class="info-label">Piece</span>
                <span class="info-val text-gray">34</span>
            </div>
            <div class="info-row">
                <span class="info-label">Weight</span>
                <span class="info-val text-gray">1013.00</span>
            </div>

            <div class="divider"></div>

            <h3 class="section-title">RCS</h3>
            <div class="info-row">
                <span class="info-label">Piece</span>
                <span class="info-val text-gray"></span>
            </div>
            <div class="info-row">
                <span class="info-label">Weight</span>
                <span class="info-val text-gray"></span>
            </div>
        </div>

        <!-- Right Panel -->
        <div class="right-panel">
            <div class="tabs-container">
                <button :class="['tab-btn', { active: activeTab === 'DG Checking' }]" @click="activeTab='DG Checking'">DG Checking</button>
                <button :class="['tab-btn', { active: activeTab === 'EyeBall Checking' }]" @click="activeTab='EyeBall Checking'">EyeBall Checking</button>
                <button :class="['tab-btn', { active: activeTab === 'Sanction Checking' }]" @click="activeTab='Sanction Checking'">Sanction Checking</button>
                <button :class="['tab-btn', { active: activeTab === 'Import & Export Commodity Checking' }]" @click="activeTab='Import & Export Commodity Checking'">Import & Export Commodity Checking</button>
            </div>

            <div class="table-container">
                <table class="detail-table">
                    <thead>
                        <tr>
                            <th style="width: 40%">Description</th>
                            <th>Uploaded Date Time</th>
                            <th style="text-align: right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(doc, idx) in docs" :key="idx" :class="{ 'alt-row': idx % 2 === 0 }">
                            <td style="font-weight: 500; color: #444;">{{ doc.desc }}</td>
                            <td class="text-gray">{{ doc.time }}</td>
                            <td style="text-align: right"><a href="#" class="view-link">View</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <button v-if="!showUploadSection" class="btn btn-upload" @click="showUploadSection = true">+ Upload more document button</button>

            <!-- Upload Section -->
            <div v-if="showUploadSection" class="upload-section">
                <div class="upload-title">Upload File</div>
                <div class="upload-subtitle">Support 1 file only, in <strong>.pdf, .jpg, .png</strong> formats, up to <strong>20 MB</strong>.</div>
                
                                <div class="upload-form">
                    <span class="file-label">File Name</span>
                    <div class="file-input-group">
                        <input type="file" ref="fileInputRef" style="display: none;" @change="handleFileChange" accept=".pdf,.jpg,.png" />
                        <button class="btn btn-browse" @click="triggerFileInput">
                           <svg style="width: 12px; height: 12px; margin-right: 4px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                           Browse File
                        </button>
                        <input type="text" class="file-text-input" placeholder="" :value="selectedFileName" readonly />
                        <button class="btn btn-do-upload" @click="handleUpload">Upload</button>
                    </div>
                </div>

                <div v-if="fullDocumentList.length > 0" class="upload-list-container">
                    <div class="divider"></div>
                    <div class="upload-list-title">Full Document List</div>
                    <ol class="upload-list">
                        <li v-for="(fileName, index) in fullDocumentList" :key="index">
                            {{ fileName }}
                        </li>
                    </ol>
                </div>
              </div>
              
              <div class="proceed-action" v-if="showProceedBtn">
                  <button class="btn btn-proceed">Proceed DG Auto Check</button>
              </div>
          </div>

        </div>
      </main>

      <AppFooter />
    </div>
  </template><style scoped>
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

.action-buttons {
  display: flex;
  gap: 14px;
  margin-bottom: 5px;
}

.btn {
  cursor: pointer;
  outline: none;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  border-radius: 2px;
}

.btn-action {
  flex: 1;
  padding: 6px 0;
  background: #fff;
  border: 1px solid #ccc;
  font-size: 11px;
  color: #333;
  font-weight: 600;
}

.btn-action:hover {
  background: #f9f9f9;
}

/* Right Panel */
.right-panel {
  flex: 1;
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

.view-link {
  color: #00BCD4;
  text-decoration: none;
  font-weight: 500;
}

.view-link:hover {
  text-decoration: underline;
}

.btn-upload {
  padding: 8px 16px;
  background: #fff;
  border: 1px solid #ccc;
  color: #333;
  font-size: 11px;
}

.btn-upload:hover {
  background: #f4f4f4;
}

.upload-section {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.upload-title {
  font-size: 12px;
  font-weight: 600;
  color: #555;
  margin-bottom: 6px;
}

.upload-subtitle {
  font-size: 11px;
  color: #888;
  margin-bottom: 16px;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.file-label {
  font-size: 11px;
  color: #666;
}

.file-input-group {
  display: flex;
  align-items: stretch;
  gap: 0;
  border: 1px solid #ccc;
  border-radius: 2px;
  overflow: hidden;
  max-width: 500px;
}

.btn-browse {
  border: none;
  background: #fff;
  padding: 6px 12px;
  font-size: 11px;
  color: #1A8242;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-right: 1px solid #ccc;
}

.btn-browse:hover {
  background: #f9f9f9;
}

.file-text-input {
  flex: 1;
  border: none;
  padding: 0 10px;
  font-size: 11px;
  color: #333;
  outline: none;
  background: #fff;
}

.btn-do-upload {
  border: none;
  background-color: #7cb342;
  color: #fff;
  padding: 0 16px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
}

.btn-do-upload:hover {
  background-color: #689f38;
}
.upload-list-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-top: 16px;
  margin-bottom: 12px;
}

.upload-list {
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
  color: #555;
  line-height: 1.8;
}

.proceed-action {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-proceed {
  background-color: #7cb342;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 2px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
}

.btn-proceed:hover {
  background-color: #689f38;
}
</style>


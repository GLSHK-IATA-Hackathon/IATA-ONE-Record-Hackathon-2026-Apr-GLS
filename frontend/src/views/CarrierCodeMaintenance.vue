<script setup lang="ts">
import { ref } from 'vue';
import AppHeader from '@/libs/component/common/AppHeader.vue';
import AppFooter from '@/libs/component/common/AppFooter.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const searchParams = ref({
  awbNumber: '',
  logisticsObject: ''
});

const allRecords = ref([
  { awb: '160-52711536', oneRecordLo: 'fecbe019-f3d6-4436-ad35-66ce87a7d985', pouch: 'EAW', shc: '', flight: 'CX366', flightDate: '04 Mar', std: '', pcs: '2', wgt: '15.0K', desc: 'CONSOL SHI..', lastEventTime: '15 May 10:25' },
  { awb: '160-52711540', oneRecordLo: '2cd2f6a9-8356-42d8-af5e-b2d9c02ff3cf', pouch: 'EAW', shc: '', flight: 'CX366', flightDate: '04 Mar', std: '', pcs: '42', wgt: '507.0K', desc: 'CONSOL SHI..', lastEventTime: '16 May 14:43' },
  { awb: '160-10448690', oneRecordLo: '7a2f1b40-8c29-4d6d-9286-a51b5e282b8a', pouch: '', shc: '', flight: 'CX472', flightDate: '29 Apr', std: '29 Apr 15:45', pcs: '1', wgt: '10.2K', desc: 'CONSOL', lastEventTime: '19 May 12:01' },
  { awb: '160-10193341', oneRecordLo: '3c8e4f1a-b615-492c-ad2f-e8b91a78370f', pouch: 'EAW', shc: '', flight: 'CX366', flightDate: '01 Sep', std: '', pcs: '1', wgt: '1.0K', desc: 'CONSOL', lastEventTime: '29 Aug 16:27' },
  { awb: '160-33333322', oneRecordLo: 'c5d18196-1c4b-4f9e-bbb8-9e5c467a1ac5', pouch: 'EAW', shc: '', flight: 'CX1234', flightDate: '21 Nov', std: '', pcs: '1', wgt: '123.0K', desc: 'GOODS', lastEventTime: '03 Sep 16:13' },
  { awb: '160-52001176', oneRecordLo: '8b4566c3-98af-48ce-85de-ff5b9bd60803', pouch: 'EAP', shc: '', flight: 'CX100', flightDate: '08 Sep', std: '', pcs: '1', wgt: '11.5K', desc: 'TESTTESTTE..', lastEventTime: '08 Sep 09:39' },
  { awb: '160-10314942', oneRecordLo: 'd22dcc1a-55f7-4184-baa5-cf3072fb689d', pouch: 'EAW', shc: '', flight: 'CX705', flightDate: '29 Apr', std: '', pcs: '1', wgt: '100.0K', desc: 'BATTERY', lastEventTime: '12 Sep 10:51' },
  { awb: '160-10744344', oneRecordLo: '68de1037-3fd9-4ea0-8b17-76fa42861a29', pouch: '', shc: '', flight: 'CX500', flightDate: '24 Sep', std: '24 Sep 15:10', pcs: '10', wgt: '100.0K', desc: 'CCC', lastEventTime: '24 Sep 09:39' },
  { awb: '160-10730602', oneRecordLo: 'e9bc6625-f5b2-4d7a-8d76-5835b0baf055', pouch: '', shc: '', flight: 'CX504', flightDate: '24 Sep', std: '24 Sep 09:05', pcs: '1', wgt: '1.0K', desc: 'CCCC', lastEventTime: '24 Sep 09:49' },
  { awb: '160-10730613', oneRecordLo: '11a141aa-8be2-4467-91ac-73c3e80d287a', pouch: '', shc: '', flight: 'CX504', flightDate: '23 Sep', std: '23 Sep 09:05', pcs: '1', wgt: '1.0K', desc: 'CCCC', lastEventTime: '24 Sep 09:58' }
]);

const displayedRecords = ref([...allRecords.value]);

const triggerSearch = () => {
  const pAwb = searchParams.value.awbNumber.toLowerCase();
  const pLO = searchParams.value.logisticsObject.toLowerCase();

  displayedRecords.value = allRecords.value.filter(record => {
    const matchAwb = pAwb ? record.awb.toLowerCase().includes(pAwb) : true;
    const matchLO = pLO ? record.oneRecordLo.toLowerCase().includes(pLO) : true;
    return matchAwb && matchLO;
  });
};

const goToDetail = (record: any) => {
  router.push({
    path: '/carrier-code/detail',
    query: {
      awb: record.awb,
      loid: record.oneRecordLo
    }
  });
};
</script>

<template>
  <div class="dashboard-page">
    <AppHeader />

    <!-- Navigation Bar -->
    <nav class="nav-bar">
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
      <h2 class="page-title" style="color: #1A8242; font-weight: bold; font-size: 24px; border-bottom: 2px solid #1A8242; padding-bottom: 10px; margin-bottom: 20px;">Carrier code Maintenance</h2>

      <!-- Search Section -->
      <section class="search-section">
        <div class="form-row" style="display: flex; gap: 20px; align-items: flex-end; margin-bottom: 20px;">
          <div class="form-group" style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; color: #6B8080;">Air Waybill Number</label>
            <input type="text" v-model="searchParams.awbNumber" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter Air Waybill Number" />
          </div>
          <div class="form-group" style="flex: 1;">
            <label style="display: block; margin-bottom: 5px; color: #6B8080;">Logistics Object</label>
            <input type="text" v-model="searchParams.logisticsObject" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;" placeholder="Enter Logistics Object" />
          </div>
          <div class="form-group" style="flex-shrink: 0;">
            <button @click="triggerSearch" style="padding: 8px 16px; background-color: #1A8242; color: white; border: none; border-radius: 4px; cursor: pointer;">Search</button>
          </div>
        </div>
        
        <!-- Table Section -->
        <div class="table-section" style="background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead style="background-color: #f9f9f9; color: #333;">
              <tr>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">AWB No. & 1R LO</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">Pouch</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">SHC</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">Flight</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">Flight Date</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">STD</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">PCS</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">WGT</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">Description</th>
                <th style="padding: 12px 15px; border-bottom: 2px solid #1A8242; text-align: left;">Last Event Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in displayedRecords" :key="record.oneRecordLo" @click="goToDetail(record)" style="cursor: pointer; cursor: hand; transition: background 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">
                  <div style="font-weight: 600; color: #333;">{{ record.awb }}</div>
                  <div style="margin-top: 4px; font-family: monospace; font-size: 11px; color: #666; background: #f4f6f8; padding: 2px 6px; border-radius: 4px; display: inline-block;">{{ record.oneRecordLo }}</div>
                </td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.pouch }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.shc }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.flight }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.flightDate }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.std }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.pcs }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.wgt }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.desc }}</td>
                <td style="padding: 10px 15px; border-bottom: 1px solid #eee;">{{ record.lastEventTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; padding: 10px 0;">
          <a href="#" style="color: #0ea5e9; text-decoration: none; display: flex; align-items: center; gap: 5px;">
            <span style="font-size: 18px; line-height: 1;">⊕</span> Add new Record
          </a>
          
          <div style="display: flex; align-items: center; gap: 15px; color: #6B8080; font-size: 14px;">
            <span>1-10 of 855 items</span>
            <div style="display: flex; align-items: center; gap: 5px;">
              <span>Items per page</span>
              <select style="padding: 2px 5px; border: 1px solid #ccc; border-radius: 4px;">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
            <div style="display: flex; gap: 10px;">
              <span style="color: #0ea5e9; font-weight: bold; background: #e0f2fe; padding: 2px 8px; border-radius: 4px;">1</span>
              <span style="cursor: pointer;">2</span>
              <span style="cursor: pointer;">3</span>
              <span style="cursor: pointer;">4</span>
              <span>...</span>
              <span style="cursor: pointer;">9</span>
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

.page-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 22px;
  color: #222;
}
</style>

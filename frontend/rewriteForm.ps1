$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue"
$content = Get-Content $file -Raw

$oldForm = '(?s)<!-- Search Section -->.*?<!-- Results Section -->'
$newForm = @"
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
"@

$content = $content -replace $oldForm, $newForm

Set-Content -Path $file -Value $content

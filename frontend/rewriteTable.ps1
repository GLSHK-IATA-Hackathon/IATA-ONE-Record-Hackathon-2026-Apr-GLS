$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue"
$content = Get-Content $file -Raw

$oldTable = '(?s)<section class="card results-card">.*?<tbody>.*?</tbody>\s*</table>\s*</div>\s*</section>'

$newTable = @"
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
              <tr v-for="(record, index) in displayedRecords" :key="index" class="table-row-hover">
                <td style="color: #333; cursor: pointer;" @click="openOffCanvas(record)">{{ record.awb }}</td>
                <td style="color: #666; font-size: 13px;">{{ record.oneRecordLo }}</td>
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
"@

$content = $content -replace $oldTable, $newTable

Set-Content -Path $file -Value $content

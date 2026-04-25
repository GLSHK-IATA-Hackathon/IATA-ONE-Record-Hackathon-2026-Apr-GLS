$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue"
$content = Get-Content $file -Raw

$oldRecords = '(?s)const allRecords = \[\s*\{ chk: false, awb: ''160-52711536''.*?\];'

$newRecords = @"
const allRecords = [
  { chk: false, awb: '160-52711536', oneRecordLo: 'fecbe019-f3d6-4436-ad35-66ce87a7d985', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: 'SHC', flight: 'CX366', fltDate: '2026-04-26', std: '2026-04-26 19:21', mStatus: 'error', hmStatus: 'view', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '2', wgt: '15.5 K', desc: 'Battery', lastEventTime: '2026-04-24 10:23' },
  { chk: false, awb: '160-52711540', oneRecordLo: '2cd2f6a9-8c29-4d6d-9286-a51b5e282b8a', hasIconPencil: true, hasIconBox: true, pouch: 'EAP', sshc: '', flight: 'CX366', fltDate: '2026-04-26', std: '2026-04-26 19:21', mStatus: 'error', hmStatus: 'view', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '42', wgt: '507.0 K', desc: 'CONSOL', lastEventTime: '2026-04-24 14:43' },
  { chk: false, awb: '160-10448690', oneRecordLo: '7a2f1b40-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: '', sshc: 'VAL', flight: 'CX472', fltDate: '2026-04-29', std: '2026-04-29 15:45', mStatus: 'error', hmStatus: 'none', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'TPE', pcs: '1', wgt: '10.2 K', desc: 'CONSOL', lastEventTime: '2026-04-28 12:01' },
  { chk: false, awb: '160-10193341', oneRecordLo: '3c8e4f1a-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', flight: 'CX366', fltDate: '2026-09-01', std: '', mStatus: 'error-part', hmStatus: 'error-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'PVG', pcs: '1', wgt: '1.0 K', desc: 'CONSOL', lastEventTime: '2026-08-29 16:27' },
  { chk: false, awb: '160-33333322', oneRecordLo: 'c5d18196-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', flight: 'CX1234', fltDate: '2026-11-21', std: '', mStatus: 'view-part', hmStatus: 'view-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'BKK', pcs: '1', wgt: '123.0 K', desc: 'GOODS', lastEventTime: '2026-09-03 16:13' },
  { chk: false, awb: '160-52001176', oneRecordLo: '8b4566c3-b615-492c-ad2f-e8b91a78370f', hasIconPencil: false, hasIconBox: true, pouch: 'EAP', sshc: '', flight: 'CX100', fltDate: '2026-09-08', std: '', mStatus: 'error-part', hmStatus: 'none', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'TPE', pcs: '1', wgt: '11.5 K', desc: 'TEST', lastEventTime: '2026-09-08 09:39' },
  { chk: false, awb: '160-10314942', oneRecordLo: 'd22dcc1a-b615-492c-ad2f-e8b91a78370f', hasIconPencil: true, hasIconBox: true, pouch: 'EAW', sshc: '', flight: 'CX705', fltDate: '2026-04-29', std: '', mStatus: 'error-file', hmStatus: 'error-part', fStatus: 'none', apStatus: 'folder', org: 'HKG', dest: 'BKK', pcs: '1', wgt: '100.0 K', desc: 'BATTERY', lastEventTime: '2026-04-28 10:51' },
];
"@

$content = $content -replace $oldRecords, $newRecords


$oldCol = '<td style="color: #666; font-size: 13px;">{{ record.oneRecordLo }}</td>'
$newCol = @"
<td style="color: #666; font-size: 12px; font-family: monospace; max-width: 150px; word-wrap: break-word;">
                  <div style="background: #f4f6f8; padding: 4px 8px; border-radius: 4px; border: 1px solid #e1e4e8;">
                    {{ record.oneRecordLo }}
                  </div>
                </td>
"@

$content = $content -replace $oldCol, $newCol

Set-Content -Path $file -Value $content

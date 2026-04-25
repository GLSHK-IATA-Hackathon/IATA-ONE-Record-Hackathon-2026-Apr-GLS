$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\libs\component\common\RecordOffcanvas.vue"
$content = Get-Content $file -Raw

$oldGrid = '<div class="oc-header-grid">'
$newGrid = @"
<div class="oc-header-grid">
            <div class="oc-stat-item" style="grid-column: span 4; background-color: #f7f9fc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 8px;">
              <span class="oc-stat-label" style="color: #1A8242; font-weight: 600;">1R (ONE Record) LO ID</span>
              <span class="oc-stat-value" style="font-family: monospace; word-break: break-all; color: #444; font-size: 14px;">{{ recordData.oneRecordLo || 'N/A' }}</span>
            </div>
"@

$content = $content -replace $oldGrid, $newGrid
Set-Content -Path $file -Value $content

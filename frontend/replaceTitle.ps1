$files = @(
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\CarrierCodeMaintenance.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\Dashboard.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\DashboardDetail.vue"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Replace nav-bar title
        $content = $content -replace '<span @click="navigate">Shipment Performance Monitor</span>', '<span @click="navigate">Cargo iQ</span>'
        
        # Replace page title in Dashboard.vue
        if ($file -match 'Dashboard\.vue$') {
            $content = $content -replace '<h2 class="page-title">Shipment Performance Monitor</h2>', '<h2 class="page-title">Shipment Performance (Cargo iQ)</h2>'
        }
        
        Set-Content -Path $file -Value $content
        Write-Host "Updated $file"
    }
}

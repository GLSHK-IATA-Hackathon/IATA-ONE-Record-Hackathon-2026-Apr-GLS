$style = @"
.page-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #1A8242;
  font-weight: bold;
  border-bottom: 2px solid #1A8242;
  padding-bottom: 10px;
}
"@

$files = @(
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\CarrierCodeMaintenance.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\Dashboard.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\DashboardDetail.vue"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Check if the file already has .page-title class
        if ($content -match '(?s)\.page-title\s*\{.*?\}') {
            $content = $content -replace '(?s)\.page-title\s*\{.*?\}', $style
            Set-Content -Path $file -Value $content
            Write-Host "Updated $file"
        } else {
            # Add it to the end of the style block for DashboardDetail if missing
            $content = $content -replace '</style>', "$style
</style>"
            Set-Content -Path $file -Value $content
            Write-Host "Added to $file"
        }
    }
}

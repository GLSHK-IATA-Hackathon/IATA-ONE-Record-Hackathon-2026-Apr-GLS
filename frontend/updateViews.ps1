$files = @(
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\CarrierCodeMaintenance.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\Dashboard.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue",
  "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\DashboardDetail.vue"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        # Replace the HTML <nav class="nav-bar"> bloc
        $content = $content -replace '(?s)\s*<!-- Navigation Bar -->.*?</nav>', "
    <AppNavBar />"
        $content = $content -replace '(?s)\s*<nav class="nav-bar">.*?</nav>', "
    <AppNavBar />"
        
        # Add import if missing
        if ($content -notmatch 'AppNavBar\.vue') {
            $content = $content -replace 'import AppHeader from ', "import AppNavBar from @/libs/component/common/AppNavBar.vue;
import AppHeader from "
        }

        # Remove the scoped css for nav-bar
        $content = $content -replace '(?s)\s*/\* Nav Bar \*/.*?\.nav-bar span \{.*?\}', ""
        $content = $content -replace '(?s)\s*\.nav-bar \{.*?\}.*?\.nav-bar span \{.*?\}', ""

        Set-Content -Path $file -Value $content
        Write-Host "Updated $file"
    }
}

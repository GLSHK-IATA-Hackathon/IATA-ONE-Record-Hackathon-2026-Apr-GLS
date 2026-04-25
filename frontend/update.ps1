$newNav = @"
    <nav class="nav-bar">
      <router-link to="/shipment-list" custom v-slot="{ navigate }">
        <span @click="navigate">Shipment List</span>
      </router-link>
      <router-link to="/dashboard" custom v-slot="{ navigate }">
        <span @click="navigate">Shipment Performance Monitor</span>
      </router-link>
      <router-link to="/carrier-code" custom v-slot="{ navigate }">
        <span @click="navigate">Carrier code Maintenance</span>
      </router-link>
      <span>Terminal</span>
      <span>Airline</span>
    </nav>
"@

$files = Get-ChildItem "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\*.vue"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    if ($content -match '(?s)(<nav class="nav-bar">.*?</nav>)') {
        $content = $content -replace '(?s)<nav class="nav-bar">.*?</nav>', $newNav
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Updated $($file.Name)"
    }
}

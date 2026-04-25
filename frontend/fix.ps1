$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\TrackShipment.vue"
$content = Get-Content $file -Raw
$content = $content -replace '(?s)</style>.*', '</style>'
Set-Content -Path $file -Value $content

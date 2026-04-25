$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\router\routes.ts"
$content = Get-Content $file -Raw
$content = $content -replace 'import HelloWorld from @/views/HelloWorld\.vue'\s*', ''
$content = $content -replace '(?s)\{\s*path:\s*''hello-world'',\s*name:\s*''HelloWorld'',\s*component:\s*HelloWorld\s*\},', ''
Set-Content -Path $file -Value $content

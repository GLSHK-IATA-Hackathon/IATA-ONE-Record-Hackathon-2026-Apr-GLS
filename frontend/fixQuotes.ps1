$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\DashboardDetail.vue"
$content = Get-Content $file -Raw
$content = $content -replace 'import AppNavBar from @/libs/component/common/AppNavBar.vue;', "import AppNavBar from '@/libs/component/common/AppNavBar.vue';"
$content = $content -replace 'import AppHeader from @/libs/component/common/AppHeader.vue;', "import AppHeader from '@/libs/component/common/AppHeader.vue';"
$content = $content -replace 'import AppFooter from @/libs/component/common/AppFooter.vue;', "import AppFooter from '@/libs/component/common/AppFooter.vue';"
Set-Content -Path $file -Value $content

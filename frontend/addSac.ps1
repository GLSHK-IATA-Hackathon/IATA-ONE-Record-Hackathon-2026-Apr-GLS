$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\Dashboard.vue"
$content = Get-Content $file -Raw

$oldStr = '(?s)\{ code: ''LAT'', status: ''complete'', pDate: ''24Apr 05:50'', mDate: ''22Apr 12:46'', aDate: ''22Apr 12:45'' \},\s*\{ code: ''RCS'''
$newStr = @"
{ code: 'LAT', status: 'complete', pDate: '24Apr 05:50', mDate: '22Apr 12:46', aDate: '22Apr 12:45' },
      { code: 'SAC', status: 'complete', pDate: '24Apr 05:50', mDate: '22Apr 12:46', aDate: '22Apr 12:45' },
      { code: 'RCS'
"@

$content = $content -replace $oldStr, $newStr
Set-Content -Path $file -Value $content

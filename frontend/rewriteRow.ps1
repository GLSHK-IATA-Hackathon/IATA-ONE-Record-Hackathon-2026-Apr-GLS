$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\Dashboard.vue"
$content = Get-Content $file -Raw

$oldRow = '(?s)\{\s*awb:\s*''160-98765432''.*?\]\s*\}'
$newRow = @"
{
      awb: '160-98765432',
      oneRecordLo: '7a2f1b40-8c29-4d6d-9286-a51b5e282b8a',
      source: 'API',
      hse: '2',
      flightDate: '2026-04-27',
      origin: 'SIN',
      destination: 'FRA',
      status: 'Accepted',
      print: 'Y',
      shipper: 'Global Freight',
      consignee: 'Euro Cargo',
      user: 'system',
      lastUpdate: '2026-04-25 11:30',
      routeMap: [
        { code: 'FWB', status: 'complete', pDate: '25Apr 05:45', mDate: '-', aDate: '-' },
        { code: 'LAT', status: 'complete', pDate: '25Apr 05:50', mDate: '-', aDate: '-' },
        { code: 'SAC', status: 'discrepancy', pDate: '25Apr 05:50', mDate: '-', aDate: '-' },
        { code: 'RCS', status: 'new', pDate: '25Apr 05:50', mDate: '-', aDate: '-' },
        { code: 'FOW', status: 'new', pDate: '25Apr 07:20', mDate: '-', aDate: '-' },
        { code: 'DEP', status: 'new', pDate: '25Apr 09:20', mDate: '-', aDate: '-' },
        { isFlight: true, from: 'SIN', to: 'FRA', flightNo: 'SQ326', sDate: '26Apr 14:00', aDate: '-' },
        { code: 'ARR', status: 'new', pDate: '26Apr 21:00', mDate: '-', aDate: '-' },
        { code: 'RCF', status: 'new', pDate: '26Apr 22:05', mDate: '-', aDate: '-' },
        { code: 'NFD', status: 'new', pDate: '26Apr 22:35', mDate: '-', aDate: '-' },
        { code: 'AWD', status: 'new', pDate: '26Apr 22:35', mDate: '-', aDate: '-' },
        { code: 'DLV', status: 'new', pDate: '27Apr 10:05', mDate: '-', aDate: '-' }
      ],
      events: [
        { code: 'FWB', desc: 'Creation of MAWB', time: '25 Apr 05:45' },
        { code: 'LAT', desc: 'Latest Acceptance Time', time: '25 Apr 05:50' },
        { code: 'SAC', desc: 'Security Autocheck Failed', time: '25 Apr 05:50' }
      ]
    }
"@

$content = $content -replace $oldRow, $newRow
Set-Content -Path $file -Value $content

$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\Dashboard.vue"
$content = Get-Content $file -Raw

$oldRow = '(?s)\{\s*awb:\s*''160-55554444''.*?\]\s*\}'
$newRow = @"
{
      awb: '160-55554444',
      oneRecordLo: '3c8e4f1a-b615-492c-ad2f-e8b91a78370f',
      source: 'Manual',
      hse: '1',
      flightDate: '2026-04-28',
      origin: 'NRT',
      destination: 'JFK',
      status: 'Delivered',
      print: 'Y',
      shipper: 'Tokyo Exp',
      consignee: 'NY Dist',
      user: 'jl',
      lastUpdate: '2026-04-28 10:15',
      routeMap: [
        { code: 'FWB', status: 'complete', pDate: '27Apr 05:45', mDate: '-', aDate: '-' },
        { code: 'LAT', status: 'complete', pDate: '27Apr 05:50', mDate: '27Apr 05:48', aDate: '27Apr 05:48' },
        { code: 'SAC', status: 'complete', pDate: '27Apr 05:50', mDate: '27Apr 05:48', aDate: '27Apr 05:48' },
        { code: 'RCS', status: 'complete', pDate: '27Apr 05:50', mDate: '27Apr 05:50', aDate: '27Apr 05:50' },
        { code: 'FOW', status: 'complete', pDate: '27Apr 07:20', mDate: '-', aDate: '-' },
        { code: 'DEP', status: 'complete', pDate: '27Apr 09:20', mDate: '-', aDate: '-' },
        { isFlight: true, from: 'NRT', to: 'JFK', flightNo: 'JL006', sDate: '27Apr 11:20', aDate: '28Apr 10:10' },
        { code: 'ARR', status: 'complete', pDate: '28Apr 10:50', mDate: '-', aDate: '-' },
        { code: 'RCF', status: 'complete', pDate: '28Apr 13:05', mDate: '-', aDate: '-' },
        { code: 'NFD', status: 'complete', pDate: '28Apr 13:05', mDate: '-', aDate: '-', bDate: '28Apr 13:05' },
        { code: 'AWD', status: 'complete', pDate: '28Apr 12:35', mDate: '-', aDate: '-' },
        { code: 'DLV', status: 'complete', pDate: '28Apr 15:05', mDate: '-', aDate: '-' }
      ],
      events: [
        { code: 'FWB', desc: 'Creation of MAWB', time: '27 Apr 05:45' },
        { code: 'LAT', desc: 'Latest Acceptance Time', time: '27 Apr 05:50' },
        { code: 'SAC', desc: 'Security Autocheck Passed', time: '27 Apr 05:50' },
        { code: 'RCS', desc: 'Consignment received', time: '27 Apr 05:50' },
        { code: 'FOW', desc: 'Freight Out of Warehouse', time: '27 Apr 07:20' },
        { code: 'DEP', desc: 'Departed', time: '27 Apr 09:20' },
        { code: 'ARR', desc: 'Arrived', time: '28 Apr 10:50' },
        { code: 'RCF', desc: 'Received at Flight', time: '28 Apr 13:05' },
        { code: 'NFD', desc: 'Notified', time: '28 Apr 13:05' },
        { code: 'AWD', desc: 'Available for Delivery', time: '28 Apr 12:35' },
        { code: 'DLV', desc: 'Delivered', time: '28 Apr 15:05' }
      ]
    }
"@

$content = $content -replace $oldRow, $newRow
Set-Content -Path $file -Value $content

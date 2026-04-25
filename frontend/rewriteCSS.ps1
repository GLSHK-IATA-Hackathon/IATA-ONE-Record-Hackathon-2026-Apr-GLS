$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue"
$content = Get-Content $file -Raw

$oldStyle = '(?s)<style scoped>.*?</style>'
$newStyle = @"
<style scoped>
.dashboard-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 30px 40px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.page-title {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
  color: #1A8242;
  font-weight: bold;
  border-bottom: 2px solid #1A8242;
  padding-bottom: 10px;
}

.search-section {
  margin-bottom: 30px;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  color: #666;
  font-weight: 500;
}

.form-group input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  color: #333;
}

.btn-search {
  background-color: #d1d1d1;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  padding: 8px;
}

.btn-search:hover {
  background-color: #b0b0b0;
}

.results-section {
  margin-top: 20px;
}

.table-container {
  overflow-x: auto;
}

.modern-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.modern-table th {
  background-color: #f4f6f8;
  color: #333;
  font-weight: 600;
  text-align: left;
  padding: 12px 10px;
  border-bottom: none;
}

.modern-table td {
  padding: 12px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.table-row-hover:hover {
  background-color: #fafafa;
}

.badge {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
}

.badge-error, .badge-error-part {
  color: #d32f2f;
}

.badge-view, .badge-view-part {
  color: #1976d2;
}

.badge-folder {
  color: #8c8c8c;
}

.badge-none {
  color: transparent;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  font-size: 13px;
  color: #666;
  gap: 30px;
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.items-per-page {
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
}

.page-numbers {
  display: flex;
  gap: 8px;
}

.page-numbers span {
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
}

.page-numbers span.active {
  background-color: #e0f7fa;
  color: #00796b;
  font-weight: bold;
}

</style>
"@

$content = $content -replace $oldStyle, $newStyle

Set-Content -Path $file -Value $content

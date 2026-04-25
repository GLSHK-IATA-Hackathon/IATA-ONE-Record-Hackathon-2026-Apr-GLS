$file = "c:\IATA-ONE-Record-Hackathon-2026-Apr-GLS-main\IATA-ONE-Record-Hackathon-2026-Apr-GLS\frontend\src\views\ShipmentList.vue"
$content = Get-Content $file -Raw

# Add useRouter import
$content = $content -replace 'import \{ ref \} from ''vue'';', "import { ref } from 'vue';
import { useRouter } from 'vue-router';"

# Replace openOffCanvas implementation
$oldFunc = 'const isOffCanvasOpen = ref\(false\);\s*const selectedRecordData = ref<any>\(null\);\s*const openOffCanvas = \(record: any\) => \{\s*selectedRecordData\.value = record;\s*isOffCanvasOpen\.value = true;\s*\};'

$newFunc = @"
const isOffCanvasOpen = ref(false);
const selectedRecordData = ref<any>(null);

const router = useRouter();

const openDetail = (record: any) => {
  router.push({ path: '/dashboard/detail', query: { awb: record.awb, loid: record.oneRecordLo } });
};
"@

$content = $content -replace $oldFunc, $newFunc

# Replace template handler
$content = $content -replace '@click="openOffCanvas\(record\)"', '@click="openDetail(record)"'

Set-Content -Path $file -Value $content

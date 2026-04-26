<script setup lang="ts">

import { computed, nextTick, ref, watch } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  recordData: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['update:isOpen']);

const closeOffCanvas = () => {
  emit('update:isOpen', false);
};

const defaultRouteMap = [
  { code: 'FWB', status: 'complete', pDate: '24Apr 05:45', mDate: '-', aDate: '-' },
  { code: 'LAT', status: 'complete', pDate: '24Apr 05:50', mDate: '22Apr 12:46', aDate: '22Apr 12:45' },
  { code: 'RCS', status: 'complete', pDate: '24Apr 05:50', mDate: '22Apr 12:46', aDate: '22Apr 12:46' },
  { code: 'FOW', status: 'missing', pDate: '24Apr 07:20', mDate: '-', aDate: '-' },
  { code: 'DEP', status: 'missing', pDate: '24Apr 09:20', mDate: '-', aDate: '-' },
  { isFlight: true, from: 'HKG', to: 'SGN', flightNo: 'VN595', sDate: '24Apr 08:20', aDate: '-' },
  { code: 'ARR', status: 'missing', pDate: '24Apr 10:50', mDate: '-', aDate: '-' },
  { code: 'RCF', status: 'missing', pDate: '24Apr 13:05', mDate: '-', aDate: '-' },
  { code: 'NFD', status: 'missing', pDate: '24Apr 13:05', mDate: '-', aDate: '-', bDate: '24Apr 13:05' },
  { code: 'AWD', status: 'missing', pDate: '24Apr 12:35', mDate: '-', aDate: '-' },
  { code: 'DLV', status: 'new', pDate: '26Apr 10:05', mDate: '-', aDate: '-' }
];

const defaultEvents = [
  { code: 'RCS', desc: 'Consignment received from shipper or agent', time: '05 Jun 10:10' },
  { code: 'PUP', desc: 'Pickup from shipper', time: '24 Jun 10:38' },
  { code: 'REW', desc: 'Received Export Warehouse', time: '24 Jun 10:58' },
  { code: 'DEW', desc: 'Departed Export Warehouse', time: '24 Jun 11:15' },
  { code: 'REH', desc: 'Received Export Hub', time: '24 Jun 11:32' },
  { code: 'DEH', desc: 'Departed Export Hub', time: '24 Jun 12:07' }
];

const routeMapWrapper = ref<HTMLElement | null>(null);

const resetRouteMapScroll = async () => {
  await nextTick();
  if (routeMapWrapper.value) {
    routeMapWrapper.value.scrollLeft = 0;
  }
};

watch(
  () => [props.isOpen, props.recordData],
  ([isOpen]) => {
    if (isOpen) {
      resetRouteMapScroll();
    }
  }
);

const displayRouteMap = computed(() => {
  return props.recordData?.routeMap || defaultRouteMap;
});

const displayEvents = computed(() => {
  return props.recordData?.events || defaultEvents;
});
</script>

<template>
  <div>
    <div class="offcanvas-overlay" v-if="isOpen" @click="closeOffCanvas"></div>
    <div :class="['offcanvas', { 'is-open': isOpen }]">
      <div v-if="recordData" class="offcanvas-content">
        <button class="btn-close" @click="closeOffCanvas">X</button>
        
        <!-- Header Info -->
        <div class="oc-header-grid">
            <div class="oc-stat-item" style="grid-column: span 4; background-color: #f7f9fc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; margin-bottom: 8px;">
              <span class="oc-stat-label" style="color: #1A8242; font-weight: 600;">1R (ONE Record) LO ID</span>
              <span class="oc-stat-value" style="font-family: monospace; word-break: break-all; color: #444; font-size: 14px;">{{ recordData.oneRecordLo || 'N/A' }}</span>
            </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">AWB</span>
            <span class="oc-stat-value">{{ recordData.awb }}</span>
          </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">Origin</span>
            <span class="oc-stat-value">{{ recordData.origin }}</span>
          </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">Destination</span>
            <span class="oc-stat-value">{{ recordData.destination }}</span>
          </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">Product</span>
            <span class="oc-stat-value" style="opacity: 0.5;">{{ recordData.awb }}</span>
          </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">Total Pieces</span>
            <span class="oc-stat-value">4</span>
          </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">Total Weight</span>
            <span class="oc-stat-value">4299 KG</span>
          </div>
          <div class="oc-stat-item">
            <span class="oc-stat-label">Total Volume</span>
            <span class="oc-stat-value">0</span>
          </div>
        </div>

        <!-- Route Map -->
        <div class="oc-section">
          <h4 class="oc-section-title">Route Map</h4>

          <!-- Legend -->
          <div class="oc-legend">
            <span class="legend-item"><span class="legend-dot status-new"></span>New</span>
            <span class="legend-item"><span class="legend-dot status-missing"></span>Missing</span>
            <span class="legend-item"><span class="legend-dot status-complete"></span>Complete</span>
            <span class="legend-item"><span class="legend-dot status-partial"></span>Partial Complete</span>
            <span class="legend-item"><span class="legend-dot status-discrepancy"></span>Discrepancy</span>
          </div>

          <div ref="routeMapWrapper" class="oc-card route-map-wrapper">
            <div class="route-map-container">
              <template v-for="(milestone, idx) in displayRouteMap" :key="idx">
                
                <!-- Flight segment node -->
                <div v-if="milestone.isFlight" class="route-flight-segment">
                  <div class="flight-visual">
                    <span class="flight-city">{{ milestone.from }}</span>
                    <div class="flight-line">
                      <svg class="flight-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                      </svg>
                      <span class="flight-badge">{{ milestone.flightNo }}</span>
                    </div>
                    <span class="flight-city">{{ milestone.to }}</span>
                  </div>
                  <div class="route-times flight-times">
                    <div>S: {{ milestone.sDate }}</div>
                    <div>A: {{ milestone.aDate }}</div>
                  </div>
                </div>

                <!-- Regular milestone node -->
                <div v-else class="route-milestone">
                  <div :class="['milestone-node', `status-${milestone.status}`]">
                    {{ milestone.code }}
                  </div>
                  <div class="route-times">
                    <div v-if="milestone.pDate">P: {{ milestone.pDate }}</div>
                    <div v-if="milestone.mDate">M: {{ milestone.mDate }}</div>
                    <div v-if="milestone.aDate">A: {{ milestone.aDate }}</div>
                    <div v-if="milestone.bDate">B: {{ milestone.bDate }}</div>
                  </div>
                </div>

                <!-- Arrow divider -->
                <div v-if="Number(idx) < displayRouteMap.length - 1" class="route-arrow">
                  <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- ONE Record Events -->
        <div class="oc-section">
          <h4 class="oc-section-title">ONE Record Events</h4>
          <div class="oc-table-wrapper">
            <table class="oc-table">
              <thead>
                <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th>Actual Event Time</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(evt, idx) in displayEvents" :key="idx">
                  <td>{{ evt.code }}</td>
                  <td>{{ evt.desc }}</td>
                  <td>{{ evt.time }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Off-canvas */
.offcanvas-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
  backdrop-filter: blur(2px);
}
.offcanvas {
  position: fixed;
  top: 0; right: -1200px; /* expanded width / hidden off right */
  width: 1200px;
  max-width: 95vw;
  height: 100vh;
  background-color: #f5f7f9;
  z-index: 1001;
  box-shadow: -4px 0 16px rgba(0,0,0,0.15); /* shadow on the left side */
  transition: right 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.offcanvas.is-open {
  right: 0;
}
.offcanvas-content {
  position: relative;
  padding: 40px;
}
.btn-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ddd;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
}
.btn-close:hover {
  background: #f0f0f0;
}
.oc-header-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.oc-stat-item {
  display: flex;
  flex-direction: column;
}
.oc-stat-label {
  font-size: 12px;
  color: #777;
  font-weight: 500;
  margin-bottom: 4px;
}
.oc-stat-value {
  font-size: 16px;
  color: #333;
  font-weight: 600;
}
.oc-section {
  margin-bottom: 40px;
}
.oc-section-title {
  margin: 0 0 16px 0;
  color: #555;
  font-weight: 600;
  font-size: 15px;
}
.oc-card {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 30px;
}

/* Route Map styling */
.oc-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: #333;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}
.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.route-map-wrapper {
  overflow-x: auto;
  padding: 24px;
}
.route-map-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: max-content;
  padding-bottom: 20px;
}
.route-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 10px 0 10px;
  color: #4fc3f7; /* bright blue arrow */
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}
.route-milestone {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 68px;
}
.milestone-node {
  width: 56px;
  height: 56px;
  border-radius: 12px; /* rounded rect instead of circle */
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 12px;
}

/* Status Colors */
.status-new { background-color: #9e9e9e; }
.status-missing { background-color: #f44336; }
.status-complete { background-color: #00d200; }
.status-partial { background-color: #ffca28; }
.status-discrepancy { background-color: #ff8a65; }

.route-times {
  font-size: 11px;
  color: #444;
  line-height: 1.4;
  text-align: left;
  white-space: nowrap;
}

/* Flight Segment styling */
.route-flight-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.flight-visual {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 56px;
  margin-bottom: 12px;
}
.flight-city {
  font-weight: 700;
  font-size: 14px;
  color: #222;
}
.flight-line {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 60px;
  border-top: 1px solid #999;
}
.flight-icon {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  color: #4fc3f7;
  transform: rotate(90deg);
}
.flight-badge {
  background: #e1f5fe;
  color: #0288d1;
  border: 1px solid #4fc3f7;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 12px;
  font-weight: 600;
}
.flight-times {
  text-align: center;
}

/* Inner Table */
.oc-table-wrapper {
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
}
.oc-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.oc-table th, .oc-table td {
  text-align: left;
  padding: 14px 16px;
  border-bottom: 1px solid #eaeaea;
}
.oc-table th {
  background-color: #fafafa;
  color: #666;
  font-weight: 600;
}
</style>

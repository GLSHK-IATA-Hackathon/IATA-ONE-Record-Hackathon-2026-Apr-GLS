<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showNewsDropdown = ref(false);

const toggleNews = () => {
  showNewsDropdown.value = !showNewsDropdown.value;
};

const goToTrackShipment = () => {
  showNewsDropdown.value = false;
  router.push('/track-shipment?tab=Weather%20Forecast');
};
</script>

<template>
  <header class="header">
    <div class="logo-area">
      <img src="@/assets/Logo Block.png" alt="Ezy Cargo" style="height: 32px;" />
    </div>
    <div class="header-right">
      <div class="icon-link">
        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="#6B8080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        Inbox
      </div>
      <div class="icon-link news-container" @click="toggleNews">
        <div class="news-icon-wrapper">
          <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="#6B8080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span class="red-dot"></span>
        </div>
        News

        <!-- Dropdown Box -->
        <div v-if="showNewsDropdown" class="news-dropdown" @click.stop>
          <div class="news-item">
            <div class="news-alert-title">
              <svg style="width: 14px; height: 14px; margin-right: 6px;" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              Temperature Alert
            </div>
            <div class="news-alert-content">
              <span class="news-date">03 Jun 24 15:49</span>
              <span class="news-desc"><span class="highlight-code">[NRT]</span> ULD Temperature Alert, (3°C Exceed control temperature range +2°C to +8°C.)</span>
              <span class="news-link" @click="goToTrackShipment">View Details</span>
            </div>
          </div>
        </div>
      </div>
      <div class="icon-link">
        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="#00A3C5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
          <span>EN</span>
          <svg style="width: 10px; height: 6px;" viewBox="0 0 24 24" fill="none" stroke="#6B8080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
      <div class="user-avatar">
        <div class="avatar-circle">E</div>
        <div class="user-info">
          <span class="user-name">Elon M</span>
          <span class="user-company">GLSHK</span>
        </div>
        <svg style="width: 16px; height: 16px; margin-left: 4px;" viewBox="0 0 24 24" fill="none" stroke="#0F172A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 52px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
}
.logo-area {
  display: flex;
  align-items: center;
}
.logo-area h1 {
  margin: 0;
  font-size: 24px;
}
.logo-blue { color: #1f4e79; }
.logo-green { color: #8cc63f; }

.header-right {
  display: flex;
  align-items: center;
  gap: 30px;
}
.icon-link {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: #6B8080;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  line-height: 17px;
}
.user-avatar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar-circle {
  width: 32px;
  height: 32px;
  background-color: #1D4ED8;
  color: #F8FAFC;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 400;
  line-height: 24px;
}
.user-info {
  display: flex;
  flex-direction: column;
}
.user-name { 
  color: #0F172A;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  line-height: 17px;
  text-align: right;
}
.user-company {
  color: #0F172A;
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 600;
  line-height: 17px;
  text-align: right;
}

/* News Dropdown Styles */
.news-container {
  position: relative;
}
.news-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.red-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  border: 1px solid #fff;
}
.news-dropdown {
  position: absolute;
  top: 40px;
  right: 0;
  width: 500px;
  background-color: #f7f3f3;
  border: 1px solid #fecaca;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 12px;
  z-index: 1000;
  cursor: default;
}
.news-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.news-alert-title {
  display: flex;
  align-items: center;
  color: #ef4444;
  font-weight: bold;
  font-size: 13px;
}
.news-alert-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.news-date {
  color: #6b7280;
}
.news-desc {
  color: #ef4444;
  flex: 1;
  padding: 0 10px;
}
.highlight-code {
  font-weight: bold;
}
.news-link {
  color: #ef4444;
  text-decoration: underline;
  cursor: pointer;
}
.news-link:hover {
  color: #dc2626;
}
</style>
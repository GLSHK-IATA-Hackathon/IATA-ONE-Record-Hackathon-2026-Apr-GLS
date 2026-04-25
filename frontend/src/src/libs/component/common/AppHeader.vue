<script setup lang="ts">
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
      <div class="icon-link">
        <svg style="width: 20px; height: 20px;" viewBox="0 0 24 24" fill="none" stroke="#6B8080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        News
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
          <span class="user-name">Elon Musk</span>
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
  height: 68px;
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
</style>
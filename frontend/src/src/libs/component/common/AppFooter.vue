<script setup lang="ts">
</script>

<template>
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-left">
        <div class="footer-logo">
          <img src="@/assets/GLS Block.png" alt="GLS Logo" style="height: 54px; width: 78px; object-fit: contain;" />
        </div>
        <div class="footer-contact">
          <div class="separator"></div>
          <span class="help-desk">Help desk:</span>
          <a href="tel:+85228381999" class="contact-link">(+852) 2838 1999</a>
          <div class="separator"></div>
          <a href="mailto:helpdesk@glshk.com" class="contact-link">helpdesk@glshk.com</a>
          <div class="separator"></div>
          <span class="footer-link">Downloads</span>
          <div class="separator"></div>
          <span class="footer-link">FAQ</span>
          <div class="separator"></div>
          <span class="footer-link">Privacy</span>
          <div class="separator"></div>
          <span class="footer-link">Terms</span>
        </div>
      </div>
      <div class="footer-right">
        <div class="linkedin-icon">
          <svg viewBox="0 0 24 24" width="25" height="25" fill="#556565"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </div>
        <div class="lang-selector">
          <svg style="width: 25px; height: 25px;" viewBox="0 0 24 24" fill="none" stroke="#556565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 2px;">
            <span class="lang-text">EN</span>
            <svg style="width: 10px; height: 6px;" viewBox="0 0 24 24" fill="none" stroke="#556565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} Global Logistics System (HK) Co. Ltd. All Rights Reserved.
    </div>
  </footer>
</template>

<style scoped>
/* Footer */
.footer {
  background-color: #F2F6F6;
  padding: 15px 30px;
  border-top: 1px solid #ddd;
  font-family: 'Source Sans Pro', sans-serif;
  display: flex;
  flex-direction: column;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}
.footer-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.footer-contact {
  display: flex;
  align-items: center;
  gap: 10px;
}
.separator {
  width: 2px;
  height: 24px;
  background-color: #D9D9D9;
}
.help-desk {
  color: #556565;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
}
.contact-link {
  color: #00A3C5;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-decoration: none;
  cursor: pointer;
}
.footer-link {
  color: #556565;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  cursor: pointer;
}

.footer-right {
  display: flex;
  gap: 20px;
  align-items: center;
}
.linkedin-icon {
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lang-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.lang-text {
  color: #556565;
  font-size: 14px;
  font-weight: 600;
  line-height: 17px;
}

.footer-bottom {
  text-align: left;
  color: #556565;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
</style>
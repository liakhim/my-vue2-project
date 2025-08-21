<template>
  <div id="app">
    <div class="custom-header">
      <div class="header-title">🎮 My Game</div>
      <button @click="closeApp" class="header-close-btn">✕</button>
    </div>
    <HelloWorld msg="Qwerty"/>
  </div>
</template>

<script>
import Cover from './components/Cover.vue'

export default {
  name: 'App',
  components: {
    HelloWorld: Cover
  },
  data() {
    return {
      tg: null,
      headerCheckInterval: null
    }
  },
  mounted() {
    this.initTelegramWebApp();
    this.startHeaderProtection();
  },
  methods: {
    initTelegramWebApp() {
      if (window.Telegram?.WebApp) {
        this.tg = window.Telegram.WebApp;
        this.tg.expand();
        this.tg.enableClosingConfirmation();
        this.tg.disableVerticalSwipes();
        this.tg.disableHorizontalSwipes();
        this.tg.BackButton.hide();

        // Многократное скрытие header'а
        this.hideTelegramHeader();
      }
    },

    hideTelegramHeader() {
      if (!this.tg) return;

      // Официальные методы
      this.tg.hideHeader();
      this.tg.setHeaderColor('secondary_bg_color');

      // Принудительные методы
      this.forceRemoveHeader();
    },

    forceRemoveHeader() {
      // 1. Жесткий сброс стилей
      document.documentElement.style.paddingTop = '0px';
      document.body.style.paddingTop = '0px';

      // 2. Поиск и уничтожение header'а
      const potentialHeaders = [
        'header',
        'div[style*="top: 0"]',
        'div[style*="height: 4"]',
        'div[style*="z-index: 9"]',
        'div[style*="background"]',
        '*[class*="header"]',
        '*[id*="header"]'
      ];

      potentialHeaders.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top === 0 && rect.width === window.innerWidth && rect.height < 100) {
            el.style.cssText = `
              display: none !important;
              opacity: 0 !important;
              height: 0px !important;
              min-height: 0px !important;
              visibility: hidden !important;
              pointer-events: none !important;
            `;
          }
        });
      });
    },

    startHeaderProtection() {
      // Постоянная защита от появления header'а
      this.headerCheckInterval = setInterval(() => {
        this.forceRemoveHeader();

        // Проверяем scrollTop (частая причина появления header'а)
        if (window.scrollY > 0) {
          window.scrollTo(0, 0);
        }
      }, 500);
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      }
    }
  },
  beforeUnmount() {
    if (this.headerCheckInterval) {
      clearInterval(this.headerCheckInterval);
    }
  }
}
</script>

<style>
/* АБСОЛЮТНАЯ БЛОКИРОВКА СИСТЕМНОГО HEADER */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
}

/* УБИЙСТВО СИСТЕМНОГО HEADER */
header,
div[style*="top: 0"],
div[style*="height: 4"],
div[style*="z-index: 9"],
div[style*="background-color"],
*[class*="header"],
*[id*="header"] {
  display: none !important;
  opacity: 0 !important;
  height: 0px !important;
  min-height: 0px !important;
  max-height: 0px !important;
  visibility: hidden !important;
  pointer-events: none !important;
  position: absolute !important;
  left: -9999px !important;
}

/* Гарантия отсутствия отступов */
* {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

#app {
  position: fixed;
  top: 0 !important;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
  overflow: hidden;
}

.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--tg-theme-secondary-bg-color, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 10000;
  border-bottom: 1px solid var(--tg-theme-hint-color, #cccccc);
}

.header-title {
  font-family: "Jem", sans-serif;
  font-size: 18px;
  font-weight: bold;
  color: var(--tg-theme-text-color, #000000);
}

.header-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--tg-theme-text-color, #000000);
}

.HelloWorld {
  padding-top: 48px;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}
</style>
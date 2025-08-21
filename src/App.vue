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
      tg: null
    }
  },
  mounted() {
    if (window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp;
      // Просто получаем ссылку, все настройки уже в index.html
    }

    // Легкая проверка header'а каждые 500ms
    this.checkHeaderInterval = setInterval(() => {
      this.hideSystemHeader();
    }, 500);
  },
  methods: {
    hideSystemHeader() {
      // Аккуратно скрываем ТОЛЬКО системный header
      const elements = document.querySelectorAll('header, [style*="top: 0"], [style*="height: 4"]');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Проверяем, что это именно системный header (вверху экрана, фиксированный)
        if (rect.top === 0 && rect.height > 0 && rect.height < 100) {
          el.style.cssText = 'display: none !important; opacity: 0 !important; height: 0 !important;';
        }
      });

      // Сбрасываем любые padding/margin сверху
      if (document.documentElement.style.paddingTop !== '0px') {
        document.documentElement.style.paddingTop = '0px';
      }
      if (document.body.style.paddingTop !== '0px') {
        document.body.style.paddingTop = '0px';
      }
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      }
    }
  },
  beforeUnmount() {
    if (this.checkHeaderInterval) {
      clearInterval(this.checkHeaderInterval);
    }
  }
}
</script>

<style>
/* БАЗОВЫЕ СТИЛИ БЕЗ !important */
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#app {
  position: fixed;
  top: 0;
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
  z-index: 1000;
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

.header-close-btn:active {
  transform: scale(0.95);
}

.HelloWorld {
  padding-top: 48px;
  height: calc(100vh - 48px);
  overflow: hidden;
  width: 100vw;
}
</style>
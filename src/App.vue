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
    // Просто получаем ссылку на уже настроенный WebApp
    if (window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp;
      console.log('Telegram WebApp ready');

      // Дополнительное скрытие header'а после полной загрузки
      this.hideHeaderWithRetry();
    }
  },
  methods: {
    hideHeaderWithRetry() {
      if (!this.tg) return;

      // Многократные попытки скрыть header
      this.tg.hideHeader();

      setTimeout(() => {
        this.tg.hideHeader();
      }, 50);

      setTimeout(() => {
        this.tg.hideHeader();
      }, 100);

      setTimeout(() => {
        this.tg.hideHeader();
      }, 200);
    },
    closeApp() {
      if (this.tg) {
        this.tg.close();
      }
    }
  }
}
</script>

<style>
/* АБСОЛЮТНО ФИКСИРОВАННЫЕ СТИЛИ */
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
}

body {
  overscroll-behavior: none;
  -webkit-overflow-scrolling: none;
}

#app {
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
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

.header-close-btn:active {
  transform: scale(0.95);
}

.HelloWorld {
  padding-top: 48px;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}
</style>
<template>
  <div id="app">
    <!-- Кастомный header -->
    <div class="custom-header">
      <div class="header-title">🎮 My Game</div>
      <button @click="closeApp" class="header-close-btn">✕</button>
    </div>

    <!-- Основное содержимое -->
    <div class="content">
      <HelloWorld msg="Привет!" />
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/Cover.vue';

export default {
  name: 'App',
  components: { HelloWorld },
  data() {
    return {
      tg: null
    }
  },
  mounted() {
    if (window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp;
      // Устанавливаем расширение на весь экран
      this.tg.expand();
    }
  },
  methods: {
    closeApp() {
      if (this.tg) {
        this.tg.close();
      }
    }
  }
}
</script>

<style>
/* Контейнер */
#app {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

/* Кастомный header */
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: var(--tg-theme-secondary-bg-color, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  border-bottom: 1px solid var(--tg-theme-hint-color, #cccccc);
  box-sizing: border-box;
}

.header-title {
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

/* Контент приложения */
.content {
  position: absolute;
  top: 50px; /* высота header */
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  width: 100%;
}
</style>

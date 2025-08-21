<template>
  <div id="app">
    <!-- Кастомный header -->
    <div class="custom-header">
      <div class="header-title">🎮 My Game</div>
      <button @click="closeApp" class="header-close-btn">✕</button>
    </div>

    <!-- Контент со скроллом -->
    <div class="content">
      <HelloWorld msg="Qwerty" />
    </div>
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
      this.tg = window.Telegram.WebApp
    }
  },
  methods: {
    closeApp() {
      if (this.tg) {
        this.tg.close()
      }
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden; /* отключаем системный скролл */
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

/* Кастомный header */
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

/* Контент со скроллом */
.content {
  flex: 1;
  padding-top: 48px; /* отступ под кастомный header */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* плавный скролл iOS */
}
</style>

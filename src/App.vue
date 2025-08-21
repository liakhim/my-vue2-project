<template>
  <div id="app">
    <!-- Кастомный header, который визуально “заменяет” системный -->
    <div class="custom-header">
      <div class="header-title">🚀 My WebApp</div>
      <button @click="closeApp" class="header-close-btn">✕</button>
    </div>

    <!-- Контент -->
    <div class="content">
      <Cover msg="Привет!"/>
    </div>
  </div>
</template>

<script>
import Cover from './components/Cover.vue'

export default {
  name: 'App',
  components: { Cover },
  data() {
    return { tg: null }
  },
  mounted() {
    if (window.Telegram?.WebApp) this.tg = window.Telegram.WebApp;
  },
  methods: {
    closeApp() {
      if (this.tg) this.tg.close();
    }
  }
}
</script>

<style>
.custom-header {
  position: fixed;
  top: env(safe-area-inset-top); /* “магия” iOS */
  left: 0;
  right: 0;
  height: 48px;
  background-color: var(--tg-theme-secondary-bg-color, #f0f0f0);
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
  color: var(--tg-theme-text-color, #000);
}

.header-close-btn {
  background: none;
  border: none;
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--tg-theme-text-color, #000);
}

.content {
  padding-top: calc(48px + env(safe-area-inset-top));
  height: calc(100vh - 48px - env(safe-area-inset-top));
  overflow-y: auto;
}
</style>

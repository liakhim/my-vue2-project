<template>
  <div id="app">
    <!-- Кастомный header -->
    <div
        class="custom-header"
        :class="{ 'scrolled': scrolled }"
        ref="header"
    >
      <div class="header-title">🚀 My WebApp</div>
      <button @click="closeApp" class="header-close-btn">✕</button>
    </div>

    <!-- Контент -->
    <div class="content" @scroll="onScroll" ref="content">
      <HelloWorld msg="Привет!"/>
      <div style="height: 1500px;"></div> <!-- для проверки скролла -->
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: { HelloWorld },
  data() {
    return {
      tg: null,
      scrolled: false,
    }
  },
  mounted() {
    if (window.Telegram?.WebApp) this.tg = window.Telegram.WebApp;

    // Экспандим WebApp, чтобы занял весь экран
    if (this.tg) this.tg.expand();

    // Настройка безопасной зоны для iOS
    this.$refs.header.style.paddingTop = `env(safe-area-inset-top)`;
    this.$refs.content.style.paddingTop = `calc(48px + env(safe-area-inset-top))`;
  },
  methods: {
    closeApp() {
      if (this.tg) this.tg.close();
    },
    onScroll() {
      const scrollTop = this.$refs.content.scrollTop;
      this.scrolled = scrollTop > 10; // активируем эффект после небольшой прокрутки
    }
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 0); /* прозрачный по умолчанию */
  border-bottom: none;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.custom-header.scrolled {
  background-color: var(--tg-theme-secondary-bg-color, #f8f8f8);
  box-shadow: 0 1px 5px rgba(0,0,0,0.1);
  border-bottom: 1px solid var(--tg-theme-hint-color, #ccc);
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>

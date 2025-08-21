<template>
  <div class="app">
    <h1>Привет, WebApp Telegram!</h1>
    <button @click="closeApp">Закрыть приложение</button>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    if (window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;

      // Разворачиваем приложение на весь экран
      tg.expand();

      // Убираем padding сверху/снизу (iOS safe area)
      document.body.style.paddingTop = 'env(safe-area-inset-top)';
      document.body.style.paddingBottom = 'env(safe-area-inset-bottom)';
    }
  },
  methods: {
    closeApp() {
      if (window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
      }
    }
  }
};
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
}
</style>

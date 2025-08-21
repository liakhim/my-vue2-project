<template>
  <div id="app">
    <!-- ВАЖНО: никакого фиксированного кастомного header сверху.
         Системный header рисует Telegram, а твой контент — ниже. -->
    <div class="content">
      <HelloWorld msg="Qwerty" />
    </div>
  </div>
</template>

<script>
import Cover from './components/Cover.vue'

export default {
  name: 'App',
  components: { HelloWorld: Cover },
  data() {
    return { tg: null }
  },
  mounted() {
    if (window.Telegram?.WebApp) {
      this.tg = window.Telegram.WebApp
      // Дополнительной настройки тут не требуется — всё в index.html
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
  overflow: hidden; /* отключаем системный скролл страницы */
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

.content {
  flex: 1;
  overflow-y: auto;              /* скролл только у контента */
  -webkit-overflow-scrolling: touch;
  padding: 16px;
}
</style>

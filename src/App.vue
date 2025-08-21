<template>
  <div id="app">
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

/* Контент со скроллом */
.content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* плавный скролл iOS */
  padding: 16px;
}
</style>

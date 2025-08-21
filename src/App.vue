<template>
  <div id="app">
    <div class="content">
      <h1>🎮 My Vue WebApp</h1>
      <p>Здесь твой контент. Системный header сверху остаётся.</p>
      <ul>
        <li v-for="n in 30" :key="n">Элемент {{ n }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
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
  overflow: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
}

/* скролл для контента */
.content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 16px;
}
</style>

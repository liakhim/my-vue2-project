<template>
  <div id="app" :style="{ paddingTop: safeAreaTop + 'px', paddingBottom: safeAreaBottom + 'px', minHeight: '100vh' }">
    <div class="background">
      <img src="./assets/front-puppy/back3.jpg" alt="">
    </div>
    <div style="position:relative;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tg: null,
      safeAreaTop: 0,
      safeAreaBottom: 0
    }
  },
  mounted() {
    if (window.Telegram && window.Telegram.WebApp) {
      this.tg = window.Telegram.WebApp

      // Сразу разворачиваем fullscreen
      this.tg.expand()
      this.tg.isExpanded = true

      // Забираем safe area
      this.safeAreaTop = this.tg.viewportInsetTop
      this.safeAreaBottom = this.tg.viewportInsetBottom

      // Слушаем изменения viewport и повторно разворачиваем
      this.tg.onEvent('viewportChanged', () => {
        this.safeAreaTop = this.tg.viewportInsetTop
        this.safeAreaBottom = this.tg.viewportInsetBottom

        this.tg.expand()
        this.tg.isExpanded = true
      })

      // Скрываем кнопки Telegram
      this.tg.MainButton?.hide()
      this.tg.BackButton?.hide()
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

html, body {
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #000;
  -webkit-overflow-scrolling: touch;
}

.background {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background: #000;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 690px) {
    margin-top: -10px;
    img {
      height: calc(100% + 10px);
    }
  }
}
</style>

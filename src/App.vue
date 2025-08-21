<template>
  <div
      id="app"
      :style="{ paddingTop: safeAreaTop + 'px', paddingBottom: safeAreaBottom + 'px', minHeight: '100vh' }"
  >
    <Cover msg="Qwerty" />
  </div>
</template>

<script>
import Cover from './components/Cover.vue'

export default {
  name: 'App',
  components: { Cover },
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
}

html, body {
  height: 100%;
  overflow: hidden; /* блокируем стандартный скролл iOS */
}

#app {
  width: 100%;
  height: 100%;
  overflow: auto; /* контент внутри #app можно скроллить */
  -webkit-overflow-scrolling: touch; /* плавный скролл на iOS */
}
</style>

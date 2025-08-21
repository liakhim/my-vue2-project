<template>
  <div
      id="app"
      :style="{ paddingTop: safeAreaTop + 'px', paddingBottom: safeAreaBottom + 'px', height: '100vh', overflow: 'hidden' }"
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
      safeAreaBottom: 0,
    }
  },
  mounted() {
    if (window.Telegram && window.Telegram.WebApp) {
      this.tg = window.Telegram.WebApp

      // Разворачиваем на весь экран
      this.tg.expand()

      // Забираем безопасные зоны iPhone
      this.safeAreaTop = this.tg.viewportInsetTop
      this.safeAreaBottom = this.tg.viewportInsetBottom

      // Слушаем изменения viewport и фиксируем fullscreen
      this.tg.onEvent('viewportChanged', () => {
        this.safeAreaTop = this.tg.viewportInsetTop
        this.safeAreaBottom = this.tg.viewportInsetBottom

        // Принудительное разворачивание при любом скролле
        if (!this.tg.isExpanded) {
          this.tg.expand()
        }
      })

      // Скрываем кнопки Telegram, чтобы они не мешали
      if (this.tg.MainButton) this.tg.MainButton.hide()
      if (this.tg.BackButton) this.tg.BackButton.hide()

      // Принудительно фиксируем высоту body
      document.body.style.height = '100vh'
      document.body.style.overflow = 'hidden'
    }
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  width: 100%;
}
</style>

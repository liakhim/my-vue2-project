<template>
  <div
      id="app"
      :style="{ paddingTop: safeAreaTop + 'px', paddingBottom: safeAreaBottom + 'px' }"
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
    // Проверяем, что WebApp запущен внутри Telegram
    if (window.Telegram && window.Telegram.WebApp) {
      this.tg = window.Telegram.WebApp

      // Разворачиваем WebApp fullscreen
      this.tg.expand()

      // Забираем безопасные зоны iPhone
      this.safeAreaTop = this.tg.viewportInsetTop
      this.safeAreaBottom = this.tg.viewportInsetBottom

      // Слушаем изменения viewport и обновляем safe area
      this.tg.onEvent('viewportChanged', () => {
        this.safeAreaTop = this.tg.viewportInsetTop
        this.safeAreaBottom = this.tg.viewportInsetBottom

        // Всегда сохраняем fullscreen
        this.tg.expand()
      })

      // Опционально: скрываем кнопки Telegram, если они мешают
      if (this.tg.MainButton) this.tg.MainButton.hide()
      if (this.tg.BackButton) this.tg.BackButton.hide()
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

#app {
  width: 100%;
  height: 100%;
  overflow: auto; /* для скролла контента */
}
</style>

<template>
  <div id="app" :style="{ paddingTop: safeAreaTop + 'px', paddingBottom: safeAreaBottom + 'px' }">
    <Cover msg="Qwerty"/>
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
    this.tg = window.Telegram.WebApp;

    // Разворачиваем на весь экран
    this.tg.expand();

    // Забираем безопасные зоны iPhone
    this.safeAreaTop = this.tg.viewportInsetTop;
    this.safeAreaBottom = this.tg.viewportInsetBottom;

    // Запрещаем закрытие WebApp при скролле
    this.tg.MainButton.hide();  // скрываем кнопку Telegram, если нужно
    this.tg.BackButton.hide();  // скрываем кнопку назад

    // Слушаем изменения viewport и обновляем safe area
    this.tg.onEvent('viewportChanged', () => {
      this.safeAreaTop = this.tg.viewportInsetTop;
      this.safeAreaBottom = this.tg.viewportInsetBottom;
      this.tg.expand(); // сохраняем fullscreen при изменении
    });
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
  overflow: auto;
}
</style>

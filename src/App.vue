<template>
  <div id="app" :style="{ paddingTop: safeAreaTop + 'px', paddingBottom: safeAreaBottom + 'px' }">
    <HelloWorld msg="Qwerty"/>
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
      tg: null,
      safeAreaTop: 0,
      safeAreaBottom: 0
    }
  },
  mounted() {
    // Telegram WebApp объект уже доступен как window.Telegram.WebApp
    this.tg = window.Telegram.WebApp;

    // Разворачиваем WebApp на весь экран
    this.tg.expand();

    // Получаем размеры safe area для iPhone
    this.safeAreaTop = this.tg.viewportInsetTop;
    this.safeAreaBottom = this.tg.viewportInsetBottom;

    // Запрещаем закрытие WebApp при скролле
    this.tg.MainButton.hide();
    this.tg.BackButton.hide();

    // Можно слушать изменение размеров
    this.tg.onEvent('viewportChanged', () => {
      this.safeAreaTop = this.tg.viewportInsetTop;
      this.safeAreaBottom = this.tg.viewportInsetBottom;
    });
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Jem";
  src: url("./assets/fonts/jem/jeM.otf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Papyrus";
  src: url("./assets/fonts/papyrus/Papyrus-02.otf") format("truetype");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>

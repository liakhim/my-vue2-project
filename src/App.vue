<template>
  <div id="app">
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
  mounted() {
    // Проверяем, что мы в Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      let tg = window.Telegram.WebApp;

      // Устанавливаем начальные настройки
      tg.expand();
      tg.enableClosingConfirmation();
      tg.disableVerticalSwipes();

      // Перехватываем все попытки изменения размера
      let isExpanded = true;

      tg.onEvent('viewportChanged', (data) => {
        if (!data.is_expanded && isExpanded) {
          // Немедленно возвращаем полноэкранный режим
          tg.expand();
          // Показываем сообщение (опционально)
          tg.showPopup({
            title: "Закрытие",
            message: "Для закрытия используйте крестик в правом верхнем углу",
            buttons: [{ type: "ok" }]
          });
        }
        isExpanded = data.is_expanded;
      });

      // Блокируем нативный скролл вверху
      document.addEventListener('scroll', this.handleScroll);
    }
  },

  methods: {
    handleScroll() {
      if (window.scrollY === 0) {
        // Предотвращаем overscroll вверху
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
          document.body.style.overflow = 'auto';
        }, 100);
      }
    }
  },

  beforeDestroy() {
    // Очищаем обработчики при уничтожении компонента
    if (window.Telegram && window.Telegram.WebApp) {
      document.removeEventListener('scroll', this.handleScroll);
    }
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
body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  overflow: hidden;
}
</style>

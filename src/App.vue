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
  data() {
    return {
      tg: null,
      isFullScreen: true,
      isExpanded: true,
      showCustomHeader: false
    }
  },

  mounted() {
    this.initTelegramWebApp();
  },

  methods: {
    initTelegramWebApp() {
      if (window.Telegram && window.Telegram.WebApp) {
        this.tg = window.Telegram.WebApp;

        // Скрываем стандартный header Telegram
        this.hideTelegramHeader();

        // Настройки для полноэкранного режима
        this.setupFullscreenMode();

        // Блокировка закрытия свайпом
        this.preventSwipeToClose();

        // Показываем наш кастомный header
        this.showCustomHeader = true;

      } else {
        // Режим разработки
        console.log('Development mode - not in Telegram');
        this.showCustomHeader = true;
      }
    },

    hideTelegramHeader() {
      if (!this.tg) return;

      // Полностью скрываем стандартный header Telegram
      this.tg.setHeaderColor('secondary_bg_color'); // Прозрачный

      // Альтернативный способ - через CSS injection
      const style = document.createElement('style');
      style.textContent = `
        .tg-head {
          display: none !important;
        }
        .tg-header {
          height: 0 !important;
          min-height: 0 !important;
        }
        body {
          margin-top: 0 !important;
          padding-top: 0 !important;
        }
      `;
      document.head.appendChild(style);
    },

    setupFullscreenMode() {
      if (!this.tg) return;

      // Включаем полноэкранный режим БЕЗ отступов
      this.tg.expand();
      this.tg.enableClosingConfirmation();
      this.tg.disableVerticalSwipes();

      // Убираем все отступы
      this.tg.setBackgroundColor('#667eea'); // Цвет как у фона

      // Следим за изменениями размера
      this.tg.onEvent('viewportChanged', this.handleViewportChange);
    },

    handleViewportChange(data) {
      if (!data.is_expanded && this.isExpanded) {
        // Немедленно возвращаем полноэкранный режим
        setTimeout(() => {
          this.tg.expand();
        }, 50);
      }
      this.isExpanded = data.is_expanded;
    },

    preventSwipeToClose() {
      // Агрессивное блокирование свайпов
      let startY = 0;
      let isBlocking = false;

      document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
        isBlocking = startY < 50; // Блокируем только в самом верху
      }, { passive: false });

      document.addEventListener('touchmove', (e) => {
        if (!isBlocking) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        // Блокируем любой свайп сверху вниз в верхней части
        if (diff > 10) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }, { passive: false });

      // Блокируем overscroll
      document.documentElement.style.overscrollBehavior = 'none';
      document.body.style.overscrollBehavior = 'none';
    },

    showGame() {
      this.tg.showPopup({
        title: "Игра началась!",
        message: "Приготовьтесь к gameplay...",
        buttons: [{ type: "ok" }]
      });
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      } else {
        alert('Приложение будет закрыто');
      }
    }
  },

  beforeDestroy() {
    if (this.tg) {
      this.tg.offEvent('viewportChanged', this.handleViewportChange);
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

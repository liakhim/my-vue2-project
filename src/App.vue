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
      isExpanded: true
    }
  },

  mounted() {
    this.initTelegramWebApp();
  },

  methods: {
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
    initTelegramWebApp() {
      // Проверяем что мы в Telegram Web App
      if (window.Telegram && window.Telegram.WebApp) {
        this.tg = window.Telegram.WebApp;

        this.hideTelegramHeader();

        // Настройки для полноэкранного режима
        this.setupFullscreenMode();

        // Блокировка закрытия свайпом
        this.preventSwipeToClose();

        // Инициализация
        this.tg.ready();
        this.tg.setHeaderColor('#2e2e2e');
        this.tg.setBackgroundColor('#667eea');

      } else {
        // Режим разработки (вне Telegram)
        console.log('Development mode - not in Telegram');
        this.isFullScreen = false;
      }
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

        // Показываем предупреждение
        this.tg.showPopup({
          title: "Закрытие",
          message: "Для закрытия используйте кнопку в приложении",
          buttons: [{ type: "ok" }]
        });
      }
      this.isExpanded = data.is_expanded;
    },

    preventSwipeToClose() {
      // Блокируем свайпы в верхней части экрана
      let startY = 0;

      document.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
      }, { passive: true });

      document.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY;

        // Блокируем свайп сверху вниз в верхней части экрана
        if (diff > 30 && startY < 100 && window.scrollY === 0) {
          e.preventDefault();
          return false;
        }
      }, { passive: false });
    },

    setupCloseButton() {
      // Используем MainButton Telegram для закрытия
      this.tg.MainButton.setText('Закрыть');
      this.tg.MainButton.setParams({
        color: '#ff3b30',
        text_color: '#ffffff'
      });
      this.tg.MainButton.show();

      this.tg.MainButton.onClick(this.closeApp);
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
        alert('Приложение будет закрыто в Telegram');
      }
    },

    expandToFullscreen() {
      if (this.tg) {
        this.tg.expand();
        this.isFullScreen = true;
      }
    }
  },

  beforeDestroy() {
    // Очистка обработчиков
    if (this.tg) {
      this.tg.offEvent('viewportChanged', this.handleViewportChange);
      this.tg.MainButton.offClick(this.closeApp);
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

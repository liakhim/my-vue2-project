<template>
  <div id="app">
    <div class="custom-header" v-if="showCustomHeader">
      <div class="header-title">🎮 My Game</div>
      <button @click="closeApp" class="header-close-btn">✕</button>
    </div>
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
      safeAreaTop: 0,
      safeAreaBottom: 0
    }
  },

  computed: {
    headerStyle() {
      return {
        paddingTop: `env(safe-area-inset-top, ${this.safeAreaTop}px)`,
        height: `calc(48px + env(safe-area-inset-top, ${this.safeAreaTop}px))`
      };
    },
    contentStyle() {
      return {
        paddingTop: `calc(48px + env(safe-area-inset-top, ${this.safeAreaTop}px))`,
        paddingBottom: `env(safe-area-inset-bottom, ${this.safeAreaBottom}px)`
      };
    }
  },

  mounted() {
    this.initTelegramWebApp();
    this.calculateSafeAreas();
  },

  methods: {
    initTelegramWebApp() {
      if (window.Telegram && window.Telegram.WebApp) {
        this.tg = window.Telegram.WebApp;

        // Ключевой момент: скрываем системный header
        this.hideSystemHeader();

        // Настройки полноэкранного режима
        this.setupFullscreenMode();

      } else {
        console.log('Development mode - not in Telegram');
      }
    },

    hideSystemHeader() {
      if (!this.tg) return;

      // 1. Основной способ - скрываем header
      this.tg.setHeaderColor('secondary_bg_color');

      // 2. Альтернативный способ - делаем прозрачным
      setTimeout(() => {
        this.tg.setHeaderColor('#00000000'); // Полностью прозрачный
      }, 100);

      // 3. Дополнительно: скрываем кнопку назад
      this.tg.BackButton.hide();

      // 4. Принудительно расширяем на весь экран
      this.tg.expand();
    },

    setupFullscreenMode() {
      if (!this.tg) return;

      this.tg.expand();
      this.tg.enableClosingConfirmation();
      this.tg.disableVerticalSwipes();

      // Устанавливаем цвет фона такой же как у приложения
      this.tg.setBackgroundColor('#667eea');

      // Следим за изменениями
      this.tg.onEvent('viewportChanged', this.handleViewportChange);
    },

    handleViewportChange(data) {
      if (!data.is_expanded) {
        setTimeout(() => {
          this.tg.expand();
        }, 50);
      }
    },

    calculateSafeAreas() {
      // Рассчитываем безопасные зоны для разных устройств
      this.safeAreaTop = this.getSafeAreaTop();
      this.safeAreaBottom = this.getSafeAreaBottom();
    },

    getSafeAreaTop() {
      // Для iOS с notch ~44px, для других ~0px
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      return isIOS ? 44 : 0;
    },

    getSafeAreaBottom() {
      // Для iPhone X+ ~34px
      const isIPhoneX = /iPhone X|iPhone 1[1-9]|iPhone 1[0-9]/.test(navigator.userAgent);
      return isIPhoneX ? 34 : 0;
    },

    showGame() {
      if (this.tg) {
        this.tg.showPopup({
          title: "Игра началась!",
          message: "Приготовьтесь к gameplay...",
          buttons: [{ type: "ok" }]
        });
      }
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      }
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

.telegram-webapp {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  margin: 0;
  padding: 0;
  position: relative;
}

/* Кастомный header */
.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 10000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header-title {
  font-weight: 600;
  font-size: 18px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.header-close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.header-close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Контент занимает ВЕСЬ экран */
.content {
  padding: 0;
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
}

.fullscreen-content {
  padding-top: 48px; /* Отступ под кастомный header */
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-top: 0;
}

p {
  font-size: 16px;
  margin-bottom: 30px;
  opacity: 0.9;
  padding: 0 20px;
}

.game-area {
  margin: 30px 0;
}

.game-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 25px;
  padding: 15px 30px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.game-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

/* Убираем все стандартные отступы Telegram */
:deep() .tg-head {
  display: none !important;
}

:deep() .tg-header {
  height: 0 !important;
  min-height: 0 !important;
  opacity: 0 !important;
}

:deep() body {
  margin-top: 0 !important;
  padding-top: 0 !important;
  overflow: hidden !important;
}

/* Для iOS Safari */
@supports (-webkit-touch-callout: none) {
  .telegram-webapp {
    min-height: -webkit-fill-available;
  }

  .content {
    min-height: -webkit-fill-available;
  }
}

@media (max-width: 480px) {
  .custom-header {
    height: 44px;
    padding: 0 12px;
  }

  .header-title {
    font-size: 16px;
  }

  h1 {
    font-size: 24px;
  }

  .game-btn {
    padding: 12px 25px;
    font-size: 16px;
  }

  .fullscreen-content {
    padding-top: 44px;
  }
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
/* Глобальные стили для переопределения Telegram */
body {
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}

/* Скрываем стандартный header Telegram */
.tg-head {
  display: none !important;
}

.tg-header {
  display: none !important;
}

/* Убираем безопасные зоны */
@supports(padding: max(0px)) {
  .telegram-webapp {
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .custom-header {
    padding-left: calc(16px + env(safe-area-inset-left));
    padding-right: calc(16px + env(safe-area-inset-right));
    padding-top: env(safe-area-inset-top);
    height: calc(48px + env(safe-area-inset-top));
  }

  .fullscreen-content {
    padding-top: calc(48px + env(safe-area-inset-top));
  }
}
</style>

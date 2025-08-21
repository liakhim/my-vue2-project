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
</style>

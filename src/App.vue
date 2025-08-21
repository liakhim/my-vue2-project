<template>
  <div id="app">
    <div class="custom-header">
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
      tg: null
    }
  },
  mounted() {
    // Ждем полной загрузки Telegram WebApp
    if (window.Telegram?.WebApp) {
      this.initTelegramWebApp();
    } else {
      // Если WebApp не загрузился, пробуем с интервалом
      const checkInterval = setInterval(() => {
        if (window.Telegram?.WebApp) {
          clearInterval(checkInterval);
          this.initTelegramWebApp();
        }
      }, 100);

      // На всякий случай таймаут
      setTimeout(() => {
        clearInterval(checkInterval);
        if (window.Telegram?.WebApp) {
          this.initTelegramWebApp();
        }
      }, 2000);
    }
  },
  methods: {
    initTelegramWebApp() {
      this.tg = window.Telegram.WebApp;
      console.log('Telegram WebApp version:', this.tg.version);

      // КРИТИЧЕСКИ ВАЖНЫЙ ПОРЯДОК ДЕЙСТВИЙ:

      // 1. Первым делом - расширяем на весь экран
      this.tg.expand();

      // 2. Немедленно скрываем системный header
      this.tg.hideHeader();
      this.tg.setHeaderColor('secondary_bg_color');

      // 3. Запрещаем закрытие любыми жестами
      this.tg.enableClosingConfirmation();
      this.tg.disableVerticalSwipes();
      this.tg.disableHorizontalSwipes();

      // 4. Скрываем кнопку "Назад"
      this.tg.BackButton.hide();

      // 5. Устанавливаем цвет фона
      this.tg.setBackgroundColor('#ffffff');

      // 6. Принудительно применяем полноэкранный режим
      this.applyForcedFullscreen();

      // 7. Вешаем обработчики на события
      this.tg.onEvent('viewportChanged', this.handleViewportChange);

      console.log('WebApp fully initialized');
    },

    applyForcedFullscreen() {
      // Жесткие стили для гарантии полноэкранного режима
      const style = document.documentElement.style;
      style.height = '100vh';
      style.width = '100vw';
      style.overflow = 'hidden';
      style.position = 'fixed';
      style.top = '0';
      style.left = '0';

      document.body.style.height = '100vh';
      document.body.style.width = '100vw';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.margin = '0';
      document.body.style.padding = '0';

      // Блокируем все возможные жесты
      this.blockAllGestures();
    },

    blockAllGestures() {
      // Полная блокировка всех жестов
      document.addEventListener('touchstart', this.blockEvent, { passive: false });
      document.addEventListener('touchmove', this.blockEvent, { passive: false });
      document.addEventListener('touchend', this.blockEvent, { passive: false });
      document.addEventListener('scroll', this.blockEvent, { passive: false });
      document.addEventListener('wheel', this.blockEvent, { passive: false });
      document.addEventListener('contextmenu', this.blockEvent);

      // CSS блокировка
      document.body.style.overscrollBehavior = 'none';
      document.body.style.touchAction = 'none';
    },

    blockEvent(e) {
      // Блокируем все события, которые могут закрыть приложение
      if (e.type === 'touchmove' || e.type === 'scroll') {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },

    handleViewportChange(e) {
      console.log('Viewport changed:', e);
      // При изменении viewport снова применяем настройки
      if (this.tg) {
        this.tg.expand();
        this.tg.hideHeader();
      }
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      } else {
        alert('App would close here');
      }
    }
  },
  beforeUnmount() {
    // Убираем обработчики
    if (this.tg) {
      this.tg.offEvent('viewportChanged', this.handleViewportChange);
    }
  }
}
</script>

<style lang="scss">
/* АБСОЛЮТНЫЙ СБРОС ВСЕХ СТИЛЕЙ */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  overflow: hidden !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  -webkit-overflow-scrolling: touch !important;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
}

#app {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  background: var(--tg-theme-bg-color, #ffffff) !important;
  color: var(--tg-theme-text-color, #000000) !important;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
}

.custom-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  height: 48px !important;
  background: var(--tg-theme-secondary-bg-color, #f0f0f0) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 16px !important;
  z-index: 10000 !important;
  border-bottom: 1px solid var(--tg-theme-hint-color, #cccccc) !important;

  .header-title {
    font-family: "Jem", sans-serif;
    font-size: 18px;
    font-weight: bold;
    color: var(--tg-theme-text-color, #000000);
  }

  .header-close-btn {
    background: none;
    border: none;
    font-size: 20px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--tg-theme-text-color, #000000);

    &:hover {
      background: var(--tg-theme-hint-color, #cccccc);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.HelloWorld {
  padding-top: 48px !important;
  height: 100vh !important;
  overflow: hidden !important;
  width: 100vw !important;
}
</style>
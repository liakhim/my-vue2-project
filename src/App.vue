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
    // Задержка для гарантированной инициализации Telegram WebApp
    setTimeout(() => {
      this.initTelegramWebApp();
    }, 100);
  },
  methods: {
    initTelegramWebApp() {
      // Проверяем наличие Telegram WebApp API
      if (window.Telegram && window.Telegram.WebApp) {
        this.tg = window.Telegram.WebApp;
        console.log('Telegram WebApp initialized', this.tg);

        // ОСНОВНЫЕ НАСТРОЙКИ - ВАЖНЫЙ ПОРЯДОК!

        // 1. Сначала расширяем на весь экран
        this.tg.expand();

        // 2. Немедленно скрываем header Telegram
        this.tg.hideHeader();
        this.tg.setHeaderColor('secondary_bg_color');

        // 3. Запрещаем закрытие
        this.tg.enableClosingConfirmation();
        this.tg.disableVerticalSwipes();
        this.tg.disableHorizontalSwipes();

        // 4. Скрываем кнопку назад
        this.tg.BackButton.hide();

        // 5. Настраиваем основной цвет
        this.tg.setBackgroundColor('#ffffff');

        // 6. Принудительно применяем настройки
        this.forceFullscreen();

        console.log('WebApp configured successfully');
      } else {
        console.warn('Not in Telegram WebApp environment');
        this.simulateFullscreen();
      }
    },

    forceFullscreen() {
      // Принудительные стили для полноэкранного режима
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      // Блокировка жестов
      this.preventPullToRefresh();
    },

    simulateFullscreen() {
      // Режим для браузера (тестирование)
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.overflow = 'hidden';
    },

    preventPullToRefresh() {
      // Эффективная блокировка pull-to-refresh
      let lastTouchY = 0;
      const body = document.body;

      body.addEventListener('touchstart', (e) => {
        lastTouchY = e.touches[0].clientY;
      }, { passive: false });

      body.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - lastTouchY;

        // Блокируем скролл вниз в начале страницы
        if (window.scrollY <= 0 && deltaY > 0) {
          e.preventDefault();
        }

        lastTouchY = touchY;
      }, { passive: false });

      // Блокировка контекстного меню
      body.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
      });
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      } else {
        alert('App would close here');
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

/* ЖЕСТКИЙ СБРОС СТИЛЕЙ */
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  -webkit-overflow-scrolling: touch;
}

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
  overflow: hidden;
  margin: 0;
  padding: 0;
}

.custom-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: var(--tg-theme-secondary-bg-color, #f0f0f0);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  z-index: 10000; /* Очень высокий z-index */
  border-bottom: 1px solid var(--tg-theme-hint-color, #cccccc);

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

// Компенсируем отступ для контента под фиксированным header
.HelloWorld {
  padding-top: 48px;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
}
</style>
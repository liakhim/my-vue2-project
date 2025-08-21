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
      tg: null,
      startY: 0
    }
  },
  mounted() {
    this.initTelegramWebApp();
  },
  methods: {
    initTelegramWebApp() {
      // Проверяем, что мы в Telegram Web App
      if (window.Telegram?.WebApp) {
        this.tg = window.Telegram.WebApp;

        console.log('Telegram WebApp detected, initializing...');

        // Основные настройки
        this.tg.expand(); // Растягиваем на весь экран
        this.tg.enableClosingConfirmation(); // Запрещаем закрытие по скроллу

        // Скрываем стандартный header Telegram
        this.tg.setHeaderColor('secondary_bg_color');
        this.tg.hideHeader();

        // Отключаем ненужные жесты
        this.tg.disableVerticalSwipes();
        this.tg.disableHorizontalSwipes();

        // Настраиваем BackButton
        this.tg.BackButton.hide();

        // Блокируем стандартное поведение браузера
        this.preventPullToRefresh();

        // Устанавливаем цвет фона для соответствия теме
        this.tg.setBackgroundColor('#ffffff');

        // Отключаем вибрацию при наведении (если есть)
        if (this.tg.HapticFeedback) {
          this.tg.HapticFeedback.impactOccurred('light');
        }

        console.log('WebApp initialized successfully');
      } else {
        console.log('Not in Telegram WebApp - running in browser mode');
      }
    },

    preventPullToRefresh() {
      // Более эффективная блокировка pull-to-refresh
      document.body.style.overscrollBehavior = 'none';

      // Блокируем жесты касания
      document.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      document.addEventListener('touchend', this.handleTouchEnd, { passive: false });

      // Блокируем скролл за пределы
      window.addEventListener('scroll', this.preventOverscroll, { passive: false });

      // Блокируем контекстное меню
      document.addEventListener('contextmenu', this.preventContextMenu);
    },

    handleTouchStart(e) {
      this.startY = e.touches[0].clientY;
    },

    handleTouchMove(e) {
      // Полностью блокируем любые жесты, которые могут закрыть приложение
      if (window.scrollY === 0 && e.touches[0].clientY - this.startY > 0) {
        e.preventDefault();
        return false;
      }
    },

    handleTouchEnd() {
      this.startY = 0;
    },

    preventOverscroll(e) {
      // Жесткая блокировка любого выхода за границы скролла
      if (window.scrollY < 0) {
        window.scrollTo(0, 0);
        e.preventDefault();
        return false;
      }
    },

    preventContextMenu(e) {
      e.preventDefault();
      return false;
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
    // Убираем обработчики при уничтожении компонента
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    window.removeEventListener('scroll', this.preventOverscroll);
    document.removeEventListener('contextmenu', this.preventContextMenu);
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
  -webkit-tap-highlight-color: transparent; // Убираем подсветку при тапе
  -webkit-touch-callout: none; // Отключаем меню при долгом тапе
  -webkit-user-select: none; // Запрещаем выделение текста
  user-select: none;
}

html, body {
  overscroll-behavior: none; // Блокируем overscroll на уровне документа
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;
}

#app {
  height: 100vh;
  width: 100vw;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
  position: fixed;
  overflow: hidden;
  touch-action: none; // Блокируем стандартные жесты браузера
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
  z-index: 1000;
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
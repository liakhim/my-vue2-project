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

        console.log('WebApp initialized successfully');
      } else {
        console.log('Not in Telegram WebApp - running in browser mode');
      }
    },

    preventPullToRefresh() {
      // Блокируем pull-to-refresh и другие жесты
      document.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
      document.addEventListener('touchend', this.handleTouchEnd, { passive: false });

      // Блокируем скролл за пределы
      document.addEventListener('scroll', this.preventOverscroll, { passive: false });
    },

    handleTouchStart(e) {
      this.startY = e.touches[0].clientY;
    },

    handleTouchMove(e) {
      const currentY = e.touches[0].clientY;

      // Предотвращаем pull-to-refresh
      if (currentY - this.startY > 50 && window.scrollY === 0) {
        e.preventDefault();
      }
    },

    handleTouchEnd() {
      this.startY = null;
    },

    preventOverscroll(e) {
      // Предотвращаем скролл за пределы контента
      if (window.scrollY < 0 || window.scrollY > document.body.scrollHeight - window.innerHeight) {
        e.preventDefault();
        window.scrollTo(0, Math.max(0, Math.min(window.scrollY, document.body.scrollHeight - window.innerHeight)));
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
    // Убираем обработчики при уничтожении компонента
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
    document.removeEventListener('touchend', this.handleTouchEnd);
    document.removeEventListener('scroll', this.preventOverscroll);
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
  height: 100vh;
  background: var(--tg-theme-bg-color, #ffffff);
  color: var(--tg-theme-text-color, #000000);
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
}
</style>
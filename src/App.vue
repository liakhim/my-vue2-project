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
      showCustomHeader: false,
      tg: null
    }
  },
  mounted() {
    this.initializeTelegramWebApp();
  },
  methods: {
    initializeTelegramWebApp() {
      // Проверяем, что мы в Telegram Web App
      if (window.Telegram && window.Telegram.WebApp) {
        this.tg = window.Telegram.WebApp;

        // Скрываем системный header
        this.tg.setHeaderColor('secondary_bg_color');
        this.tg.hideHeader();

        // Растягиваем на весь экран
        this.tg.expand();

        // Отключаем закрытие по скроллу вниз
        this.tg.enableClosingConfirmation();

        // Показываем наш кастомный header
        this.showCustomHeader = true;

        // Настраиваем поведение приложения
        this.tg.disableVerticalSwipes(); // Отключаем вертикальные свайпы
        this.tg.BackButton.hide(); // Скрываем кнопку "Назад"

        console.log('Telegram Web App initialized');
      } else {
        console.log('Not in Telegram Web App environment');
        this.showCustomHeader = true; // Показываем header для тестирования вне Telegram
      }
    },
    closeApp() {
      if (this.tg) {
        this.tg.close();
      } else {
        console.log('App would close here');
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
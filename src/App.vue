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
      tg: null
    }
  },

  mounted() {
    this.initTelegramWebApp();
  },

  methods: {
    async initTelegramWebApp() {
      // Ждем загрузки Telegram Web App API
      await this.waitForTelegramAPI();

      if (window.Telegram && window.Telegram.WebApp) {
        this.tg = window.Telegram.WebApp;

        // Ключевой момент: правильное скрытие header
        this.hideTelegramHeader();

        // Настройка полноэкранного режима
        this.setupFullscreenMode();

      } else {
        console.log('Development mode - not in Telegram');
      }
    },

    waitForTelegramAPI() {
      return new Promise((resolve) => {
        if (window.Telegram && window.Telegram.WebApp) {
          resolve();
        } else {
          setTimeout(() => resolve(), 100);
        }
      });
    },

    hideTelegramHeader() {
      if (!this.tg) return;

      // 1. Основной способ - используем специальный цвет
      this.tg.setHeaderColor('bg_color');

      // 2. Делаем header невидимым
      this.tg.setHeaderColor('#00000000'); // Полная прозрачность

      // 3. Скрываем кнопку назад
      this.tg.BackButton.hide();

      // 4. Убираем заголовок
      this.tg.MainButton.hide();

      // 5. Дополнительные методы (если доступны)
      if (this.tg.HapticFeedback) {
        this.tg.HapticFeedback.impactOccurred('light');
      }
    },

    setupFullscreenMode() {
      if (!this.tg) return;

      // Расширяем на весь экран
      this.tg.expand();

      // Блокируем закрытие свайпом
      this.tg.enableClosingConfirmation();
      this.tg.disableVerticalSwipes();

      // Устанавливаем цвет фона
      this.tg.setBackgroundColor('#667eea');

      // Обработчик изменений
      this.tg.onEvent('viewportChanged', (data) => {
        if (!data.is_expanded) {
          setTimeout(() => this.tg.expand(), 50);
        }
      });

      // Готовность
      this.tg.ready();
    },

    showGame() {
      if (this.tg) {
        this.tg.showPopup({
          title: "Игра началась!",
          message: "Приготовьтесь к gameplay...",
          buttons: [{ type: "ok" }]
        });
      } else {
        alert('Игра начинается!');
      }
    },

    closeApp() {
      if (this.tg) {
        this.tg.close();
      } else {
        alert('Приложение будет закрыто');
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

<template>
  <div>
    <!-- "Скрытый" системный header, маскируем его цветом -->
    <div
        class="telegram-header"
        :style="{ backgroundColor: headerColor, color: textColor }"
    >
      <span class="header-title">Мое приложение</span>
    </div>

    <!-- Основной контент приложения -->
    <div class="app-content">
      <h1>Добро пожаловать в мини-приложение!</h1>
      <button @click="openWebApp">Открыть Web App</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tg: window.Telegram.WebApp,
      headerColor: "#ffffff",
      textColor: "#000000",
    };
  },
  mounted() {
    // Установим заголовок и цвет, используя themeParams
    const theme = this.tg.themeParams;
    this.headerColor = theme.bg_color || "#ffffff";
    this.textColor = theme.text_color || "#000000";

    // Подписка на изменения темы
    this.tg.onEvent("themeChanged", () => {
      const theme = this.tg.themeParams;
      this.headerColor = theme.bg_color || "#ffffff";
      this.textColor = theme.text_color || "#000000";
    });

    // Сообщаем Telegram, что WebApp полностью загружен
    this.tg.ready();
  },
  methods: {
    openWebApp() {
      alert("Тут можно открыть внутреннюю WebApp ссылку или действие");
    },
  },
};
</script>

<style>
.telegram-header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 48px; /* стандартная высота header в Telegram iOS */
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  z-index: 1000; /* чтобы быть поверх системного header */
}

.header-title {
  text-align: center;
}

.app-content {
  padding: 16px;
}
</style>

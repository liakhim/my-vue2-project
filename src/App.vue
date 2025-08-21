<template>
  <div>
    <!-- "Скрытый" системный header, стилизуем под UNICORN -->
    <div
        class="telegram-header"
        :style="{ backgroundColor: headerColor, color: textColor }"
    >
      <!-- Кнопка назад -->
      <button class="back-btn" @click="onBack">
        ←
      </button>

      <!-- Заголовок -->
      <span class="header-title">Мое приложение</span>

      <!-- Иконка справа (например, профиль или info) -->
      <img class="header-icon" src="/logo.png" alt="Logo" />
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
    // Применяем тему пользователя
    this.applyTheme(this.tg.themeParams);

    // Подписка на смену темы
    this.tg.onEvent("themeChanged", (theme) => {
      this.applyTheme(theme);
    });

    // Сообщаем Telegram, что WebApp полностью загружен
    this.tg.ready();
  },
  methods: {
    applyTheme(theme) {
      this.headerColor = theme.bg_color || "#ffffff";
      this.textColor = theme.text_color || "#000000";
    },
    onBack() {
      // Возвращаемся назад через Telegram
      this.tg.close();
    },
    openWebApp() {
      alert("Здесь можно открыть внутреннюю WebApp ссылку");
    },
  },
};
</script>

<style>
.telegram-header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  font-weight: 600;
  font-size: 18px;
  z-index: 1000;
  transition: background-color 0.3s, color 0.3s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.back-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: inherit;
}

.header-title {
  flex: 1;
  text-align: center;
  font-weight: 600;
}

.header-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.app-content {
  padding: 16px;
}
</style>

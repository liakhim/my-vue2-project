<template>
  <div style="border: 1px solid red"></div>
</template>
<script lang="ts">
export default {
  name: 'IosScroll',
  data() {
    return {
      startTouchY: null,
      endTouchY: null,
      items: [
        {
          order: 0,
          label: 'Каждые две недели',
          value: 'every_two_weeks',
          status: null
        },
        {
          order: 1,
          label: 'Каждую неделю',
          value: 'every_week',
          status: null
        },
        {
          order: 2,
          label: 'Два раза в неделю',
          value: 'two_times_in_week',
          status: null
        },
        {
          order: 3,
          label: 'Каждый день',
          value: 'every_day',
          status: null
        },
        {
          order: 4,
          label: 'Два раза в день',
          value: 'two_times_in_day',
          status: null
        },
        {
          order: 5,
          label: 'Каждые две недели',
          value: 'every_two_weeks',
          status: 'before_before_active'
        },
        {
          order: 6,
          label: 'Каждую неделю',
          value: 'every_week',
          status: 'before_active'
        },
        {
          order: 7,
          label: 'Два раза в неделю',
          value: 'two_times_in_week',
          status: 'active'
        },
        {
          order: 8,
          label: 'Каждый день',
          value: 'every_day',
          status: 'after_active'
        },
        {
          order: 9,
          label: 'Два раза в день',
          value: 'two_times_in_day',
          status: 'after_after_active'
        },
        {
          order: 10,
          label: 'Каждые две недели',
          value: 'every_two_weeks',
          status: null
        },
        {
          order: 11,
          label: 'Каждую неделю',
          value: 'every_week',
          status: null
        },
        {
          order: 12,
          label: 'Два раза в неделю',
          value: 'two_times_in_week',
          status: null
        },
        {
          order: 13,
          label: 'Каждый день',
          value: 'every_day',
          status: null
        },
        {
          order: 14,
          label: 'Два раза в день',
          value: 'two_times_in_day',
          status: null
        }
      ]
    }
  },
  computed: {
    screenType() {
      if (this.screenWidth < 768) return 'mobile'
      if (this.screenWidth < 1024) return 'tablet'
      return 'desktop'
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth
    },
    movedHandler(e) {
      if (this.screenType === 'mobile') {
        console.log('movedHandler')
        console.log(e.changedTouches[0].pageY)
      }
    },
    startHandler(e) {
      this.final = false;
      if (this.screenType === 'mobile') {
        this.startTouchY = e.changedTouches[0].pageY
        this.hasUserInteracted = true;
      }
    },
    endHandler(e) {
      if (this.screenType === 'mobile') {
        this.endTouchY = e.changedTouches[0].pageY
        let delta = this.endTouchY - this.startTouchY;
        if (Math.abs(delta) > 10) {
          this.vibrate(15);
        }

        if (delta > 0) {
          if (delta < 100) {
            this.vibrate(20);
          }
          if (delta >= 100 && delta < 200) {
            this.vibrate(20);
            setTimeout(() => this.vibrate(20), 100);
            setTimeout(() => this.vibrate(20), 200);
            setTimeout(() => this.vibrate(20), 300);
          }
          if (delta >= 200) {
            this.vibrate(20);
            setTimeout(() => this.vibrate(20), 100);
            setTimeout(() => this.vibrate(20), 200);
            setTimeout(() => this.vibrate(20), 300);
            setTimeout(() => this.vibrate(20), 400);
            setTimeout(() => this.vibrate(20), 500);
            setTimeout(() => this.vibrate(20), 600);
            setTimeout(() => this.vibrate(20), 700);
            setTimeout(() => this.vibrate(20), 800);
          }
        } else {
          if (delta > -100 && delta < 0) {
            this.transitionCoefficient = 0.3
            this.vibrate(20);
          }
          if (delta > -200 && delta <= -100) {
            this.transitionCoefficient = 1
            this.vibrate(20);
            setTimeout(() => this.vibrate(20), 100);
            setTimeout(() => this.vibrate(20), 200);
            setTimeout(() => this.vibrate(20), 300);
          }
          if (delta <= -200) {
            this.transitionCoefficient = 1
            this.vibrate(20);
            setTimeout(() => this.vibrate(20), 100);
            setTimeout(() => this.vibrate(20), 200);
            setTimeout(() => this.vibrate(20), 300);
            setTimeout(() => this.vibrate(20), 400);
            setTimeout(() => this.vibrate(20), 500);
            setTimeout(() => this.vibrate(20), 600);
            setTimeout(() => this.vibrate(20), 700);
            setTimeout(() => this.vibrate(20), 800);
          }
        }
      }
    },
    tapHandler(e) {
      if (this.screenType === 'mobile') {
        console.log('tapHandler')
        console.log(e)
        this.vibrate(10);
      }
    },
    // Улучшенный метод вибрации
    vibrate(duration = 50) {
      // Для Telegram Web App используем их API
      if (window.Telegram?.WebApp?.HapticFeedback) {
        try {
          // В Telegram используем встроенные методы вибрации
          if (duration <= 20) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
          } else if (duration <= 40) {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
          } else {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
          }
        } catch (error) {
          console.log("Ошибка вибрации Telegram:", error);
        }
      }
      // Для обычного браузера с проверкой взаимодействия
      else if ("vibrate" in navigator && this.hasUserInteracted) {
        try {
          navigator.vibrate(duration);
        } catch (error) {
          console.log("Ошибка вибрации:", error);
        }
      }
    },
    canVibrate() {
      // Проверяем поддержку вибрации и что пользователь уже взаимодействовал со страницей
      return "vibrate" in navigator && this.hasUserInteracted;
    }
  },
  mounted() {
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
<style scoped lang="scss">

</style>
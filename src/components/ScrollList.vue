<template>
<!--  v-touch:swipe.down="swipeHandler"-->
  <div class="scroll-list" v-touch:moving="movedHandler" v-touch:start="startHandler" v-touch:end="endHandler">
    <div class="scroll-list-track">
      <div v-for="(item, index) in items" :key="item + '_' + index" class="scroll-list-item" :style="{'transition': transitionCoefficient + 's', 'transform': 'translateY(' + offsetY + 'px)'}">{{item.label}}</div>
    </div>
    <span v-touch:tap="tapHandler">Tap</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ScrollList',
  data() {
    return {
      startTouchY: null,
      endTouchY: null,
      transitionCoefficient: 1,
      offsetY: 0,
      offsetStep: 20,
      screenWidth: 0,
      items: [
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
        },
        {
          label: 'Каждые две недели',
          value: 'every_two_weeks'
        },
        {
          label: 'Каждую неделю',
          value: 'every_week'
        },
        {
          label: 'Два раза в неделю',
          value: 'two_times_in_week'
        },
        {
          label: 'Каждый день',
          value: 'every_day'
        },
        {
          label: 'Два раза в день',
          value: 'two_times_in_day'
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
      if (this.screenType === 'mobile') {
        console.log('startHandler')
        console.log(e)
        this.startTouchY = e.changedTouches[0].pageY

        // Убираем вибрацию из startHandler или добавляем флаг
        this.hasUserInteracted = true;
      }
    },
    endHandler(e) {
      if (this.screenType === 'mobile') {
        console.log('endHandler')
        console.log(e)
        this.endTouchY = e.changedTouches[0].pageY
        console.log('delta')
        console.log(this.endTouchY - this.startTouchY)
        let delta = this.endTouchY - this.startTouchY;

        // Вибрация только если было взаимодействие и для значительного скролла
        if (Math.abs(delta) > 10) {
          this.vibrate(15);
        }

        if (delta > 0) {
          if (delta < 100) {
            this.offsetStep = 40
            this.offsetY += this.offsetStep
            this.transitionCoefficient = 0.3
            this.vibrate(20);
          }
          if (delta >= 100 && delta < 200) {
            this.offsetStep = 160
            this.offsetY += this.offsetStep
            this.transitionCoefficient = 1
            this.vibrate(30);
          }
          if (delta >= 200) {
            this.offsetStep = 360
            this.offsetY += this.offsetStep
            this.transitionCoefficient = 1
            this.vibrate(50);
          }
        } else {
          if (delta > -100 && delta < 0) {
            this.offsetStep = 40
            this.offsetY -= this.offsetStep
            this.transitionCoefficient = 0.3
            this.vibrate(20);
          }
          if (delta > -200 && delta <= -100) {
            this.offsetStep = 160
            this.offsetY -= this.offsetStep
            this.transitionCoefficient = 1
            this.vibrate(30);
          }
          if (delta <= -200) {
            this.offsetStep = 360
            this.offsetY -= this.offsetStep
            this.transitionCoefficient = 1
            this.vibrate(50);
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
.scroll-list {
  overflow: auto;
  overscroll-behavior: contain;
  width: 390px;
  height: 200px;
  border: 1px solid #fff;
  overflow: hidden;
  &-track {
    margin-top: -1200px;
  }
  &-item {
    height: 40px;
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
}
</style>
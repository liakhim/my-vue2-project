<template>
<!--  v-touch:swipe.down="swipeHandler"-->
  <div class="scroll-list" v-touch:moving="movedHandler" v-touch:start="startHandler" v-touch:end="endHandler">
    <div class="active-item"></div>
    <div class="scroll-list-track">
      <div v-for="(item, index) in items"
           :key="item + '_' + index"
           :class="[
               'scroll-list-item',
               -(offsetY/40) + 15 === index ? ('before_before_active ' + '_' + offsetY) : '',
               -(offsetY/40) + 16 === index ? 'before_active' : '',
               -(offsetY/40) + 17 === index ? 'active ' : '',
               -(offsetY/40) + 18 === index ? 'after_active' : '',
               -(offsetY/40) + 19 === index ? 'after_after_active' : '',
           ]"
           :style="{'transition': transitionCoefficient + 's', 'transform': 'translateY(' + offsetY + 'px)'}">
        <span class="scroll-list-item-content">{{item.label}}</span>
      </div>
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
      screenWidth: 0
    }
  },
  props: ['items'],
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
        if (delta > 0 && this.offsetY >= -680 && this.offsetY < 680) {
          this.offsetStep = 40
          this.offsetY += this.offsetStep
          this.transitionCoefficient = 0.3
          this.vibrate(20);
        }
        if (delta < 0 && this.offsetY > -680 && this.offsetY <= 680) {
          this.offsetStep = 40
          this.offsetY -= this.offsetStep
          this.transitionCoefficient = 0.3
          this.vibrate(20);
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
  width: auto;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // border: 1px solid #fff;
  overflow: hidden;
  position: relative;
  .active-item {
    position: absolute;
    top: 71px;
    width: 90%;
    margin-left: 5%;
    height: 38px;
    border: 2px solid #38E07A;
    border-radius: 20px;
  }
  &-track {
    // margin-top: -1200px;
  }
  &-item {
    height: 40px;
    color: #fff;
    display: flex;
    align-items: center;
    opacity: 0.09;
    padding: 0 20px;
    &.active {
      opacity: 1;
    }
    &.before_active {
      opacity: 0.2;
      transform: perspective(300px) rotateX(20deg);
    }
    &.before_before_active {
      opacity: 0.09;
      transform:perspective(300px) rotateX(40deg);
    }
    &.after_active {
      opacity: 0.2;
      transform:perspective(300px) rotateX(-20deg);
    }
    &.after_after_active {
      opacity: 0.09;
      transform:perspective(300px) rotateX(-40deg);
    }
    .scroll-list-item-content {
      text-align: center;
      width: 100%;
    }
  }
}
</style>
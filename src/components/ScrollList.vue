<template>
<!--  v-touch:swipe.down="swipeHandler"-->
<div :class="size">
  <div class="scroll-list"
       :class="{'disabled-scroll-list': disabled}"
       @wheel="scrollHandler"
       v-touch:moving="movedHandler"
       v-touch:start="startHandler"
       v-touch:end="endHandler">
    <div class="active-item"></div>
    <div class="scroll-list-track">
      <div v-for="(item, index) in items"
           :key="item + '_' + index"
           :class="[
               'scroll-list-item',
               -(offsetY/itemHeight) + 14 === index ? ('before_before_before_active ' + '_' + offsetY) : '',
               -(offsetY/itemHeight) + 15 === index ? ('before_before_active ' + '_' + offsetY) : '',
               -(offsetY/itemHeight) + 16 === index ? 'before_active' : '',
               -(offsetY/itemHeight) + 17 === index ? 'active' : '',
               -(offsetY/itemHeight) + 18 === index ? 'after_active' : '',
               -(offsetY/itemHeight) + 19 === index ? 'after_after_active' : '',
               -(offsetY/itemHeight) + 20 === index ? 'after_after_after_active' : '',
           ]"
           :style="{'transition': transitionCoefficient + 's', 'transform': 'translateY(' + offsetY + 'px)'}">
        <span class="scroll-list-item-content">{{item.label}}</span>
      </div>
    </div>
<!--    <span v-touch:tap="tapHandler">Tap</span>-->
  </div>
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
      itemHeight: 40
    }
  },
  props: ['size', 'items', 'disabled'],
  computed: {
    screenType() {
      if (this.screenWidth < 768) return 'mobile'
      if (this.screenWidth < 1024) return 'tablet'
      return 'desktop'
    },
    active_item() {
      return this.items.find((v, index) => index === -(this.offsetY/this.itemHeight ) + 17)
    }
  },
  watch: {
    active_item(v) {
      this.$emit('set-active-item', v)
    }
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth
    },
    scrollHandler(e) {
      this.offsetStep = this.itemHeight
      this.transitionCoefficient = 0.4
      if (e.deltaY < 0 && this.offsetY > -17 * this.itemHeight && this.offsetY <= 17 * this.itemHeight) {
        this.offsetY += this.offsetStep
      }
      if (e.deltaY > 0 && this.offsetY > -17 * this.itemHeight && this.offsetY <= 17 * this.itemHeight) {
        this.offsetY -= this.offsetStep
      }
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
        if (delta > 0 && this.offsetY >= -17 * this.itemHeight && this.offsetY < 17 * this.itemHeight) {
          this.offsetStep = this.itemHeight
          this.offsetY += this.offsetStep
          this.transitionCoefficient = 0.3
          this.vibrate(20);
        }
        if (delta < 0 && this.offsetY > -17 * this.itemHeight && this.offsetY <= 17 * this.itemHeight ) {
          this.offsetStep = this.itemHeight
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
    this.itemHeight = this.size === 'size-s' ? 20 : 40
    this.screenWidth = window.innerWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
</script>
<style scoped lang="scss">
.size-m {
  .scroll-list {
    overscroll-behavior: contain;
    width: auto;
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;
    .active-item {
      position: absolute;
      top: 81px;
      width: 90%;
      margin-left: 5%;
      height: 38px;
      border: 2px solid #38E07A;
      border-radius: 20px;
    }
    &-item {
      height: 40px;
      color: #fff;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 30px;
      justify-content: center;
      .scroll-list-item-content {
        opacity: 0.09;
        text-align: center;
      }
      &.active {
        opacity: 1;
      }
      &.before_before_before_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(60deg);
        }
      }
      &.before_before_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(40deg);
        }
      }
      &.before_active {
        .scroll-list-item-content {
          opacity: 0.2;
          transform: perspective(300px) rotateX(20deg);
        }
      }
      &.active {
        .scroll-list-item-content {
          opacity: 1;
        }
      }
      &.after_active {
        .scroll-list-item-content {
          opacity: 0.2;
          transform:perspective(300px) rotateX(-20deg);
        }
      }
      &.after_after_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(-40deg);
        }
      }
      &.after_after_after_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(-60deg);
        }
      }
      .scroll-list-item-content {
        .scroll-list-item-content {
          width: 100%;
        }
      }
    }
  }
  .scroll-list.disabled-scroll-list {
    opacity: 0.2;
    cursor: not-allowed;
  }
}
.size-s {
  .scroll-list {
    overscroll-behavior: contain;
    width: auto;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: relative;
    .active-item {
      position: absolute;
      top: 41px;
      width: 90%;
      margin-left: 5%;
      height: 19px;
      border: 1px solid #38E07A;
      border-radius: 20px;
    }
    &-item {
      height: 20px;
      color: #fff;
      display: flex;
      align-items: center;
      text-align: center;
      padding: 0 12px;
      justify-content: center;
      .scroll-list-item-content {
        opacity: 0.09;
        text-align: center;
        font-size: 12px;
      }
      &.active {
        opacity: 1;
      }
      &.before_before_before_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(60deg);
        }
      }
      &.before_before_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(40deg);
        }
      }
      &.before_active {
        .scroll-list-item-content {
          opacity: 0.2;
          transform: perspective(300px) rotateX(20deg);
        }
      }
      &.active {
        .scroll-list-item-content {
          opacity: 1;
        }
      }
      &.after_active {
        .scroll-list-item-content {
          opacity: 0.2;
          transform:perspective(300px) rotateX(-20deg);
        }
      }
      &.after_after_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(-40deg);
        }
      }
      &.after_after_after_active {
        .scroll-list-item-content {
          opacity: 0.09;
          transform:perspective(300px) rotateX(-60deg);
        }
      }
      .scroll-list-item-content {
        .scroll-list-item-content {
          width: 100%;
        }
      }
    }
  }
  .scroll-list.disabled-scroll-list {
    opacity: 0.2;
    cursor: not-allowed;
  }
}
</style>
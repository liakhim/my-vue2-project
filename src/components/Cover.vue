<template>
  <div class="main-page">
    <div class="cards-wrapper">
      <div class="cards-box">
        <Cards :offset="offset" card-state-class="left-of-active" collection="cat" cards-length="6"/>
        <Cards :offset="offset" card-state-class="active" collection="chh" cards-length="5"/>
        <Cards :offset="offset" card-state-class="right-of-active" collection="front-puppy" cards-length="7"/>
      </div>
    </div>
    <div class="mini-slider-box">
      <div @click="activate(2)" class="mini-slider-slide" :class="{'active': offset=== 650}">
        <div class="mini-slider-slide-mask"></div>
        <div class="mini-slider-slide-body">
          <div class="icon">
            <img src="../assets/cat/cover-3.jpg" alt="">
          </div>
          <div class="name">
            <p>Vasiliy</p>
          </div>
        </div>
      </div>
      <div @click="activate(1)" class="mini-slider-slide" :class="{'active': offset=== 0}">
        <div class="mini-slider-slide-mask"></div>
        <div class="mini-slider-slide-body">
          <div class="icon">
            <img src="../assets/chh/cover-2.jpg" alt="">
          </div>
          <div class="name">
            <p>Monica</p>
          </div>
        </div>
      </div>
      <div @click="activate(0)" class="mini-slider-slide" :class="{'active': offset=== -650}">
        <div class="mini-slider-slide-mask"></div>
        <div class="mini-slider-slide-body">
          <div class="icon">
            <img src="../assets/front-puppy/cover-1.jpg" alt="">
          </div>
          <div class="name">
            <p>Fluke</p>
          </div>
        </div>
      </div>

    </div>
    <div class="button-box">
      <button @click="goToRouteWithVibration('/settings')" class="start-button" style="width: 100%;">
        <span>Начать пользоваться</span>
      </button>
      <div class="info-block-wrapper" style="position:relative;">
        <InfoBlock/>
      </div>
    </div>
  </div>
</template>

<script>
import Cards from "@/components/Cards.vue";
import InfoBlock from "@/components/InfoBlock.vue";

export default {
  name: 'HelloWorld',
  components: {Cards, InfoBlock},
  data() {
    return {
      offset: -650
    }
  },
  methods: {
    activate(collection) {
      if (collection === 0) {
        this.offset = -650
      }
      if (collection === 1) {
        this.offset = 0
      }
      if (collection === 2) {
        this.offset = 650
      }
    },
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
    goToRouteWithVibration(route) {
      this.$router.push(route);
      this.vibrate(20);
    }
  }
}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100vw;
  position: relative;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  max-height: 100vh;
}

.cards-wrapper {
  display: flex;
  justify-content: center;
  .cards-box {
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 700px;
    overflow: hidden;
    @media (max-width: 690px) {
      max-width: 370px;
    }
  }
}

.mini-slider-box {
  position: relative;
  height: 40px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  gap: 12px;
  .mini-slider-slide {
    width: auto;
    border-radius: 30px;
    padding: 0;
    position: relative;
    overflow: hidden;
    margin: 2px 0 0 0;
    height: 36px;
    cursor: pointer;
    border: 2px solid #121714;
    background: #121714;
    &:hover {
      .mini-slider-slide-body {
        .name {
          p {
            color: #38E07A;
          }
        }
      }
      .mini-slider-slide-mask {
        backdrop-filter: none!important;
        background: none!important;
      }
    }
    &-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    &-body {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .icon {
        margin-top: 0;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #38E07A;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .name {
        p {
          color: #fff;
          font-size: 14px;
          font-weight: bold;
          padding: 3px 10px 3px 10px;
          font-family: Jem, sans-serif;
          white-space: nowrap;
          @media (max-width: 690px) {
            font-size: 12px;
          }
        }
      }
    }
  }
  .mini-slider-slide.active {
    border: 2px solid #38E07A;
    .mini-slider-slide-body {
      .icon {
        margin: 0 0 0 -2px;
      }
      .name {
        p {
          color: #fff;
        }
      }
    }
    .mini-slider-slide-mask {
      background: transparent;
    }
  }
}

.button-box {
  max-width: 360px;
  position: relative;
  margin-top: 60px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  .start-button {
    background: #38E07A;
    border-radius: 0 30px;
    padding: 15px 40px;
    cursor: pointer;
    width: 100%;
    border: 1px solid #237F45;
    outline: none;
    span {
      color: #121714;
      font-size: 14px;
      font-weight: 900;
    }
  }
  @media (max-width: 690px) {
    margin-top: 15px;
  }
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>

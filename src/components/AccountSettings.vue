<template>
  <div class="settings-wrapper">
    <div class="page-header">
      <div class="page-header-title">
        <h5>Настроим частоту напоминаний</h5>
      </div>
    </div>
    <div class="photo-block">
      <img src="../assets/dog.png" alt="">
    </div>
    <div class="day-block">
<!--      <div class="circle-menu">-->
<!--        <div class="circle-menu-content">-->
<!--          <div class="item-row">-->
<!--            <div class="circle-item"></div>-->
<!--            <div class="circle-item"></div>-->
<!--          </div>-->
<!--          <div class="circle-menu-center-dot"></div>-->
<!--          <div class="item-row">-->
<!--            <div class="circle-item"></div>-->
<!--            <div class="circle-item"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <div class="list-wrapper">
      <div class="list" style="margin-right: 20px">
        <div class="list-item">
          <p>Каждые две недели</p>
        </div>
        <div class="list-item">
          <p>Каждую неделю</p>
        </div>
        <div class="list-item">
          <p>Каждый день</p>
        </div>
        <div class="list-item">
          <p>Два раза в день</p>
        </div>
        <div class="list-item">
          <p>Несколько раз в день</p>
        </div>
      </div>
      <div class="list">
        <div class="list-item">
          <p>07:00</p>
        </div>
        <div class="list-item">
          <p>09:00</p>
        </div>
        <div class="list-item">
          <p>11:00</p>
        </div>
        <div class="list-item">
          <p>13:00</p>
        </div>
        <div class="list-item">
          <p>15:00</p>
        </div>
      </div>


<!--      <div class="vert-checker">-->
<!--        <div class="checker-wrapper">-->
<!--          <div class="checker-wrapper-wheel">-->
<!--            <div class="checker-wrapper-wheel-track-wrapper">-->
<!--              <div class="checker-wrapper-wheel-track">-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--                <div :style="{'transform': 'translateY(' + tog + 'px)'}" class="checker-wrapper-wheel-item"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AccountSettings',
  data() {
    return {
      tog: false
    }
  },
  methods: {
    turn() {
      this.tog = this.tog + 56
    },
    ret() {
      this.tog = this.tog - 56
    }
  }
}
</script>
<style scoped lang="scss">
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #000;
  padding: 24px 10px;
  box-shadow: 0 0 10px #ffffff20;
  .page-header-arrow {
    .back-button {
      width: 50px;
      background: none;
      padding: 10px 20px;
      border: none;
      outline: none;
      span {
        color: #fff;
      }
    }
  }
  .page-header-title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    h5 {
      text-align: center;
      color: #fff;
      font-size: 18px;
    }
  }
}

.photo-block {
  position: relative;
  z-index: 100;
  img {
    width: 100%;
  }
}

.list-wrapper {
  display: flex;
  width: 90%;
  margin: auto;
  justify-content: center;
  align-items: flex-start;
  background: #00000020;
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  margin-top: -30px;
  box-shadow: 0 0 10px #ffffff20;
  .list {
    .list-item {
      margin: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #00000050;
      backdrop-filter: blur(10px);
      &:nth-child(1) {
        opacity: 0.09;
      }
      &:nth-child(2) {
        opacity: 0.2;
      }
      &:nth-child(3) {
        opacity: 1;
        border: 1px solid #38E07A;
        border-radius: 20px;
        padding: 5px 20px;
        p {
          color: #38E07A
        }
      }
      &:nth-child(4) {
        opacity: 0.2;
      }
      &:nth-child(5) {
        opacity: 0.09;
      }
      p {
        color: #fff;
        font-size: 17px;
      }
    }
  }
}

.vert-checker {
  width: 58px;
  height: 150px;
  border-radius: 26px;
  background: #D9D9D9;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .checker-wrapper {
    width: 52px;
    height: 142px;
    background: #000;
    border-radius: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .checker-wrapper-wheel {
      border-radius: 25px;
      width: 40px;
      height: 130px;
      background: red;
      background: linear-gradient(to bottom, #424548 0%, #9A9C9E 25%, #21292f 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      .checker-wrapper-wheel-track-wrapper {
        height: 112px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

      }
      &-track {
        height: 260px;
        display: flex;
        flex-direction: column;
        align-items: center;

      }
      .checker-wrapper-wheel-item {
        transition: 1s;
        width: 30px;
        height: 7px;
        margin-top: 5px;
        margin-bottom: 5px;
        background: #303436;
        border-radius: 2px;
      }
    }
  }
}

.settings-wrapper {
  margin-left: auto;
  margin-right: auto;
  max-width: 700px;
}
.circle-menu {
  margin: auto;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: #000;
  box-shadow: 0 0 10px #38E07A;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: rotate(45deg);
  position: relative;
  .circle-menu-center-dot {
    position: absolute;
    width: 160px;
    height: 160px;
    z-index: 100;
    border-radius: 50%;
    top: calc(50% - 80px);
    left: calc(50% - 80px);
    background: #000;
    box-shadow: 0 0 10px #38E07A;
  }
  &-content {
    .item-row {
      display: flex;
      align-items: center;
    }
    .circle-item {
      width: 150px;
      height: 150px;
      box-shadow: 0 0 10px #38E07A;
    }
  }
}
</style>
<script setup lang="ts">
</script>
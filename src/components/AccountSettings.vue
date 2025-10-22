<template>
  <div class="settings-wrapper">
    <div class="page-header">
      <div @click="$router.push('/')" class="page-header-arrow">
        <img src="../assets/arr.svg" alt="">
      </div>
      <div class="page-header-title">
        <h5>Настроим частоту напоминаний</h5>
      </div>
      <div class="page-header-arrow">

      </div>
    </div>

    <div class="scroll-list-wrapper" style="margin-top: 200px">
      <ScrollList/>
    </div>
    <div class="scroll-list-wrapper">
      <IosScroll/>
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
  background: linear-gradient(180deg, black 30%, transparent);
  padding: 36px 10px 24px;
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
  .page-header-arrow {
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
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
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(to bottom, #00000070, #ffffff02, #00000070);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -20px;
  box-shadow: 0 0 10px #ffffff20;
  .list {
    .list-item {
      margin: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      &:nth-child(1) {
        opacity: 0.09;
        transform:perspective(300px) rotateX(40deg);
      }
      &:nth-child(2) {
        opacity: 0.2;
        transform:perspective(300px) rotateX(20deg);
      }
      &:nth-child(3) {
        opacity: 1;
        border: 1px solid #38E07A;
        border-radius: 20px;
        padding: 5px 13px;
        p {
          color: #38E07A
        }
      }
      &:nth-child(4) {
        opacity: 0.2;
        transform:perspective(300px) rotateX(-20deg);
      }
      &:nth-child(5) {
        opacity: 0.09;
        transform:perspective(300px) rotateX(-40deg);
      }
      p {
        color: #fff;
        font-size: 15px;
        white-space: none;
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
import ScrollList from "@/components/ScrollList.vue";
import IosScroll from "@/components/IosScroll.vue";
</script>
<template>
  <div class="info-block">
    <div :class="{'open': infoBlockStateOpen, 'hide': !infoBlockStateOpen}" class="info-block-open-state">
      <div class="info-block-content">
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi dolor earum eligendi, hic nostrum quisquam voluptatem. Impedit, quasi, repellendus?</p>
      </div>
    </div>
    <button @click="infoBlockStateOpen = !infoBlockStateOpen" class="info-block-button">
      <span v-if="!infoBlockStateOpen">?</span>
      <span v-else>x</span>
    </button>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      infoBlockStateOpen: false
    }
  }
}
</script>
<style lang="scss" scoped>
.info-block-open-state {
  position: relative;
}

.info-block-button {
  cursor: pointer;
  position: relative;
  background: #121714;
  color: #ffffff;
  border-radius: 50px;
  border: none;
  padding: 15px;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  span {
    color: #fff;
  }
}
.info-block-content {
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  flex-direction: column;

  h2 {
    font-family: 'Jem', sans-serif;
  }
}
.info-block-open-state {
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: 0;
  height: 0;
  border-radius: 30px;
  box-shadow: 0 0 10px #38E07A70;
  position: absolute;
  right: 0;
  bottom: 0;
  background: #121714;
  overflow: hidden;
}
.info-block-open-state.open {
  animation: .4s stretching ease-in-out;
  width: 320px;
  height: 540px;
  .info-block-content {
    animation: ease-in-out 2s show-content;
  }
}
.info-block-open-state.hide {
  animation: .4s hide ease-in-out;
  .info-block-content {
    animation: 0.1s hide-content ease-in-out ;
    display: none;
  }
}
@keyframes stretching {
  0%, 20% {
    width: 0;
    height: 0;
    display: none;
  }
  100% {
    width: 320px;
    height: 540px;
    display: flex;
  }
}
@keyframes show-content {
  0%, 20% {
    display: none;
  }
  100% {
    display: flex;
  }
}

@keyframes hide-content {
  0%, 20% {
    display: none;
  }
  100% {
    display: none;
  }
}
@keyframes hide {
  0%, 20% {
    width: 320px;
    height: 540px;
    display: flex;
  }
  100% {
    width: 0;
    height: 0;
    display: none;
  }
}
</style>
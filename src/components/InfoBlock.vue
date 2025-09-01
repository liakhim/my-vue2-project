<template>
  <div class="info-block">
    <div v-if="infoBlockStateOpen" class="info-block-open-state">
      <div class="info-block-content">
        <h2>Lorem ipsum dolor sit amet.</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae commodi dolor earum eligendi, hic nostrum quisquam voluptatem. Impedit, quasi, repellendus?</p>
      </div>
    </div>
    <button @click="infoBlockStateOpen = !infoBlockStateOpen" class="info-block-button" style="cursor: pointer;position: relative;background: #121714; color: #ffffff; border-radius: 50px; padding: 15px; width: 50px; height: 50px;margin-left: 10px;">
      <span v-if="!infoBlockStateOpen" style="color: #fff;">?</span>
      <span v-else style="color: #fff;">x</span>
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
.info-block-content {
  padding: 20px;
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  h2 {
    font-family: Jem, sans-serif;
  }
}
.info-block-open-state {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: 320px;
  height: 520px;
  border-radius: 30px;
  box-shadow: 0 0 10px #38E07A70;
  position: absolute;
  right: 0px;
  bottom: 0;
  background: #121714;
}
</style>
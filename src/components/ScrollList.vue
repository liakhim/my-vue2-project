<template>
  <div class="scroll-list" v-touch:swipe.left="swipeHandler">
    <div class="scroll-list-track">
      <div class="scroll-list-item"></div>
      <div class="scroll-list-item"></div>
      <div class="scroll-list-item"></div>
    </div>
    <span v-touch:tap="tapHandler">Tap</span>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ScrollList',
  data() {
    return {}
  },
  methods: {
    swipeHandler(e) {
      console.log(e)
      alert('swipeHandler')
    },
    tapHandler(e) {
      console.log('tapHandler')
      console.log(e)
      alert('here')
    }
  }
}
</script>
<style scoped lang="scss">
.scroll-list {
  width: 500px;
  height: 300px;
  border: 1px solid #fff;
}
</style>
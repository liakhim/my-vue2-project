<template>
<!--  v-touch:swipe.down="swipeHandler"-->
  <div class="scroll-list" v-touch:start="startHandler" v-touch:end="endHandler">
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
        }
      ]
    }
  },
  methods: {
    // swipeHandler(e) {
    //   console.log(e)
    //   if (e === 'bottom') {
    //     this.offsetY += 20
    //     // const lastElement = this.items.pop();
    //     // this.items.unshift(lastElement)
    //   }
    //   if (e === 'top') {
    //     this.offsetY -= 20
    //     // const lastElement = this.items.pop();
    //     // this.items.unshift(lastElement)
    //   }
    // },
    startHandler(e) {
      console.log('startHandler')
      console.log(e)
      this.startTouchY = e.changedTouches[0].pageY
    },
    endHandler(e) {
      console.log('endHandler')
      console.log(e)
      this.endTouchY = e.changedTouches[0].pageY
      console.log('delta')
      console.log(this.endTouchY - this.startTouchY)
      let delta = this.endTouchY - this.startTouchY;
      if (delta > 0) {
        if (delta < 50) {
          this.offsetStep = 40
          this.offsetY += this.offsetStep
          this.transitionCoefficient = 1
        }
        if (delta >= 50 && delta < 100) {
          this.offsetStep = 80
          this.offsetY += this.offsetStep
          this.transitionCoefficient = 0.6
        }
        if (delta >= 100) {
          this.offsetStep = 120
          this.offsetY += this.offsetStep
          this.transitionCoefficient = 0.1
        }
      } else {
        if (delta > -50 && delta < 0) {
          this.offsetStep = 40
          this.offsetY -= this.offsetStep
          this.transitionCoefficient = 1
        }
        if (delta > -100 && delta <= -50) {
          this.offsetStep = 80
          this.offsetY -= this.offsetStep
          this.transitionCoefficient = 0.6
        }
        if (delta <= -100) {
          this.offsetStep = 120
          this.offsetY -= this.offsetStep
          this.transitionCoefficient = 0.1
        }
      }

    },
    tapHandler(e) {
      console.log('tapHandler')
      console.log(e)
    }
  }
}
</script>
<style scoped lang="scss">
.scroll-list {
  overscroll-behavior: contain;
  width: 500px;
  height: 200px;
  border: 1px solid #fff;
  overflow: hidden;
  &-track {
    margin-top: -400px;
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
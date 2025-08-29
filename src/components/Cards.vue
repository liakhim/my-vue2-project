<template>
  <div :class="[cardStateClass, 'cards']" :style="{transform: 'translateX(' + offset + 'px)'}">
    <div v-for="(card, index) in cards"
         :key="card.position"
         class="card"
         :style="{'z-index': index}"
         :class="['card-' + card.position, {'displaced': (switchableCardId !== null && card.position === switchableCardId)}]">
      <div class="card-window">
        <img :src="require('../assets/' + collection + '/'+ card.id +'.png')" alt="">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Cards",
  props: ['cardStateClass', 'collection', 'cardsLength', 'offset'],
  data() {
    return {
      cards: [],
      intervalId: null,
      switchableCardId: null
    }
  },
  methods: {
    rand() {
      setTimeout(() => this.switchableCardId = this.cards[this.cards.length - 1].id)
      setTimeout(() => {
        let sliceCard = this.cards.pop();
        this.cards.slice(this.cards.indexOf(sliceCard), 1)
        console.log('sliceCard')
        console.log(sliceCard)
        this.cards.unshift(sliceCard)
      }, 600)
      setTimeout(() => this.switchableCardId = null, 700)
    }
  },
  beforeMount() {
    for (let i = 0; i < this.cardsLength; i++) {
      this.cards.push({
        id: i,
        name: String(i),
        position: i
      })
    }
    console.log(this.cards)
  },
  beforeUnmount() {

    clearInterval(this.intervalId);
  },
  mounted() {
    this.intervalId = setInterval(this.rand, 2500);
  }
}
</script>
<style scoped lang="scss">
.cards {
  width: 650px;
  min-width: 650px;
  overflow: hidden;
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.6s;
  @media (max-width: 690px) {
    margin: 0 0 0 0;
  }
  .card {
    width: 400px;
    height: 500px;
    margin: auto;
    position: absolute;
    transition: 500ms;
    &-window {
      height: 100%;
      img {
        width: 100%;
      }
    }
  }
  .card.displaced {
    transform: rotate(0deg) translateY(-600px)!important;
  }
  .card.card-0 {
    transform: rotate(-5deg);
    margin-left: -100px;
  }
  .card.card-1 {
    transform: rotate(-15deg);
    margin-left: 0;
  }
  .card.card-2 {
    transform: rotate(-5deg);
    margin-left: 30px;
  }
  .card.card-3 {
    transform: rotate(4deg);
    margin-left: 80px;
    transition: 1s;
  }
  @media (max-width: 690px) {
    width: 400px;
    height: 450px;
    margin: 20px auto 0 auto;
    .card {
      width: 300px;
      height: 300px;
      top: 50px;
    }
    .card.card-0 {
      margin-left: -20px;
    }
    .card.card-1 {
      margin-left: 0;
    }
    .card.card-2 {
      margin-left: 15px;
    }
    .card.card-3 {
      margin-left: 40px;
    }
  }
}
.cards-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #000;
  z-index: 1000;
}
.cards.active {
  .cards-mask {
    background: transparent;
  }
}
.cards-mask {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}

</style>
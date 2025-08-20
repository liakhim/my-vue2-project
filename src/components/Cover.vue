<template>
  <div class="main-page">
    <div class="background">
      <img src="../assets/front-puppy/back.jpg" alt="">
    </div>
    <div class="title">
      <h1>Сохраните воспоминания о том, как рос ваш самый преданный друг...</h1>
      <p>...а мы поможем это реализовать</p>
    </div>
    <div class="cards-wrapper">
      <div class="cards-box">
        <div class="left-side"></div>
        <div class="cards left-of-active">
          <div v-for="(card, index) in cards"
               :key="card.position"
               class="card"
               :style="{'z-index': index}"
               :class="['card-' + card.position, {'displaced': (switchableCardId !== null && card.position === switchableCardId)}]">
            <div class="card-window">
              <img :src="require('../assets/front-puppy/'+ card.id +'.png')" alt="">
            </div>
          </div>
        </div>
        <div class="cards active">
          <div v-for="(card, index) in cards"
               :key="card.position"
               class="card"
               :style="{'z-index': index}"
               :class="['card-' + card.position, {'displaced': (switchableCardId !== null && card.position === switchableCardId)}]">
            <div class="card-window">
              <img :src="require('../assets/front-puppy/'+ card.id +'.png')" alt="">
            </div>
          </div>
        </div>
        <div class="cards right-of-active">
          <div v-for="(card, index) in cards"
               :key="card.position"
               class="card"
               :style="{'z-index': index}"
               :class="['card-' + card.position, {'displaced': (switchableCardId !== null && card.position === switchableCardId)}]">
            <div class="card-window">
              <img :src="require('../assets/front-puppy/'+ card.id +'.png')" alt="">
            </div>
          </div>
        </div>
        <div class="right-side"></div>
      </div>
    </div>
    <div class="mini-slider-box">
      <div class="mini-slider-slide left-of-active">
        <div class="mini-slider-slide-mask"></div>
        <div class="mini-slider-slide-body">
          <div class="icon">
            <img src="../assets/front-puppy/cover-1.jpg" alt="">
          </div>
          <div class="name">
            <p>Fluke story</p>
          </div>
        </div>
      </div>
      <div class="mini-slider-slide active">
        <div class="mini-slider-slide-mask"></div>
        <div class="mini-slider-slide-body">
          <div class="icon">
            <img src="../assets/front-puppy/cover-1.jpg" alt="">
          </div>
          <div class="name">
            <p>Fluke story</p>
          </div>
        </div>
      </div>
      <div class="mini-slider-slide right-of-active">
        <div class="mini-slider-slide-mask"></div>
        <div class="mini-slider-slide-body">
          <div class="icon">
            <img src="../assets/front-puppy/cover-1.jpg" alt="">
          </div>
          <div class="name">
            <p>Fluke story</p>
          </div>
        </div>
      </div>

    </div>
    <div class="button-box">
      <button style="background: #38E07A; border-radius: 50px; padding: 20px 60px; cursor: pointer">
        <span style="color: #121714; font-size: 18px; font-weight: 900">НАЧАТЬ ПОЛЬЗОВАТЬСЯ</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      cards: [
        {
          id: 0,
          name: '0',
          position: 0
        },
        {
          id: 1,
          name: '1',
          position: 1
        },
        {
          id: 2,
          name: '2',
          position: 2
        },
        {
          id: 3,
          name: '3',
          position: 3
        },
        {
          id: 4,
          name: '4',
          position: 4
        },
        {
          id: 5,
          name: '5',
          position: 5
        },
        {
          id: 6,
          name: '6',
          position: 6
        }
      ],
      switchableCardId: null,
      intervalId: null,
    }
  },
  props: {
    msg: String
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
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
  mounted() {
    this.intervalId = setInterval(this.rand, 2500);
  },

}
</script>

<style lang="scss" scoped>
.main-page {
  width: 100vw;
  position: relative;
}
.background {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  @media (max-width: 690px) {
    margin-top: -10px;
    img {
      height: calc(100% + 10px);
    }
  }
}
.title {
  h1 {
    position: relative;
    color: #fff;
    font-size: 40px;
    max-width: 900px;
    margin: 20px auto 5px;
    font-family: Jem, sans-serif;
    @media (max-width: 690px) {
      margin-top: 20px;
      font-size: 24px;
      max-width: 90vw;
    }
  }

  p {
    position: relative;
    color: #fff;
    font-size: 22px;
    margin-top: 20px;
    font-family: Papyrus, sans-serif;
    @media (max-width: 690px) {
      font-size: 16px;
    }
  }
}
.cards-wrapper {
  display: flex;
  justify-content: center;
  .cards-box {
    position: relative;
    display: flex;
    justify-content: center;
    max-width: 1000px;
    overflow: hidden;
    .left-side {
      width: 200px;
      height: 100%;
      position: absolute;
      background: #00000080;
      border-radius: 20px;
      left: 0;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      mask: linear-gradient(to right,
          black 0%,
          black 1%,
          rgba(0,0,0,0.0) 10%,
          rgba(0,0,0,0.0) 20%,
          transparent 100%
      );
    }
    .right-side {
      height: 100%;
      border-radius: 20px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
      right: 0;
      background: #00000080;
      position: absolute;
      mask: linear-gradient(to right,
          transparent 0%,
          rgba(0,0,0,0.0) 70%,
          rgba(0,0,0,0.0) 92%,
          black 99%,
          black 100%
      );
      width: 200px;
    }
    .cards {
      width: 650px;
      min-width: 650px;
      overflow: hidden;
      margin: 15px 0 0 0;
      position: relative;
      height: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.6s;
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
  }
}

.mini-slider-box {
  position: relative;
  height: 40px;
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  .mini-slider-slide {
    width: auto;
    border-radius: 30px;
    padding: 0;
    position: relative;
    overflow: hidden;
    margin: 2px 10px 0 10px;
    height: 36px;
    cursor: pointer;
    &:hover {
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
        width: 38px;
        height: 38px;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
        }
      }
      .name {
        p {
          color: #fff;
          font-size: 16px;
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
  .mini-slider-slide.left-of-active {
    .mini-slider-slide-mask {
      background: linear-gradient(to right, #000000 10%, #00000099 30%, transparent);
      backdrop-filter: blur(2px);
    }
  }
  .mini-slider-slide.active {
    border: 2px solid #38E07A;
    transform: scale(1.1);
    .mini-slider-slide-mask {
      background: transparent;
    }
  }
  .mini-slider-slide.right-of-active {
    .mini-slider-slide-mask {
      background: linear-gradient(to right, transparent 10%, #00000099 70%, #000000 90%);
      backdrop-filter: blur(2px);
    }
  }
}

.button-box {
  position: relative;
  margin-top: 60px;
  @media (max-width: 690px) {
    margin-top: 20px;
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
a {
  color: #42b983;
}
</style>

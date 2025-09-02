<template>
  <div class="info-block">
    <div :class="{'open': infoBlockStateOpen, 'hide': !infoBlockStateOpen}" :style="{'display': infoBlockStateOpen ? 'flex' : 'none'}" class="info-block-open-state">
      <div class="info-block-content">
        <h3>Как это работает?</h3>
        <div class="steps-block">
          <div class="step">
            <div class="step-marker">
              <div class="step-marker-dot"></div>
              <div class="step-marker-line"></div>
            </div>
            <div class="step-body">
              <div class="step-body-title">
                <h4>Вместе настраиваем частоту напоминаний</h4>
              </div>
              <div class="step-body-annotation">
                <p>Можно установить напоминания "каждый день", "два раза в день", один раз в два дня" или "один раз в неделю"</p>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-marker">
              <div class="step-marker-dot"></div>
              <div class="step-marker-line"></div>
            </div>
            <div class="step-body">
              <div class="step-body-title">
                <h4>Загружаем фото после сообщения о напоминании</h4>
              </div>
              <div class="step-body-annotation">
                <p>Мы сохраним фото и начнем создавать мини-альбом с воспоминанием как рос ваш любимец</p>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-marker">
              <div class="step-marker-dot"></div>
              <div class="step-marker-line"></div>
            </div>
            <div class="step-body">
              <div class="step-body-title">
                <h4>Можете запросить альбом в любое время</h4>
              </div>
              <div class="step-body-annotation">
                <p>Например через три месяца с частотой фото один раз в неделю Вам будет доступен альбом из 12-14 фотографий</p>
              </div>
            </div>
          </div>
          <div class="step">
            <div class="step-marker">
              <div class="step-marker-dot"></div>
<!--              <div class="step-marker-line"></div>-->
            </div>
            <div class="step-body">
              <div class="step-body-title">
                <h4>А можете не запрашивать - все фотографии будут доступны в галерее нашего бота</h4>
              </div>
              <div class="step-body-annotation">
                <p>(если не будете ничего удалять)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-block">
        <button style="width: 100%;">
          <span>Начать настройку</span>
        </button>
      </div>
    </div>
    <button @click="infoBlockStateOpen = !infoBlockStateOpen" class="info-block-button">

      <svg v-if="!infoBlockStateOpen" xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        <path d="M3.00014 3.34452C4.26894 1.52193 5.88494 0.5 8.37994 0.5C11.0332 0.5 13.8652 2.57049 13.8652 5.3C13.8652 8.92447 9.94954 8.98019 9.94954 10.3196V10.5C9.94954 10.9142 9.61374 11.25 9.19934 11.25H6.93404C6.51974 11.25 6.18384 10.9142 6.18384 10.5V10.1941C6.18384 8.26198 7.64914 7.48955 8.75634 6.86894C9.70584 6.3368 10.2878 5.97482 10.2878 5.27007C10.2878 4.33783 9.09834 3.71911 8.13674 3.71911C6.91374 3.71911 6.33284 4.28372 5.54984 5.26442C5.29604 5.58235 4.83474 5.63986 4.51044 5.39402L3.16204 4.37191C2.84094 4.12852 2.77004 3.67515 3.00014 3.34452Z" fill="white"/>
        <path d="M5.90144 14.3353C5.90144 13.1417 6.87274 12.1706 8.06674 12.1706C9.26064 12.1706 10.232 13.1417 10.232 14.3353C10.232 15.5289 9.26064 16.5 8.06674 16.5C6.87274 16.5 5.90144 15.5289 5.90144 14.3353Z" fill="white"/>
      </svg>

      <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_2178_238)">
          <path d="M1.5 1.5L14.5 14.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
          <path d="M14.5 1.5L1.5 14.5" stroke="white" stroke-width="3" stroke-linecap="round"/>
        </g>
        <defs>
          <clipPath id="clip0_2178_238">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
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

.steps-block {
  .step {
    margin-top: 25px;
    font-family: 'Roboto', sans-serif;
    display: flex;
    align-items: flex-start;
    position: relative;
    &-marker {
      &-dot {
        width: 16px;
        height: 16px;
        background: #38E07A;
        border-radius: 50%;
        box-shadow: 0 0 10px #38E07A;
        font-size: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        margin-top: 6px;
        position: relative;
        color: #000
      }
      &-line {
        background: #38E07A;
        position: absolute;
        width: 2px;
        height: 130px;
        top: 0;
        left: 7px;
        z-index: 99;
      }
    }
    &-body {
      padding: 0 0 0 10px;
      &-title {
        h4 {
          font-size: 17px;
          color: #38E07A;
        }
      }
      &-annotation {
        margin-top: 6px;
        p {
          font-size: 13px;
          color: #ccc;
        }
      }
    }
  }
}

.button-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  //padding: 0 10px;
  //margin-bottom: 10px;
  button {
    background: #38E07A;
    border-radius: 0 30px 0 30px;
    padding: 15px 40px;
    cursor: pointer;
    width: 100%;
    max-width: 300px;
    span {
      color: #121714;
      font-size: 14px;
      font-weight: 900;
    }
  }
}

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
  width: 364px;
  max-width: 364px;
  height: 580px;
  .info-block-content {
    animation: ease-in-out 3s show-content;
  }
}
.info-block-open-state.hide {
  animation: .2s hide ease-in-out;
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
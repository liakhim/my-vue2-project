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

    <div class="scroll-list-wrapper">
      <ScrollList
          :items="period_items"
          @set-active-item="setPeriodActiveItem($event)"
      />
    </div>
    <div class="scroll-list-wrapper">
      <div style="display: flex">
        <ScrollList
            :items="day_items"/>
        <ScrollList
            :items="first_time_items"/>
      </div>
    </div>
    <div class="scroll-list-wrapper">
      <div style="display: flex">
        <ScrollList
            :items="day_items"/>
        <ScrollList
            :items="second_time_items"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'AccountSettings',
  data() {
    return {
      tog: false,
      period_items: [
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
      ],
      period_active_item: {
        label: 'Два раза в неделю',
        value: 'two_times_in_week'
      },
      day_items: [
        {
          label: 'Понедельник',
          value: 'monday'
        },
        {
          label: 'Вторник',
          value: 'tuesday'
        },
        {
          label: 'Среда',
          value: 'wednesday'
        },
        {
          label: 'Четверг',
          value: 'thursday'
        },
        {
          label: 'Пятница',
          value: 'friday'
        },
        {
          label: 'Суббота',
          value: 'saturday'
        },
        {
          label: 'Воскресение',
          value: 'sunday'
        },
        {
          label: 'Понедельник',
          value: 'monday'
        },
        {
          label: 'Вторник',
          value: 'tuesday'
        },
        {
          label: 'Среда',
          value: 'wednesday'
        },
        {
          label: 'Четверг',
          value: 'thursday'
        },
        {
          label: 'Пятница',
          value: 'friday'
        },
        {
          label: 'Суббота',
          value: 'saturday'
        },
        {
          label: 'Воскресение',
          value: 'sunday'
        },
        {
          label: 'Понедельник',
          value: 'monday'
        },
        {
          label: 'Вторник',
          value: 'tuesday'
        },
        {
          label: 'Среда',
          value: 'wednesday'
        },
        {
          label: 'Четверг',
          value: 'thursday'
        },
        {
          label: 'Пятница',
          value: 'friday'
        },
        {
          label: 'Суббота',
          value: 'saturday'
        },
        {
          label: 'Воскресение',
          value: 'sunday'
        },
        {
          label: 'Понедельник',
          value: 'monday'
        },
        {
          label: 'Вторник',
          value: 'tuesday'
        },
        {
          label: 'Среда',
          value: 'wednesday'
        },
        {
          label: 'Четверг',
          value: 'thursday'
        },
        {
          label: 'Пятница',
          value: 'friday'
        },
        {
          label: 'Суббота',
          value: 'saturday'
        },
        {
          label: 'Воскресение',
          value: 'sunday'
        },
        {
          label: 'Понедельник',
          value: 'monday'
        },
        {
          label: 'Вторник',
          value: 'tuesday'
        },
        {
          label: 'Среда',
          value: 'wednesday'
        },
        {
          label: 'Четверг',
          value: 'thursday'
        },
        {
          label: 'Пятница',
          value: 'friday'
        },
        {
          label: 'Суббота',
          value: 'saturday'
        },
        {
          label: 'Воскресение',
          value: 'sunday'
        }
      ],
      first_time_items: [
        {
          label: '06:30',
          value: 6.5
        },
        {
          label: '07:00',
          value: 7
        },
        {
          label: '07:30',
          value: 7.5
        },
        {
          label: '08:00',
          value: 8
        },
        {
          label: '08:30',
          value: 8.5
        },
        {
          label: '09:00',
          value: 9
        },
        {
          label: '09:30',
          value: 9.5
        },
        {
          label: '10:00',
          value: 10
        },
        {
          label: '10:30',
          value: 10.5
        },
        {
          label: '11:00',
          value: 11
        },
        {
          label: '11:30',
          value: 11.5
        },
        {
          label: '12:00',
          value: 12
        },
        {
          label: '12:30',
          value: 12.5
        },
        {
          label: '13:00',
          value: 13
        },
        {
          label: '13:30',
          value: 13.5
        },
        {
          label: '14:00',
          value: 14
        },
        {
          label: '14:30',
          value: 14.5
        },
        {
          label: '15:00',
          value: 15
        },
        {
          label: '15:30',
          value: 15.5
        },
        {
          label: '16:00',
          value: 16
        },
        {
          label: '16:30',
          value: 16.5
        },
        {
          label: '17:00',
          value: 17
        },
        {
          label: '17:30',
          value: 17.5
        },
        {
          label: '18:00',
          value: 18
        },
        {
          label: '18:30',
          value: 18.5
        },
        {
          label: '19:00',
          value: 19
        },
        {
          label: '19:30',
          value: 19.5
        },
        {
          label: '20:00',
          value: 20
        },
        {
          label: '20:30',
          value: 20.5
        },
        {
          label: '21:00',
          value: 21
        },
        {
          label: '21:30',
          value: 21.5
        },
        {
          label: '22:00',
          value: 22
        },
        {
          label: '22:30',
          value: 22.5
        },
        {
          label: '23:00',
          value: 23
        },
        {
          label: '23:30',
          value: 23.5
        }
      ],
      second_time_items: [
        {
          label: '06:30',
          value: 6.5
        },
        {
          label: '07:00',
          value: 7
        },
        {
          label: '07:30',
          value: 7.5
        },
        {
          label: '08:00',
          value: 8
        },
        {
          label: '08:30',
          value: 8.5
        },
        {
          label: '09:00',
          value: 9
        },
        {
          label: '09:30',
          value: 9.5
        },
        {
          label: '10:00',
          value: 10
        },
        {
          label: '10:30',
          value: 10.5
        },
        {
          label: '11:00',
          value: 11
        },
        {
          label: '11:30',
          value: 11.5
        },
        {
          label: '12:00',
          value: 12
        },
        {
          label: '12:30',
          value: 12.5
        },
        {
          label: '13:00',
          value: 13
        },
        {
          label: '13:30',
          value: 13.5
        },
        {
          label: '14:00',
          value: 14
        },
        {
          label: '14:30',
          value: 14.5
        },
        {
          label: '15:00',
          value: 15
        },
        {
          label: '15:30',
          value: 15.5
        },
        {
          label: '16:00',
          value: 16
        },
        {
          label: '16:30',
          value: 16.5
        },
        {
          label: '17:00',
          value: 17
        },
        {
          label: '17:30',
          value: 17.5
        },
        {
          label: '18:00',
          value: 18
        },
        {
          label: '18:30',
          value: 18.5
        },
        {
          label: '19:00',
          value: 19
        },
        {
          label: '19:30',
          value: 19.5
        },
        {
          label: '20:00',
          value: 20
        },
        {
          label: '20:30',
          value: 20.5
        },
        {
          label: '21:00',
          value: 21
        },
        {
          label: '21:30',
          value: 21.5
        },
        {
          label: '22:00',
          value: 22
        },
        {
          label: '22:30',
          value: 22.5
        },
        {
          label: '23:00',
          value: 23
        },
        {
          label: '23:30',
          value: 23.5
        }
      ],
    }
  },
  methods: {
    setPeriodActiveItem(event) {
      this.period_active_item = event
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
.scroll-list-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  width: 90%;
  justify-content: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4392156863), rgba(255, 255, 255, 0.0078431373), rgba(0, 0, 0, 0.4392156863));
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1254901961);
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
</script>
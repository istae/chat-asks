<template>
  <div class="wrapper h-full">
    <div class="question-wrapper" v-html="question"></div>

    <div class="countdown mt-10">
      <Countdown :time="time"></Countdown>
    </div>

    <div class="answers">
      <div class="answer-wrapper mb-10">
        <div class="answer yellow-box mr-10" v-html="'A) ' + answers[0]"></div>
      </div>
      <div class="answer-wrapper mb-10">
        <div class="answer blue-box" v-html="'B) ' + answers[1]"></div>
      </div>
      <div class="answer-wrapper" v-if="answers.length > 2">
        <div class="answer red-box mr-10" v-html="'C) ' + answers[2]"></div>
      </div>
      <div class="answer-wrapper" v-if="answers.length > 2">
        <div class="answer purple-box" v-html="'D) ' + answers[3]"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Countdown from "./Countdown.vue";

export default Vue.extend({
  name: "Question",

  props: {
    question: {
      type: String,
    },
    answers: {
      type: Array,
    },
    time: {
      type: Number,
    },
  },

  mounted() {
    setTimeout(() => {}, 20 * 1000);
  },

  components: {
    Countdown,
  },
});
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.countdown {
  display: flex;
  justify-content: center;
}

.answer {
  padding: 15px;
  width: 100%;
  border-radius: 5px;
}

.answer-wrapper {
  display: flex;
  width: 50%;
  font-size: 24px;
}

.answers {
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.question-wrapper {
  padding: 30px;
  background-color: #fff;
  font-weight: 500;
  text-align: center;
  font-size: 36px;
  border-radius: 5px;
}
</style>

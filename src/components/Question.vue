<template>
  <div class="wrapper h-full">
    <div class="question-wrapper">{{ question }}</div>

    <div class="countdown mt-10">
      <Countdown></Countdown>
    </div>

    <div class="answers">
      <div class="answer-wrapper mb-10">
        <div class="answer yellow-box mr-10">A) {{ answers[0] }}</div>
      </div>
      <div class="answer-wrapper mb-10">
        <div class="answer blue-box">B) {{ answers[1] }}</div>
      </div>
      <div class="answer-wrapper">
        <div class="answer red-box mr-10">C) {{ answers[2] }}</div>
      </div>
      <div class="answer-wrapper">
        <div class="answer purple-box">D) {{ answers[3] }}</div>
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
    }
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
  // margin: 50px 0;
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
  // margin-top: 20px;
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

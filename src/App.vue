<template>
  <div id="app" class="app-wrapper h-full">
    <div v-if="state == states.in_game" class="question-counter">
      Question {{ questionNumber }}/{{ maxQuestions }}
    </div>

    <Question
      v-if="showQuestion"
      v-bind:question="question"
      v-bind:answers="answers"
    ></Question>
    <Top v-if="showTop" v-bind:users="users"></Top>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Question from "./components/Question.vue";
import Top from "./components/Top.vue";

function shuffle(array: any[]) {
  console.log(array);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function sleep(sec: number) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(0);
    }, sec * 1000);
  });
}

export default Vue.extend({
  name: "App",
  components: {
    Question,
    Top,
  },

  data() {
    let answers = shuffle([1, 2, 3, 4]);

    return {
      question: "Unable to disable Vetur in VSCode",
      answers: shuffle(answers),
      correctIndex: answers.indexOf(1),
      states: { in_game: 0, waiting: 1 },
      questionNumber: 1,
      maxQuestions: 20,
      state: 0,
      showTop: false,
      showQuestion: false,
      users: [
        {
          username: "kahoot1",
          score: 230,
        },
        {
          username: "kahoot2",
          score: 230,
        },
        {
          username: "kahoot3",
          score: 230,
        },
      ],
    };
  },

  methods: {
    async gameLoop() {
      while (true) {
        // 1) show join screen

        // 2) prepare 20 questions

        this.questionNumber = 1;
        while (this.questionNumber <= this.maxQuestions) {
          this.showQuestion = true;

          await sleep(2);
          this.showQuestion = false;
          this.showTop = true;

          await sleep(1);
          this.showTop = false;

          this.questionNumber++;
        }

        // 3) end game score, cheer
      }
    },
  },

  async mounted() {
    this.showQuestion = true;
    this.gameLoop();
  },
});
</script>

<style lang="scss">
@import "assets/styles";

.question-counter {
  text-align: center;
  font-size: 23px;
  margin-bottom: 15px;
}

#app {
  display: flex;
  flex-direction: column;
  padding: 100px 0;
  height: 100%;
  width: 80%;
  margin: 0 auto;
}
</style>

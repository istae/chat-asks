<template>
  <div id="app" class="app-wrapper h-full">
    <div v-if="state == states.in_game" class="question-counter">
      Question {{ questionNumber }}/{{ maxQuestions }}
    </div>

    <Winner v-if="showCredits" :time="creditsDuration" :users="users"></Winner>

    <Question
      v-if="showQuestion"
      :time="questionDuration"
      :question="question"
      :answers="answers"
    ></Question>
    <Top
      v-if="showTop"
      :users="users"
      :letter="correctLetter.toUpperCase()"
      :answer="correctAnswer"
    ></Top>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Question from "./components/Question.vue";
import Top from "./components/Top.vue";
import Winner from "./components/Winner.vue";
import { sleep, shuffle } from "./util/util";
import { Game, UserScore } from "./util/game";

const game = new Game();

export default Vue.extend({
  name: "App",
  components: {
    Question,
    Top,
    Winner,
  },

  data() {
    return {
      question: "Unable to disable Vetur in VSCode",
      answers: [],
      state: 0,
      states: { in_game: 0, credits: 1 },
      correctLetter: "a",
      correctAnswer: "",
      questionNumber: 1,
      questionDuration: 15,
      topDuration: 7,
      creditsDuration: 60,
      maxQuestions: 20,
      showTop: false,
      showQuestion: false,
      showCredits: false,
      users: Array<UserScore>(),
    };
  },

  methods: {
    async gameLoop() {
      while (true) {

        this.showCredits = true;
        this.state = this.states.credits;
        await sleep(this.creditsDuration);
        this.showCredits = false;

        this.state = this.states.in_game;

        const questions = await game.questions(this.maxQuestions);
        game.startGame(this.questionDuration);

        this.questionNumber = 1;

        while (this.questionNumber <= this.maxQuestions) {
          const randQuestion = questions[this.questionNumber - 1];
          this.question = randQuestion.question;

          const answers = shuffle([
            randQuestion.correct_answer,
            ...randQuestion.incorrect_answers,
          ]) as any;
          this.correctLetter = String.fromCharCode(
            answers.indexOf(randQuestion.correct_answer) + 97
          );
          this.answers = answers;
          this.correctAnswer = decodeURI(randQuestion.correct_answer);

          game.startQuestion(this.correctLetter);
          this.showQuestion = true;
          await sleep(this.questionDuration);
          game.endQuestion();

          this.users = await game.topUsers(5);
          this.showQuestion = false;
          this.showTop = true;
          await sleep(this.topDuration);

          this.showTop = false;
          this.questionNumber++;
        }

        this.users = await game.topUsers(3);
      }
    },
  },

  created() {
    this.gameLoop();
  },

  async mounted() {},
});
</script>

<style lang="scss">
@import "/assets/styles";

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

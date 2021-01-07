<template>
  <div class="center h-full">
    <div class="center answer-wrapper">
      <h2>Correct Answer</h2>
      <div class="answer" v-html="letter + ') ' + answer"></div>
    </div>

    <h2>Top 5 Users</h2>
    <div class="list">
      <div class="list-item" v-for="user in users" :key="user.username">
        <div>{{ user.username }}</div>
        <div>{{ user.score }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Top",

  props: {
    answer: {
      type: String,
    },
    letter: {
      type: String,
    },
    users: {
      type: Array,
    },
  },

  mounted() {},

  data() {
    return {};
  },
});
</script>

<style scoped lang="scss">

.answer-wrapper {
  margin-bottom: 100px;
}

.answer {
  padding: 15px;
  background-color: $green;
  color: #fff;
  border-radius: 5px;
  font-size: 32px;
}

.center {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.list {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.list-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid rgb(179, 179, 179);
  font-size: 32px;
}

.list-item:first-child {
  background-color: white;
  box-shadow: 1px 1px 2px #b3b3b369;
}

.list-item:last-child {
  border-bottom: none;
}
</style>

<template>
  <div class="center h-full wrapper">
    <div v-for="n in 75" :key="n" :class="'confetti-' + n">
      <img src="../assets/images/pog.png" />
    </div>

    <div class="center timer">
      Type !join
      <Countdown :time="time"></Countdown>
    </div>

    <div v-if="users.length" class="center first">
      1st Place
      <div class="winner first-place">
        {{ users[0].username }} - {{ users[0].username }}
      </div>
    </div>

    <div class="second">
      <div class="center" v-if="users.length >= 2">
        2nd Place
        <div class="winner second-place">
          {{ users[1].username }} - {{ users[1].username }}
        </div>
      </div>
      <div class="center" v-if="users.length >= 3">
        3rd Place
        <div class="winner third-place">
          {{ users[2].username }} - {{ users[2].username }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Countdown from "./Countdown.vue";

export default Vue.extend({
  name: "Winner",
  components: {
    Countdown,
  },
  props: {
    time: {
      type: Number,
    },
    users: {
      type: Array,
    },
  },
});
</script>

<style lang="scss">
.timer {
  font-size: 24px;
  z-index: 1;
}

.first {
  // margin-top: 20px;
}

.wrapper {
  display: flex;
  justify-content: space-evenly;
}

.second {
  display: flex;
  flex-direction: row;
  width: 80%;
  justify-content: space-evenly;
  // margin-top: 100px;
}

p {
  margin: 0;
  font-size: 20px;
}

.first-place {
  background-color: $red;
  font-size: 40px;
}

.second-place {
  background-color: $blue;
  font-size: 32px;
}

.third-place {
  background-color: $yellow;
  font-size: 32px;
}

.winner {
  color: white;
  padding: 15px;
  z-index: 1;
  box-shadow: 0px 0px 7px #00000099;
  border-radius: 5px;
}

img {
  height: 50px;
}

[class|="confetti"] {
  position: absolute;
}

$colors: (#d13447, #ffbf00, #263672);

@for $i from 0 through 150 {
  $w: random(8);
  $l: random(100);
  .confetti-#{$i} {
    z-index: 0px;
    width: #{$w}px;
    height: #{$w * 0.4}px;
    // background-color: nth($colors, random(3));
    top: -10%;
    left: unquote($l + "%");
    opacity: random() + 0.2;
    transform: rotate(#{random() * 360}deg);
    animation: drop-#{$i}
      unquote(6 + random() + "s")
      unquote(5 * random() + "s")
      infinite;
  }

  @keyframes drop-#{$i} {
    100% {
      top: 110%;
      left: unquote($l + random(15) + "%");
    }
  }
}

body {
  overflow: hidden;
}
</style>

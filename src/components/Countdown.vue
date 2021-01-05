<template>
  <div id="countdown">
    <div id="countdown-number">{{ counter }}</div>
    <svg>
      <circle r="36" cx="40" cy="40"></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Countdown",
  data() {
    let counter = 20;
    return {
      counter,
      animation: `countdown ${counter}s linear forwards;`,
    };
  },

  mounted() {
    let timer = setInterval(() => {
      this.counter--;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
    }, this.counter * 1000);
  },
});
</script>

<style scoped lang="scss">
$size: 80px;

#countdown {
  position: relative;
  height: $size;
  width: $size;
  text-align: center;
}

#countdown-number {
  display: inline-block;
  line-height: $size;
  font-size: 36px;
}

svg {
  position: absolute;
  top: 0;
  right: 0;
  width: $size;
  height: $size;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

circle {
  stroke-dasharray: 226px;
  stroke-dashoffset: 0px;
  stroke-linecap: round;
  stroke-width: 4px;
  stroke: #424242;
  fill: none;
  animation: countdown 20s linear forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 226px;
  }
}
</style>

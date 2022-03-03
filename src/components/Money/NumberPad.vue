<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="OK">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  get output() {
    return this.$store.state.output;
  }

  inputContent(event: MouseEvent) {
    let button = event.target as HTMLButtonElement;
    let input = button.textContent!;  // !代表不为null
    this.$store.commit('inputContent',input)
  }

  remove(){
    this.$store.commit('removeOutput')
  }


  clear(){
    this.$store.commit('clearOutput')
  }

  ok() {
    this.$emit('update:value', this.output);
    this.$emit('submit', this.output);
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.numberPad {
  .output {
    @extend %innerShadow;
    background: #fff;
    padding: 9px 16px;
    font-size: 36px;
    font-family: Consolas, monospace;
    text-align: right;
    height: 72px;
    color: #16b6ae;
  }

  .buttons {
    @extend %clearFix;
    $bg: #f2f2f2;
    background: linear-gradient(45deg, rgba(0,210,180,1) 0%, rgba(0,191,195,1) 100%);

    > button {
      background: transparent;
      border: none;
      width: 25%;
      height: 64px;
      float: left;
      border-right: 1px solid #8fe4e5;
      border-bottom: 1px solid #8fe4e5;
      font-size: 24px;
      color: white;

      &:nth-child(4),&:nth-child(8), &:nth-child(12) {
        border-right: 0;
        font-size: 18px;
      }

      &:active {
        background: #e3f8f9;
        color: #16b6ae;
      }
    }

    .OK {
      height: 64*2px;
      float: right;
    }

    .zero {
      width: 50%;
    }
  }
}

</style>
<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button>删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button >清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="OK">OK</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent" class="zero">0</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
@Component
export default class NumberPad extends Vue{
  output = ''
  inputContent(event: MouseEvent){
    let button = event.target as HTMLButtonElement
    this.output += button.textContent
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
  }
  .buttons {
    @extend %clearFix;
    $bg: #f2f2f2;
    > button {
      background: transparent;
      border: none;
      width: 25%;
      height: 64px;
      float: left;

      &:nth-child(1){
        background: $bg;
      }
      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }
      &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
        background: darken($bg, 4*3%);
      }
      &:nth-child(8), &:nth-child(11){
        background: darken($bg, 4*4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }

      &:active {
        background: #fff;
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
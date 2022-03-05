<template>
<div class="wrapper">
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item"
        :class="liClass(item)"
        @click="changeTab(item)"
    >{{item.text}}</li>
  </ul>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DateSourceItem = {text: string, value: string}

@Component
export default class Tabs extends Vue{
  @Prop({required:true, type: Array} ) dataSource!: DateSourceItem[]
  @Prop(String) classPrefix?: string
  @Prop(String) readonly value!:''

  liClass(item: DateSourceItem){
    return {
    [this.classPrefix+'-tabs-item']: this.classPrefix,
      selected: item.value === this.value
    }

  }

  changeTab(item: DateSourceItem){
    this.$emit('update:value', item.value)
  }
}
</script>

<style lang="scss" scoped>

.wrapper {
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  box-shadow: 0 0 3px rgba(0,0,0,.2);
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

  @media(min-width: 500px) {
    .wrapper {
      width: 500px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
.tabs {
  background: #ffffff;
  display: flex;
  font-size: 18px;
  color: #16b6ae;
  border-radius: 8px;
  border: 1px solid #16b6ae;
  overflow: hidden;
  margin-bottom: 0;

  &-item {
    width: 50%;
    display: flex;
    height: 32px;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0 16px;

    &.selected {
      background: linear-gradient(45deg, rgba(0,210,180,1) 0%, rgba(0,191,195,1) 100%);
      color: white;
    }

    // &.selected::after {
    //   content: '';
    //   position: absolute;
    //   width: 100%;
    //   height: 4px;
    //   background: #333333;
    //   left: 0;
    //   bottom: 0;
    // }
  }
}
</style>
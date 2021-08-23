<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        class="tabs-item"
        :class="liClass(item)"
        @click="changeTab(item)"
    >{{item.text}}</li>
  </ul>
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
.tabs {
  background: #C4C4C4;
  display: flex;
  font-size: 24px;
  color: #000;

  &-item {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      background: #333333;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
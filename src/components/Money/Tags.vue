<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="item in dataSource" :key="item"
          :class="{selected: selectedTags.indexOf(item)>=0}"
          @click="toggle(item)">{{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop() dataSource: string[] | undefined;
  selectedTags: string[] = [];

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index);
    } else {
      this.selectedTags.push(tag);
    }
  }

  create(){
    const tag = window.prompt("请输入一个新的标签")
    console.log(tag)
    if (tag === ''){
      alert("标签名不能为空")
    } else if(this.dataSource && this.dataSource.indexOf(tag!) < 0){
      this.$emit("update:dataSource", [...this.dataSource, tag])
    }
  }

}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #D9D9D9;
      background: $bg;
      $h: 24px;
      height: $h;
      padding: 0 16px;
      border-radius: $h/2;
      margin-right: 12px;
      line-height: $h;
      margin-top: 4px;

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      border-bottom: 1px solid;
      color: #999999;
      padding: 0 4px;
    }

  }

}
</style>
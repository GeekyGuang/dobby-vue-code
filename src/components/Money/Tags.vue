<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="item in tagList" :key="item.id"
          :class="{selected: selectedTags.indexOf(item)>=0}"
          @click="toggle(item)">{{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {tagHelper} from '@/mixins/tagHelper';
import {mixins} from 'vue-class-component';


@Component
export default class Tags extends mixins(tagHelper) {
  selectedTags: string[] = [];

  get tagList(){
    return this.$store.state.tagList
  }

  created(){
    this.$store.commit('fetchTags')
  }

  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value', this.selectedTags);
  }



}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
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
<template>
  <div class="tags">
    <ul class="current">
      <li v-for="item in tagList" :key="item.id"
          :class="{selected: selectedTags.indexOf(item)>=0}"
          @click="toggle(item)">{{ item.name }}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag(type)">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import {tagHelper} from '@/mixins/tagHelper';
import {mixins} from 'vue-class-component';
import { Tag } from '@/custom';


@Component
export default class Tags extends mixins(tagHelper) {
  @Prop({required:true}) type!:string

  selectedTags: Tag[] = [];

  get tagList(){
    return (this.$store.state.tagList as Tag[]).filter(i => i.type === this.type)
  }

  created(){
    this.$store.commit('fetchTags')
  }

  toggle(tag: Tag) {
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
  flex-grow: 1;
  background: white;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      $bg: #6ad0cb;
      border: 1px solid #16b6ae;
      background: #fafafa;
      $h: 24px;
      height: $h;
      padding: 0 16px;
      border-radius: $h/2;
      margin-right: 12px;
      line-height: $h;
      margin-top: 4px;
      color: #16b6ae;

      &.selected {
        background: #16b6ae;
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
      color: #6ad0cb;
      padding: 0 4px;
    }

  }

}
</style>
<template>
  <Layout>
    <ul class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();

@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        window.alert('标签名已存在');
      } else if (message === 'success') {
        window.alert('创建成功');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 16px;
  padding-left: 16px;

  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    min-height: 44px;

    .icon {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }

}

.createTag {
  border: none;
  border-radius: 4px;
  background: #767676;
  padding: 0 16px;
  height: 40px;
  color: white;

  &-wrapper {
    padding-top: 16px;
    margin-top: 44-16px;
    text-align: center;
  }

}
</style>
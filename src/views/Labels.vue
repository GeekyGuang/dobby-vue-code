<template>
  <Layout>
    <Tabs class-prefix="type" :value.sync="type" :data-source="recordTypeList"/>
    <div class="tags">
      <router-link class='tag'
                   :to="`/labels/edit/${tag.id}`" v-for="tag in tags"
                   :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button @click="createTag(type)">新建标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import {tagHelper} from '@/mixins/tagHelper';
import recordTypeList from '@/constants/recordTypeList';
import { Tag } from '@/custom';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Button, Tabs},
})
export default class Labels extends mixins(tagHelper) {
  type = this.$store.state.currentType || '-';
  recordTypeList = recordTypeList;

  get tags() {
    return (this.$store.state.tagList as Tag[]).filter(i => i.type === this.type)
  }

  created() {
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 16px;
  padding-left: 16px;
  margin-top: 3px;

  a {
    color: #16b6ae;
  }

  > .tag {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    min-height: 44px;

    .icon {
      width: 18px;
      height: 18px;
      margin-right: 16px;
      color: #16b6ae;
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
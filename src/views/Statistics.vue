<template>
  <Layout>
    <Tabs class-prefix="type" :value.sync="type" :data-source="recordTypeList"/>
    <Tabs class-prefix="interval" :value.sync="interval" :dataSource="intervalList"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components:{Tabs}
})
export default class Statistics extends  Vue{
    type = '-'
    interval = 'day'

    intervalList = intervalList
    recordTypeList = recordTypeList
}
</script>

<style lang="scss" scoped>
  ::v-deep .type-tabs-item {
    background: #fff;
    &.selected{
      background: #C4C4C4;
      &::after{
        display: none;
      }
    }
  }
</style>
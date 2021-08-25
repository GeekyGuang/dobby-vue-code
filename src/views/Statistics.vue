<template>
  <Layout>
    <Tabs class-prefix="type" :value.sync="type" :data-source="recordTypeList"/>
    <Tabs class-prefix="interval" :value.sync="interval" :dataSource="intervalList"/>
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3>{{group.title}}</h3>
        <ol>
          <li v-for="(item,index) in group.items" :key="index">
            {{item.amount}} {{item.createAt}}
          </li>
        </ol>
      </li>
    </ol>
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

    get recordList() {
      return this.$store.state.recordList
    }

    get result(){
      const {recordList} = this;
      type HashTableValue = {title: string, items: RecordItem[]}
      const hashTable: {[key: string]: HashTableValue} = {}
      for(let i = 0; i < recordList.length; i++){
         const [date,time] = recordList[i].createAt.split('T')
         hashTable[date] = hashTable[date] || {title: date, items: []}
         hashTable[date].items.push(recordList[i])
      }
      return hashTable
    }

    beforeCreate(){
      this.$store.commit('fetchRecords')
    }
}
</script>

<style lang="scss" scoped>
  ::v-deep {
    .type-tabs-item {
      background: #fff;
      &.selected{
        background: #C4C4C4;
        &::after{
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }
</style>
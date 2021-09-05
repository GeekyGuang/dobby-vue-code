<template>
  <Layout>
    <Tabs class-prefix="type" :value.sync="type" :data-source="recordTypeList"/>
    <Tabs class-prefix="interval" :value.sync="interval" :dataSource="intervalList"/>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li class="record" v-for="(item,index) in group.items" :key="index">
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '-';
  interval = 'day';

  intervalList = intervalList;
  recordTypeList = recordTypeList;

  beautify(string: string) {
    const now = dayjs();
    const date = dayjs(string);
    if (date.isSame(now, 'day')) {
      return '今天';
    } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (date.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (date.isSame(now, 'year')) {
      return date.format('M月D日');
    } else {
      return date.format('YYYY年M月D日');
    }
  }


  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) {return [];}
    type HashTableValue = { title: string, items: RecordItem[] }
    const newList = clone(recordList).sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    const result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>


<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  background: white;
  @extend %item;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

::v-deep {
  .type-tabs-item {
    background: #fff;

    &.selected {
      background: #C4C4C4;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>
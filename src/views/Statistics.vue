<template>
  <Layout>
      <Tabs class-prefix="type" :value.sync="type" :data-source="recordTypeList"/>
      <ol v-if="groupedList.length !== 0" class="lists">
        <li v-for="(group,index) in groupedList" :key="index">
          <h3 class="title">{{ beautify(group.title) }}<span>&yen;{{group.total}}</span></h3>
          <ol>
            <li class="record" v-for="(item,index) in group.items" :key="index">
              <span>{{ tagString(item.tags) }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span>&yen;{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div class="empty" v-else>
        <Icon name="empty" />
      </div>
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
import { RecordItem, Tag } from '@/custom';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  type = '-';

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
    return tags.length === 0 ? '无' : tags.map(t => t.name).join(',');
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get groupedList() {
    const {recordList} = this;
    type Result = {title: string, total?:number, items: RecordItem[]}[]
    if (recordList.length === 0) {return [] as Result;}
    type HashTableValue = { title: string, items: RecordItem[] }
    const newList = clone(recordList as RecordItem[])
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if (newList.length === 0) {return [] as Result;}
    const result:Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.forEach(group => {
      group.total = group.items.reduce((sum,item) => sum + item.amount,0)
    })
    return result;
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }
}
</script>


<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
  .empty {
    display: flex;
    margin-top: 64px;

    .icon {
      height: 120px;
      width: 120px;
      margin: auto;
      color: #6ad0cb;
    }


  }

  .lists {
    @extend %scroll;
  }


%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
  color: #333;
}

.record {
  background: white;
  @extend %item;
  color: #16b6ae;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #6addde;
}

</style>
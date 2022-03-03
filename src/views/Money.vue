<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="请输入备注"
                :value.sync="record.notes"/>
    </div>
    <Tags @update:value="record.tags = $event"/>
    <Tabs :value.sync="record.type" :dataSource="recordTypeList"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags from '@/components/Money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
import recordTypeList from '@/constants/recordTypeList';
import Tabs from '@/components/Tabs.vue';
import { RecordItem } from '@/custom';

@Component({
  components: {Tags, FormItem, NumberPad, Tabs},
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0
  };

  get recordList(){
    return this.$store.state.recordList
  }

  recordTypeList = recordTypeList

  created(){
    this.$store.commit('fetchRecords')
  }


  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    if (this.record.tags.length === 0) {
      return window.alert('请至少选择一个标签')
    }
    if (!this.record.amount || this.record.amount === 0) {
      return window.alert('请输入金额')
    }
    this.$store.commit('createRecord',this.record)
    window.alert('保存成功')
    this.record.notes = ''
    this.$store.commit('clearOutput')
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}



.notes {
  padding: 12px 0;
}
</style>
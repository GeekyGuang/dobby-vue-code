<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <Tabs :value.sync="record.type" :dataSource="recordTypeList"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="请输入备注"
                @update:value="onUpdateNotes"/>
    </div>
    <Tags/>
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

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }

  saveRecord() {
    this.$store.commit('createRecord',this.record)
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}



.notes {
  padding: 12px 0;
}
</style>
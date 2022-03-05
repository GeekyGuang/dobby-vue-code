<template>
  <Layout class-prefix="layout">
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord"/>
    <div class="notes">
      <FormItem field-name="备注"
                placeholder="请输入备注"
                :value.sync="record.notes"/>
      <el-date-picker
      v-model="date"
      type="date"
      :editable=false
      :picker-options="pickerOptions"
      placeholder="选择日期">
    </el-date-picker>
    </div>
    <Tags @update:value="record.tags = $event" :type="record.type"/>
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
   date = new Date()
   pickerOptions = {
     disabledDate(time: Date) {
       return time.getTime() > Date.now() - 8.64e6
     }
   }

  record: RecordItem = {
    tags: [], notes: '', type: '-', amount: 0, createAt: this.date
  };

  @Watch('date')
  onChildChanged(val: Date) {
     this.record.createAt = val
  }

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
      this.$message({
          message: '请至少选择一个标签',
          type: 'warning'
        });
      return
    }
    if (!this.record.amount || this.record.amount === 0) {
        this.$message({
          message: '请输入金额',
          type: 'warning'
        });
      return 
    }
    if (this.record.createAt == null) {
      this.$message({
          message: '请选择日期',
          type: 'warning'
        });
      return
    }
    this.$store.commit('createRecord',this.record)
    this.$message({
      message: '保存成功',
      type: 'success'
    });
    this.record.notes = ''
    this.$store.commit('clearOutput')
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tags {
  @extend %scroll;
}
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.el-date-editor.el-input {
  margin-left: auto;
  width: 160px;
}

.notes {
  display: flex;
  padding: 12px 0;
  padding-right: 16px;

  > .formwrapper {
    flex-grow: 1;
  }
  ::v-deep .formItem {

    input {
      width: 100%;
    }
  } 
}
</style>
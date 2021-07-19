<template>
  <div>
    <label class="notes">
      <span class="name">{{ fieldName }}</span>
      <input type="text" v-model="value"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  value = ''
  @Prop({required:true}) fieldName!:string
  @Prop() placeholder?:string
  @Watch('value')
  onValueChanged(value:string, oldValue:string){
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.notes {
  background: #f5f5f5;
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
  }

  input {
    padding: 16px 0;
    flex-grow: 1;
    background: transparent;
    border: none;
  }
}
</style>
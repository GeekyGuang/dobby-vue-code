<template>
  <div class="formwrapper">
    <label class="formItem">
      <span class="name">{{ fieldName }}</span>
      <input type="text" :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue{
  @Prop({default: ''}) value!:string
  @Prop({required:true}) fieldName!:string
  @Prop() placeholder?:string

  onValueChanged(value:string){
    this.$emit('update:value', value)
  }
}
</script>

<style lang="scss" scoped>
.formItem {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  .name {
    padding-right: 16px;
    color: #16b6ae;
    white-space: nowrap;
    line-height: 40px;
  }

  input {
    height: 40px;
    padding-right: 16px;
    flex-grow: 1;
    background: transparent;
    border: none;
    color:#666;
  }

  input::placeholder {
    color: #b7b7b7;
  }
}
</style>
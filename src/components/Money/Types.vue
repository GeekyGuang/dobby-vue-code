<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'"
          @click="selectType('-')">支出</li>
      <li :class="type === '+' && 'selected'"
          @click="selectType('+')">收入</li>
    </ul>
  </div>
</template>

<script >
export default {
  name: 'Types',
  props:['xxx'],
  data(){
    return {
      type: '-'  // - 表示支出 + 表示收入
    }
  },
  mounted() {
    console.log(this.xxx)
  },
  methods:{
    selectType(type){
      if(type !== '-' && type !== '+'){
        throw new Error(`${type} is unknown`)
      }

      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
.types {
  background: #C4C4C4;
  display: flex;
  font-size: 24px;
  color: #000;
  > li {
    width: 50%;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 4px;
      background: #333333;
      left: 0;
      bottom: 0;
    }
  }
}

</style>
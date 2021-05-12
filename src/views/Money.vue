<template>
  <Layout>
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
     <div class="new">
       <button>新增标签</button>
     </div>
    </div>
    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text" placeholder="请输入备注">
      </label>
    </div>
    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>
    <div class="numberPad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="OK">OK</button>
        <button>.</button>
        <button class="zero">0</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">

export default {
name: "Money",
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad {
    .output {
      background: #fff;
      padding: 9px 16px;
      font-size: 36px;
      font-family: Consolas, monospace;
      text-align: right;
    }
    .buttons {
      @extend %clearFix;

      > button {
        width: 25%;
        height: 64px;
        float: left;
      }
      .OK {
        height: 64*2px;
        float: right;
      }
      .zero {
        width: 50%;
      }
    }
  }
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
  .tags {
    font-size: 14px;
    padding: 16px;
    > .current {
      display: flex;
      > li {
        background: #D9D9D9;
        $h: 24px;
        height: $h;
        padding: 0 16px;
        border-radius: $h/2;
        margin-right: 12px;
        line-height: $h;
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        border-bottom: 1px solid;
        color: #999999;
        padding: 0 4px;
      }

    }

  }
</style>
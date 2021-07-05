<template>
  <Layout>
    <ul class="tags">
      <li><span>衣</span> <Icon name="right" /></li>
      <li><span>食</span> <Icon name="right" /></li>
      <li><span>住</span> <Icon name="right" /></li>
      <li><span>行</span> <Icon name="right" /></li>
    </ul>
    <div class="createTag-wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
export default {
name: "Labels",
}
</script>

<style lang="scss" scoped>
.tags {
  background-color: white;
  font-size: 16px;
  padding-left: 16px;
  > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    min-height: 44px;

    .icon {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }

}

.createTag {
  border: none;
  border-radius: 4px;
  background: #767676;
  padding: 0 16px;
  height: 40px;
  color: white;

  &-wrapper {
    padding-top: 16px;
    margin-top: 44-16px;
    text-align: center;
  }
  
}
</style>
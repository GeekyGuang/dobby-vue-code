<template>
  <div class="nav-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
name: "Layout",
  props: ['classPrefix']
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  // height: calc(100vh);
}

.content {
  flex-grow: 1;
  overflow: auto;
      &::-webkit-scrollbar {
            display:none
        }
}
</style>
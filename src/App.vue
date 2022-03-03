<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '~@/assets/style/reset';
@import '~@/assets/style/helper.scss';

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: $font-hei;
  color: #333;
  line-height: 1.5;
  font-size: 16px;
  background-color: #f5f5f5;
}
</style>


<style lang="scss">
  @media(min-width: 500px) {
    #app {
      max-width: 500px;
      margin: 0 auto;
      background: white;
    }
    body {
      background: #24292f;
    }
  }
</style>
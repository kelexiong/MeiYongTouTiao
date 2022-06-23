<template>
  <div id="app">
    <Headrs v-if="this.$route.meta.isShow && this.$route.path !== '/userInfoPage'"></Headrs>
    <router-view></router-view>
    <Floor v-if="this.$route.meta.isShow"></Floor>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {}
  }
}
</script>

<style>
/* body,
html {
  height: 100%;
}
body {
  position: fixed;
} */
#app {
  display: flex;
  flex-direction: column;
  min-height: 10rem;
}
</style>

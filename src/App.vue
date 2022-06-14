<template>
  <div id="app">
    <Headrs v-if="this.$route.path !== '/login' && this.$route.path !== '/search'"></Headrs>
    <router-view></router-view>
    <Floor v-if="this.$route.path !== '/login' && this.$route.path !== '/search'"></Floor>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      isShow: false
    }
  },
  mounted() {}
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

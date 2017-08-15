<template>
  <div id="app">
    <home-page></home-page>
    <sidebar></sidebar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import HomePage from 'components/homepage/homepage'
  import Sidebar from 'components/sidebar/sidebar'

  export default {
    name: 'app',
    components: {
      HomePage,
      Sidebar
    }
  }
</script>

<style>

</style>

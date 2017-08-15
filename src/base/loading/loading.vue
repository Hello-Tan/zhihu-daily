<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      font-size: 16px
      color: #2c3e50
</style>

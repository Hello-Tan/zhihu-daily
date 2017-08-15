<template>
  <div class="topmenu">
    <div class="icon" @click.stop="select">
      <i class="icon-font">&#xe612</i>
    </div>
    <div class="title">
      <p>{{title}}</p>
    </div>
    <div class="icon" v-if="showFlag">
      <i class="icon-font">&#xe610</i>
    </div>
    <div class="icon" v-if="showFlag" @click.stop="mode">
      <i class="icon-font">&#xe619</i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      showFlag: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      select () {
        this.$emit('select')
      },
      mode () {
        this.$emit('mode')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .topmenu
    display:flex
    position:fixed
    z-index: 100
    top:0
    width:100%
    height:1.333rem
    background:#00a2ea
    color:#fff
    .icon
      flex:1
      text-align:center
      .icon-font
        font-size:20px
        line-height:1.413rem
    .title
      flex:6
      padding-left:.267rem
      p
        font-size:18px
        line-height:1.413rem
</style>

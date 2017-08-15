<template>
  <transition name="slide">
    <div class="editors">
      <div class="editors-header">
        <i class="icon-font" @click="back">&#xe603</i>
        <span class="text">主编</span>
      </div>
      <ul class="editors-list">
        <li v-for="item in editors" class="editors-item border-1px">
          <img :src="item.avatar" class="editors-avatar">
          <div class="info">
            <p class="name">{{item.name}}</p>
            <p class="bio">{{item.bio}}</p>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      editors: {
        type: Array,
        default: []
      }
    },
    deactivated () {        // 路由隐藏时
      this.$emit('back')
    },
    methods: {
      back () {
        this.$router.back()
        this.$emit('back')
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .slide-enter-active, .slide-leave-active
    transition: all .5s
  .slide-enter, .slide-leave-to
    transform:translate3d(100%,0,0)
  .editors
    position:absolute
    top:0
    left:0
    right:0
    bottom:0
    z-index:200
    background:#fff
    .editors-header
      position:fixed
      top:0
      right:0
      left:0
      display:flex
      height:1.333rem
      background:#00a2ea
      color:#fff
      .icon-font
        flex:1
        line-height:1.413rem
        font-size:.507rem
        text-align:center
      .text
        flex:6
        padding-left:.267rem
        font-size:.427rem
        line-height:1.413rem
    .editors-list
      padding: 0 .4rem .4rem
      margin-top: 1.333rem
      .editors-item
        padding: .267rem 0
        border-1px(#d1d1d1)
        .editors-avatar
          float:left
          height: 1.067rem
          width: 1.067rem
          margin-right: .267rem
          border-radius: 50%
        .info
          overflow:hidden
          height:1.067rem
          .name
            line-height:1.5
            font-size: .4rem
            font-weight: 700
            color: #000
          .bio
            line-height:1.8
            font-size: .32rem
            white-space: nowrap
            color: #8c8c8c
</style>

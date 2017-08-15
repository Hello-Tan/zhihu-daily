<template>
  <transition name="fade">
    <div class="sidebar" v-show="sidebarShow">
      <div class="sidebar-main">
        <div class="sidebar-header">
          <div class="user">
            <a href="https://github.com/tanrenjie">
            <img src="https://pic1.zhimg.com/da8e974dc_im.jpg" class="avatar">
            </a>
            <span class="name">刘看山</span>
          </div>
          <div class="user-action">
            <div class="action" @click="showFavorite">
              <i class="icon-font">&#xe614</i>
              <span class="text">我的收藏</span>
            </div>
            <div class="action">
              <i class="icon-font">&#xe60f</i>
              <span class="text">离线下载</span>
            </div>
          </div>
        </div>
        <h1 class="home" @click="goHome" :class="{'active': currentIndex === -1}">
          <i class="icon-font">&#xe61b</i>
          <span class="text">首页</span>
        </h1>
        <ul class="sidebar-themes">
          <li v-for="(item,index) in themes"
              :class="{'active': index === currentIndex}"
              @click="selectItem(item,index)"
              class="themes-item">
            <p class="name">{{item.name}}</p>
            <span class="icon">&gt;</span>
          </li>
        </ul>
      </div>
      <div class="sidebar-mask"
           @click="hide"
           @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'
  import api from '../../api/index'

  export default {
    data () {
      return {
        themes: [],
        currentIndex: -1
      }
    },
    computed: {
      ...mapGetters([
        'sidebarShow'
      ])
    },
    created () {
      this._getTopics()
    },
    watch: {
      sidebarShow (show) {
        if (show) {
          document.documentElement.style.overflow = 'hidden'
        } else {
          document.documentElement.style.overflow = ''
        }
      }
    },
    methods: {
      hide () {
        this.setSidebarShow(false)
        this.currentIndex = -1
      },
      goHome () {
        this.setSidebarShow(false)
        this.currentIndex = -1
        this.$router.push('/')
      },
      selectItem (item, index) {
        this.currentIndex = index
        this.setThemeId(item.id)
        this.setSidebarShow(false)
        this.$router.push(`/theme/${item.id}`)
      },
      showFavorite () {
        this.setSidebarShow(false)
        this.setFavoriteShow(true)
        this.$router.push('../../favorite')
      },
      ...mapMutations({
        'setThemeId': 'SET_THEME_ID',
        'setSidebarShow': 'SET_SIDEBAR_SHOW',
        'setFavoriteShow': 'SET_FAVORITE_SHOW'
      }),
      _getTopics () {
        api.getTopics().then((res) => {
          this.themes = res.data.others
        }).catch((err) => {
          console.log(err)
          this._getTopics()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active
    transition: all .5s
    .sidebar-mask
      transition: all .5s
  .fade-leave-to, .fade-enter
    transform:translate3d(-100%,0,0)
    .sidebar-mask
      opacity: 0 !important
  .sidebar
    position:fixed
    z-index:300
    top:0
    left:0
    right:0
    bottom:0
    .sidebar-main
      width:85%
      height:100%
      position:relative
      z-index:20
      overflow:auto
      background:#f9f9f9
      .sidebar-header
        padding: .4rem
        color:#fff
        background:#00a2ea
        .user
          display:flex
          .avatar
            width:.8rem
            height:.8rem
            border-radius:50%
          .name
            flex:1
            margin-left:.533rem
            font-size:16px
            line-height:.8rem
        .user-action
          display:flex
          margin-top:.8rem
          padding-left:.2rem
          .action
            flex:1
            font-size:14px
            .text
              margin-left:.5rem
      .home
        height:1.5rem
        padding-left:.55rem
        margin:0
        font-size:16px
        color:#00a2ea
        background:#f9f9f9
        &.active
          background:rgba(188,188,188,.2)
        .icon-font
          font-size:24px
          line-height:1.5rem
        .text
          margin-left:.3rem
          line-height:1.5rem
          vertical-align:bottom
      .sidebar-themes
        padding:0
        .themes-item
          height:1.253rem
          line-height:1.253rem
          display:flex
          padding:0 1rem 0 .4rem
          color:#2c3e50
          &.active
            background:rgba(188,188,188,.2)
            .icon
              transform:rotateZ(90deg)
          .name
            flex:1
            font-size:16px
          .icon
            font-size:22px
            transition:all 0.2s
    .sidebar-mask
      width:200%
      height:100%
      position:fixed
      z-index:10
      top:0
      right:0
      left:0
      bottom:0
      opacity: 0.5
      background:#000
</style>

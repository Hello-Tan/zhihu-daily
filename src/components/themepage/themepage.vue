<template>
  <transition name="faded">
    <div class="themepage">
      <top-menu :title="topics.name"
                :showFlag="false"
                @select="select">
      </top-menu>
      <div class="themepage-main" v-show="!editorsShow">
        <div class="bg-box">
          <div class="bg" :style="{ backgroundImage: 'url(' + topics.background + ')'}">
            <div class="bg-mask"></div>
            <h1 class="bg-title">{{topics.description}}</h1>
          </div>
        </div>
        <div class="editors-box"
             v-show="topics.editors"
             @click="showEditors">
          <span class="text">主编</span>
          <img v-for="item in topics.editors"
               :src="item.avatar"
               class="editor-avatar">
        </div>
        <stories-list :stories="stories"
                      :showTitle="false"></stories-list>
        <div class="loading-wrapper" v-show="!nomore && showFlag">
          <loading></loading>
        </div>
        <p class="nomore" v-show="nomore">没有更多了...  ╮(๑•́ ₃•̀๑)╭</p>
      </div>
      <keep-alive>
        <router-view :editors="topics.editors"
                     @back="hideEditors"></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import TopMenu from 'components/topmenu/topmenu'
  import StoriesList from 'components/stories-list/stories-list'
  import Loading from 'base/loading/loading'
  import api from '../../api/index'
  import {throttle} from 'common/js/util'
  import {mapGetters, mapMutations} from 'vuex'

  const THRESHOLD = 200

  export default {
    data () {
      return {
        showFlag: false,
        editorsShow: false,
        nomore: false,
        topics: {},
        stories: []
      }
    },
    computed: {
      ...mapGetters([
        'themeId',
        'scrollTop'
      ])
    },
    created () {
      this.throttleScroll = throttle(() => {
        if (!this.stories.length) {
          return
        }
        const innerHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if ((innerHeight + scrollTop) >= (scrollHeight - THRESHOLD)) {
          if (this.showFlag) {
            return
          }
          this.showFlag = true
          this._getTopicsBeforeById()
        }
      }, 60, 120)
      this._getTopicsById()
    },
    watch: {
      themeId (id) {
        if (id) {
          this.topics = {}
          this.stories = []
          this.showFlag = false
          this.nomore = false
          this.editorsShow = false
          this._getTopicsById()
        }
      }
    },
    activated () {        // 路由显示时
      this._listenerScroll()
      document.body.scrollTop = this.scrollTop
    },
    deactivated () {        // 路由隐藏时
      this._stopListenerScroll()
      this.setScrollTop(document.body.scrollTop)
    },
    methods: {
      select () {
        this.setSidebarShow(true)
      },
      showEditors () {
        this.$router.push('/editors')
        setTimeout(() => {
          this.editorsShow = true
        }, 500)
      },
      hideEditors () {
        this.editorsShow = false
      },
      ...mapMutations({
        'setSidebarShow': 'SET_SIDEBAR_SHOW',
        'setScrollTop': 'SET_SCROLL_TOP'
      }),
      _getTopicsById () {
        if (!this.themeId) {
          this.$router.push('/')
          return
        }
        api.getTopicsById(this.themeId).then((res) => {
          this.topics = res.data
          this.stories.push(res.data.stories)
        }).catch((err) => {
          console.log(err)
          this._getTopicsById()
        })
      },
      _getTopicsBeforeById () {
        if (!this.stories.length) {
          return
        }
        const last = this.stories[this.stories.length - 1]
        const beforeid = last[last.length - 1].id
        api.getTopicsBeforeById(this.themeId, beforeid).then((res) => {
          this.stories.push(res.data.stories)
          this.showFlag = false
          if (!res.data.stories.length) {
            this.showFlag = false
            this.nomore = true
            this._stopListenerScroll()
          }
        }).catch((err) => {
          console.log(err)
          this._getTopicsBeforeById()
        })
      },
      _listenerScroll () {
        window.addEventListener('scroll', this.throttleScroll, false)
      },
      _stopListenerScroll () {
        window.removeEventListener('scroll', this.throttleScroll)
      }
    },
    components: {
      TopMenu,
      StoriesList,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .faded-enter-active, .faded-leave-active
    transition: all .6s
    opacity: 1
  .faded-leave
    opacity: 1
  .themepage
    .themepage-main
      position:relative
      top:1.333rem
      background:#f2f2f2
      .bg-box
        padding-Top(60%)
        .bg
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          background-size: 100%
          background-position: 50%
          background-repeat: no-repeat
          .bg-mask
            width: 100%
            height: 100%
            position: absolute
            top: 0
            left: 0
            background: gradient(linear, left top, left bottom, color-stop(25%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.6)))
            background: linear-gradient(to bottom, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%)
          .bg-title
            position: absolute
            left:0
            bottom:15px
            font-weight: 500
            padding:0 20px
            margin: 0
            font-size: 20px
            line-height:1.2
            color: #fff
      .editors-box
        position:relative
        top:10px
        padding:0 10px
        background:#f2f2f2
        .text
          display:inline-block
          margin-right:15px
          color:#2c3e50
          font-size:16px
          line-height:.8rem
        .editor-avatar
          width:.8rem
          height:.8rem
          margin-right:12px
          border-radius:50%
          vertical-align:bottom
      .loading-wrapper
        background:#f2f2f2
      .nomore
        padding:10px 0
        color:#2c3e50
        font-size:16px
        text-align:center
        background:#f2f2f2
</style>

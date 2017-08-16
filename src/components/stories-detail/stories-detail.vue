<template>
  <transition name="slide">
    <div class="stories-detail">
      <div class="header">
        <div class="header-icon back" @click="back">
          <i class="icon-font">&#xe603</i>
        </div>
        <div class="header-blank"></div>
        <div class="header-icon">
          <i class="icon-font">&#xe61f</i>
        </div>
        <div class="header-icon" @click="triggerFavorite">
          <i class="icon-font"
             :class="{favorite: favorite}">&#xe604</i>
        </div>
        <div class="header-icon" @click="showComments">
          <i class="icon-font message">&#xe606</i>
          <span class="count">{{comments}}</span>
        </div>
        <div class="header-icon" @click="like">
          <i class="icon-font" :class="{highlight:highlight}">&#xe611</i>
          <span class="count">{{popularity}}</span>
        </div>
      </div>
      <div class="main" v-show="showFlag">
        <div class="img-box" v-if="news.image"
             :style="{ backgroundImage: 'url(' + news.image + ')'}">
          <div class="img-mask"></div>
          <h1 class="img-title">{{news.title}}</h1>
          <p class="img-source">{{news.image_source}}</p>
        </div>
        <div class="content" v-if="news.type < 2" v-html="news.body"></div>
      </div>
      <div class="loading-wrapper" v-show="!showFlag">
        <loading></loading>
      </div>
      <iframe v-if="news.type > 1" v-show="showFlag"
              :src="https" width="100%" height="100%" style="position:relative;top:1.35rem"></iframe>
      <keep-alive>
        <router-view
                  :newsInfo="newsInfo"
                  @hide="commentsHide"
                  @show="commentsShow"></router-view>
      </keep-alive>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import api from '../../api/index'
  import Loading from 'base/loading/loading'

  export default {
    data () {
      return {
        news: {},
        newsInfo: {},
        showFlag: false,
        highlight: false
      }
    },
    computed: {
      comments () {
        if (this.newsInfo.comments) {
          let num = this.newsInfo.comments
          return num > 999 ? `${(num / 1000).toFixed(1)}k` : num
        }
        return this.newsInfo.comments === 0 ? '0' : '...'
      },
      popularity () {
        if (this.newsInfo.popularity) {
          let num = this.newsInfo.popularity
          return num > 999 ? `${(num / 1000).toFixed(1)}k` : num
        }
        return this.newsInfo.popularity === 0 ? '0' : '...'
      },
      https () {
        if (this.news.share_url.indexOf('https') > -1) {
          console.log('htttps')
          return this.news.share_url
        }
        console.log('htttp')
        return `https${this.news.share_url.substr(4)}`
      },
      ...mapGetters([
        'storiesId',
        'favoriteStories',
        'stories',
        'favorite'
      ])
    },
    watch: {
      storiesId () {
        this.init()
        this.news = {}
        this.newsInfo = {}
      }
    },
    created () {
      if (!this.storiesId) {
        this.$router.push('/')
      }
      this.init()
    },
    methods: {
      back () {
        this.$router.back()
        this.setDetailShow(false)
      },
      show () {
        this.$nextTick(() => {
          this.showFlag = true
        })
      },
      init () {
        this.showFlag = false
        this.highlight = false
        this._getNewsById()
        this._getNewsInfoById()
      },
      showComments () {
        this.$router.push('/comments')
        setTimeout(() => {
          this.showFlag = false
        }, 500)
      },
      commentsHide () {
        this.showFlag = true
      },
      commentsShow () {
        setTimeout(() => {
          this.showFlag = false
        }, 500)
      },
      like () {
        this.highlight = !this.highlight
        this.highlight === true ? this.newsInfo.popularity++ : this.newsInfo.popularity--
      },
      triggerFavorite () {
        if (this.favorite) {
          this.deleteStoriesList(this.stories)
        } else {
          this.saveStoriesList(this.stories)
        }
      },
      ...mapMutations({
        'setDetailShow': 'SET_DETAIL_SHOW'
      }),
      ...mapActions([
        'saveStoriesList',
        'deleteStoriesList'
      ]),
      _getNewsById () {
        if (!this.storiesId) {
          this.$router.push('/')
          return
        }
        api.getNewsById(this.storiesId).then((res) => {
          this.news = res.data
          this.show()
        }).catch((err) => {
          console.log(err)
          this._getNewsById()
        })
      },
      _getNewsInfoById () {
        if (!this.storiesId) {
          this.$router.push('/')
          return
        }
        api.getNewsInfoById(this.storiesId).then((res) => {
          this.newsInfo = res.data
          this.show()
        }).catch((err) => {
          console.log(err)
          this._getNewsInfoById()
        })
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/share.css"

  .slide-enter-active, .slide-leave-active
    transition: all .5s
    position: fixed !important
  .slide-enter, .slide-leave-to
    transform:translate3d(100%,0,0)
  .stories-detail
    position: absolute
    width:100%
    height:100%
    z-index:200
    top:0
    left:0
    background:#fff
    .header
      position:fixed
      top:0
      z-index:10
      width:100%
      height:1.333rem
      display:flex
      flex-direction: row
      padding-right:.267rem
      background:#00a2ea
      color:#fff
      .header-blank
        flex:1.6
      .header-icon
        flex:1
        text-align:center
        font-size:0
        .icon-font
          font-size:.507rem
          line-height:1.413rem
          background:none
          &.message
           position:relative
           top:.03rem
          &.highlight
            color:orange
          &.favorite
            color:yellow
        .count
          font-size:.373rem
          margin-left:.08rem
          vertical-align:.03rem
    .main
      position:relative
      top:1.333rem
      .img-box
        width:100%
        padding-Top(60%)
        background-size: 100%
        background-position: 50%
        background-repeat: no-repeat
        .img-mask
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          background: gradient(linear, left top, left bottom, color-stop(25%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.6)))
          background: linear-gradient(to bottom, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%)
        .img-title
          position: absolute
          left:0
          bottom:15px
          font-weight: 500
          padding:0 20px
          margin:0
          font-size: 20px
          line-height:1.2
          color: #fff
        .img-source
          position: absolute
          bottom: 10px
          right: 0
          padding: 0 20px
          font-weight: 300
          font-size: 12px
          color: #d3d3d3
    .loading-wrapper
      position: absolute
      top:50%
      left:50%
      transform:translate3d(-50%,-50%,0)
</style>

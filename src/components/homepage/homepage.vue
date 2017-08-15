<template>
  <div class="homepage"
       v-show="!detailShow && !themeId && !favoriteShow"
       ref="homepage">
    <top-menu :title="title"
              @select="showSidebar"
              @mode="showMode"></top-menu>
    <div class="homepage-content">
      <slide :topStories="topStories"
             :hash="hash"
             @select="selectItem" ></slide>
      <stories-list :stories="stories"
                    :dates="dates"
                    ref="storiesList">
      </stories-list>
      <div class="loading-wrapper" v-show="showFlag">
        <loading></loading>
      </div>
    </div>
    <div class="change-mode" v-show="modeFlag">
      <p class="text" @click.stop="trigger">{{modeText}}</p>
      <div class="mode-mask"
           @click="hideMode"
           @touchstart="hideMode"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopMenu from 'components/topmenu/topmenu'
  import Slide from 'components/slide/slide'
  import StoriesList from 'components/stories-list/stories-list'
  import Loading from 'base/loading/loading'
  import api from '../../api/index'
  import {throttle} from 'common/js/util'
  import {formattingDate} from 'common/js/formattingDate'
  import {mapGetters, mapMutations, mapActions} from 'vuex'

  const THRESHOLD = 200
  const DAY = 86400000
  const HOMEPAGE = '#/'

  export default {
    data () {
      return {
        stories: [],
        topStories: [],
        dates: [],
        date: new Date(+new Date() + DAY),
        showFlag: false,
        modeFlag: false,
        title: '首页',
        hash: ''
      }
    },
    created () {
      this.throttleScroll = throttle(() => {
        const innerHeight = window.innerHeight
        const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if ((innerHeight + scrollTop) >= (scrollHeight - THRESHOLD)) {
          if (this.showFlag) {
            return
          }
          this.showFlag = true
          this.date.setTime(+this.date - DAY)
          let date = formattingDate(this.date, 'yyyyMMdd')
          this._getNewsByDate(date)
        }
        for (let i = 0; i < this.storiesHeight.length; i++) {
          let height1 = this.storiesHeight[i]
          let height2 = this.storiesHeight[i + 1]
          if (!height2 || (scrollTop >= height1 && scrollTop < height2)) {
            this.title = this.$refs.storiesList.title(this.dates[i])
            return
          }
        }
      }, 60, 120)
      this._getNews()
      this._watchHash()
      this._listenerScroll()
      if (this.nightMode) {
        document.body.className = 'night'
      } else {
        document.body.className = ''
      }
      window.onload = () => {
        console.log('load')
      }
    },
    computed: {
      modeText () {
        if (this.nightMode) {
          return '日间模式'
        } else {
          return '夜间模式'
        }
      },
      ...mapGetters([
        'storiesHeight',
        'detailShow',
        'themeId',
        'favoriteShow',
        'nightMode'
      ])
    },
    watch: {
      nightMode (mode) {
        if (mode) {
          document.body.className = 'night'
        } else {
          document.body.className = ''
        }
      }
    },
    methods: {
      showSidebar () {
        this.setSidebarShow(true)
      },
      trigger () {
        this.saveNightModeState()
        this.hideMode()
      },
      showMode () {
        this.modeFlag = true
      },
      hideMode () {
        this.modeFlag = false
      },
      selectItem (item) {
        this.$router.push(`/detail/${item.id}`)
        this.setStories(item)
        setTimeout(() => {
          this.setDetailShow(true)
        }, 500)
      },
      ...mapMutations({
        'setDetailShow': 'SET_DETAIL_SHOW',
        'setSidebarShow': 'SET_SIDEBAR_SHOW',
        'setThemeId': 'SET_THEME_ID',
        'setStories': 'SET_STORIES_STATE'
      }),
      ...mapActions([
        'saveNightModeState'
      ]),
      _getNews () {
        api.getNews().then((res) => {
          this.topStories = res.data.top_stories
          this.stories.push(res.data.stories)
          this.dates.push(res.data.date)
        }).catch((err) => {
          console.log(err)
          this._getNews()
        })
      },
      _getNewsByDate (date) {
        api.getNewsByDate(date).then((res) => {
          this.stories.push(res.data.stories)
          this.dates.push(res.data.date)
          this.showFlag = false
        }).catch((err) => {
          console.log(err)
          let date = formattingDate(this.date, 'yyyyMMdd')
          this._getNewsByDate(date)
        })
      },
      _listenerScroll () {
        window.addEventListener('scroll', this.throttleScroll, false)
      },
      _stopListenerScroll () {
        window.removeEventListener('scroll', this.throttleScroll)
      },
      _watchHash () {
        window.addEventListener('hashchange', () => {
          this.hash = location.hash
          if (this.hash === HOMEPAGE) {
            this.setDetailShow(false)
            this.setThemeId(0)
            this._listenerScroll()
          } else {
            this._stopListenerScroll()
          }
        }, false)
      }
    },
    components: {
      TopMenu,
      Slide,
      StoriesList,
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .homepage
    left:0
    .homepage-content
      position: relative
      top:1.333rem
      .loading-wrapper
        background:#f2f2f2
    .change-mode
      position: fixed
      z-index:150
      top: 3px
      right:3px
      width: 50%
      height: 1.633rem
      box-shadow: -5px 10px 20px rgba(0,0,0,.5)
      border-radius:3px
      background: #fff
      .text
        position:relative
        z-index:120
        padding-left:15px
        font-size:16px
        line-height: 1.633rem
        color:#2c3e50
      .mode-mask
        position: fixed
        z-index:100
        top: 0
        left:0
        right: 0
        bottom:0
</style>

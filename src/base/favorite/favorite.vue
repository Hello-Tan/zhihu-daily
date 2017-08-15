<template>
  <transition name="fadeout">
    <div class="favorite-wrapper">
      <div class="favorite-header">
        <div class="icon" @click="showSidebar">
          <i class="icon-font">&#xe612</i>
        </div>
        <h1 class="title">{{favoriteStories.length}} 条收藏</h1>
      </div>
      <div class="favorite-main">
        <ul>
          <li v-for="item in favoriteStories"
              @click="selectItem(item)"
              class="list">
            <div class="text-box"><p class="text">{{item.title}}</p></div>
            <div class="img-box"
                 v-if="item.images && item.images.length">
              <img v-lazy="item.images[0]" class="img">
              <p class="tip" v-if="item.multipic"><i class="icon-font">&#xe61c</i>多图</p>
            </div>
          </li>
        </ul>
      </div>
  </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    computed: {
      ...mapGetters([
        'storiesHeight',
        'favoriteStories'
      ])
    },
    created () {
      if (!this.storiesHeight.length) {
        this.$router.push('/')
      }
    },
    activated () {        // 路由显示时
      this.setFavoriteShow(true)
    },
    deactivated () {        // 路由隐藏时
      this.setFavoriteShow(false)
    },
    methods: {
      showSidebar () {
        this.setSidebarShow(true)
      },
      selectItem (item) {
        this.$router.push(`../../detail/${item.id}`)
        this.setStoriesId(item.id)
        this.setStories(item)
        setTimeout(() => {
          this.setDetailShow(true)
        }, 500)
      },
      ...mapMutations({
        'setDetailShow': 'SET_DETAIL_SHOW',
        'setStoriesId': 'SET_STORIES_ID',
        'setStories': 'SET_STORIES_STATE',
        'setSidebarShow': 'SET_SIDEBAR_SHOW',
        'setFavoriteShow': 'SET_FAVORITE_SHOW'
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .fadeout-enter-active, .fadeout-leave-active
    transition: all .6s
  .fadeout-leave-to, .leave
    opacity: 1
  .favorite-wrapper
    position:absolute
    z-index:100
    top:0
    left:0
    background:#fff
    .favorite-header
      display: flex
      position: fixed
      z-index: 100
      top: 0
      width: 100%
      height: 1.333rem
      background: #00a2ea
      color: #fff
      .icon
        flex: 1
        text-align: center
        .icon-font
          font-size: 20px
          line-height: 1.413rem
      .title
        flex:6
        margin:0
        padding-left: 0.267rem
        font-size: 18px;
        line-height: 1.413rem
    .favorite-main
      position:relative
      top:1.333rem
      background: #fff
      ul
        padding: 0
      .list
        padding:10px
        margin:10px
        min-height:1rem
        display:flex
        flex-direction: row
        position: relative
        border-radius: 5px
        border:1px solid #eaeaea
        border-bottom:1px solid #d0d0d0
        background:#fff
        .text-box
          flex:1
          margin-right:20px
          .text
            margin-top:5px
            font-size:16px
            font-weight:300
            color:#2c3e50
            line-height:1.4
        .img-box
          width:2rem
          height:1.867rem
          position: relative
          .img
            width:2rem
            height:1.867rem
          .tip
            color: #fff
            position: absolute
            bottom: 0
            right: 0
            font-size: .267rem
            padding: .053rem .107rem
            background: rgba(0,0,0,.5)
            .icon-font
              font-size: .267rem
              color: #fff
              margin-right: .08rem
</style>

<template>
  <div class="slide" ref="slide">
    <div class="slide-wrapper">
      <div class="slide-box" ref="slideBox">
        <div v-for="item in topStories" class="slide-item"
             @click="selectItem(item)"
             :style="{ backgroundImage: 'url(' + item.image + ')', width:$refs.slide.clientWidth + 'px'}">
          <div class="slide-mask"></div>
          <h1 class="slide-title">{{item.title}}</h1>
        </div>
      </div>
      <div class="slide-pagination">
        <span class="dot" v-for="(dot,index) in dots"
              :class="{'active': index === swipe.index}"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swipe from 'common/js/swipe'

  const HOMEPAGE = '#/'

  export default {
    data () {
      return {
        dots: [],
        swipe: null
      }
    },
    props: {
      topStories: {
        type: Array,
        default () {
          return []
        }
      },
      hash: {
        type: String,
        default: ''
      }
    },
    methods: {
      selectItem (item) {
        this.$emit('select', item)
      }
    },
    watch: {
      topStories (val) {
        if (val.length) {
          this.$refs.slideBox.style.width = this.$refs.slide.clientWidth * val.length + 'px'
          this.swipe = new Swipe({
            el: this.$refs.slideBox,
            length: val.length,
            width: window.innerWidth,
            autoPlay: true,
            interval: 4000,
            speed: 400,
            threshold: 0.3
          })
          this.swipe.init()
          this.dots.length = val.length
        }
      },
      hash (val) {
        if (this.swipe === null) {
          return
        }
        if (val !== HOMEPAGE) {     // 主页隐藏停止轮播图
          this.swipe.stopAutoPlay()
        } else {
          this.swipe.next()
          this.swipe.startAutoPlay()
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .slide
    width:100%
    padding-Top(60%)
    .slide-wrapper
      position:absolute
      width:100%
      height:100%
      top: 0
      background:#f2f2f2
      .slide-box
        height:100%
        position:absolute
        top:0
        transition-property: all !important
        .slide-item
          height:100%
          float:left
          background-size: 100%
          background-position: 50%
          background-repeat: no-repeat
          position: relative
          .slide-mask
            width: 100%
            height: 100%
            position: absolute
            top: 0
            left: 0
            background: gradient(linear, left top, left bottom, color-stop(25%,rgba(0,0,0,0)), color-stop(100%,rgba(0,0,0,0.6)))
            background: linear-gradient(to bottom, rgba(0,0,0,0) 25%,rgba(0,0,0,0.6) 100%)
          .slide-title
            position: absolute
            left:0
            bottom:15px
            font-weight: 500
            padding:0 20px
            margin:0
            font-size: 20px
            line-height:1.2
            color: #fff
      .slide-pagination
        width:100%
        text-align:center
        position:absolute
        left:0
        bottom:6px
        .dot
          width:8px
          height:8px
          margin:0 5px
          display: inline-block
          border-radius: 50%
          background: #5a5a5a
          opacity: .8
          &.active
            opacity:1
            background:#fff
</style>

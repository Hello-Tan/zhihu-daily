<template>
  <transition name="slide">
    <div class="comments">
      <div class="header" ref="header">
        <div class="header-icon back" @click="hide">
          <i class="icon-font">&#xe603</i>
        </div>
        <div class="header-text">
          <p class="text">{{newsInfo.comments}} 条点评</p>
        </div>
        <div class="header-icon">
          <i class="icon-font">&#xe627</i>
        </div>
      </div>
      <div class="comments-main">
        <div class="long-comments">
          <h2 class="title border-1px">{{newsInfo.long_comments}} 条长评</h2>
          <ul>
            <li class="comments-item border-1px" v-for="item in longComments">
              <div class="avatar-box">
                <img :src="item.avatar" width="35" height="35" class="avatar">
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <p class="author" v-html="item.author"></p>
                  <div class="likes" @click="like(item)">
                    <i class="icon-font" :class="{highlight:item.highlight}">&#xe611</i>
                    {{item.likes}}
                  </div>
                </div>
                <div class="comments-text">
                  <p v-html="item.content"></p>
                  <p v-if="item.reply_to" class="reply">//{{item.reply_to.author}}: <span class="reply-text" v-html="item.reply_to.content"></span></p>
                </div>
                <div class="comment-time">{{time(item.time)}}</div>
              </div>
            </li>
          </ul>
          <div class="no-long-comments" v-if="!newsInfo.long_comments" :style="{height:noLongCommentsHeight}">
            <div class="no-icon">
              <i class="icon-font">&#xe62a</i>
              <p class="text">深度长评虚位以待</p>
            </div>
          </div>
        </div>
        <div class="short-comments">
          <h2 class="title border-1px" @click="triggerShortComments">{{newsInfo.short_comments}} 条短评
            <i class="icon-font" ref="icon">&#xe628</i>
          </h2>
          <ul v-show="showShortComments">
            <li class="comments-item border-1px" v-for="item in shortComments">
              <div class="avatar-box">
                <img v-lazy="item.avatar" width="35" height="35" class="avatar">
              </div>
              <div class="comment-content">
                <div class="comment-header">
                  <p class="author" v-html="item.author"></p>
                  <div class="likes" @click="like(item)">
                    <i class="icon-font" :class="{highlight:item.highlight}">&#xe611</i>
                    {{item.likes}}
                  </div>
                </div>
                <div class="comments-text">
                  <p v-html="item.content"></p>
                  <p v-if="item.reply_to" class="reply">//{{item.reply_to.author}}: <span class="reply-text" v-html="item.reply_to.content"></span></p>
                </div>
                <div class="comment-time">{{time(item.time)}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import api from '../../api/index'
  import {mapGetters} from 'vuex'
  import {formattingDate} from 'common/js/formattingDate'
  import {prefixStyle} from 'common/js/dom'

  const transform = prefixStyle('transform')

  export default {
    data () {
      return {
        showShortComments: false,
        noLongCommentsHeight: 0,
        longComments: [],
        shortComments: []
      }
    },
    props: {
      newsInfo: {
        type: Object,
        default: {}
      }
    },
    computed: {
      ...mapGetters([
        'storiesId'
      ])
    },
    watch: {
      storiesId () {
        this.longComments = []
        this.shortComments = []
        this.init()
      }
    },
    created () {
      this.init()
    },
    activated () {        // 路由显示时
      this.$emit('show')
      this.showShortComments = false
      this.$nextTick(() => {
        this.$refs.icon.style[transform] = 'rotateZ(0)'
        this.noLongCommentsHeight = `${window.innerHeight - this.$refs.header.offsetHeight - 46 * 2}px`
      })
    },
    deactivated () {        // 路由隐藏时
      this.$emit('hide')
    },
    methods: {
      init () {
        if (!this.longComments.length || !this.longComments.length) {
          this._getLongComments()
          this._getShortComments()
        }
      },
      hide () {
        this.$router.back()
        this.$emit('hide')
      },
      time (time) {
        return `${formattingDate(new Date(time * 1000), 'MM-dd hh:mm')}`
      },
      triggerShortComments () {
        this.showShortComments = !this.showShortComments
        this.showShortComments === true ? this.$refs.icon.style[transform] = 'rotateZ(180deg)' : this.$refs.icon.style[transform] = 'rotateZ(0)'
      },
      like (item) {
        item.highlight = !item.highlight
        item.highlight === true ? item.likes++ : item.likes--
      },
      _handleComments (comments) {
        comments.forEach((comment) => {
          comment.highlight = false
        })
        return comments
      },
      _getLongComments () {
        api.getLongComments(this.storiesId).then((res) => {
          this.longComments = this._handleComments(res.data.comments)
        }).catch((err) => {
          console.log(err)
          this._getLongComments()
        })
      },
      _getShortComments () {
        api.getShortComments(this.storiesId).then((res) => {
          this.shortComments = this._handleComments(res.data.comments)
        }).catch((err) => {
          console.log(err)
          this._getShortComments()
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .slide-enter-active, .slide-leave-active
    transition: all .5s
    position: fixed !important
    height:50000px !important
  .slide-enter, .slide-leave-to
    transform:translate3d(100%,0,0)
  .comments
    position: absolute
    width:100%
    height:100%
    z-index:300
    top:0
    left:0
    background:#fff
    .header
      .header-text
        flex: 6
        padding-left: .267rem
        .text
          font-size:18px
          line-height:1.333rem
          color:#fff
    .comments-main
      position: relative
      top:1.333rem
      background:#fff
      .title
        padding:15px 20px
        border-1pxY(#c3c3c3)
        font-size:16px
        .icon-font
          transition:all 0.3s
          float:right
          color:#b0b0b0
      ul
        padding: 0
        .comments-item
          padding:15px 20px
          font-size:16px
          border-1px(#c3c3c3)
          &:last-child:after
            border:none
          .avatar-box
            float: left
            margin-right:10px
            .avatar
              border-radius:50%
          .comment-content
            overflow:hidden
            .comment-header
              display:flex
              .author
                flex:1
                line-height:1.5
                font-weight:700
              .likes
                color:#b0b0b0
                font-size:12px
                line-height:1.5
                .highlight
                  color:#00a2ea
            .comments-text
              margin:10px 0
              line-height:1.5
              .reply
                font-size:16px
                font-weight:700
                line-height:1.2
                .reply-text
                  font-size:14px
                  font-weight:300
                  color:#8c8c8c
            .comment-time
              color: #b0b0b0
              font-size:12px
      .no-long-comments
        position:relative
        .no-icon
          position:absolute
          top:50%
          left:50%
          transform:translate3d(-50%,-50%,0)
          color:#b0b0b0
          text-align:center
          .icon-font
            font-size:100px
          .text
            margin-top:20px
            font-size:16px
</style>

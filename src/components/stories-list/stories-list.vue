<template>
  <div class="stories-list">
    <div class="stories-list-box" v-for="(item,index) in stories" ref="storiesListBox">
      <h2 class="title" v-if="showTitle">{{title(dates[index])}}</h2>
      <ul>
        <li v-for="list in item" class="list" @click="selectList(list)">
          <div class="text-box"><p class="text">{{list.title}}</p></div>
          <div class="img-box"
               v-if="list.images && list.images.length">
            <img v-lazy="list.images[0]" class="img">
            <p class="tip" v-if="list.multipic"><i class="icon-font">&#xe61c</i>多图</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {formattingDate} from 'common/js/formattingDate'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data () {
      return {
        days: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      }
    },
    props: {
      stories: {
        type: Array,
        default: []
      },
      dates: {
        type: Array,
        default () {
          return []
        }
      },
      showTitle: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters([
        'storiesHeight'
      ])
    },
    methods: {
      title (date) {
        if (!date) {      // 默认显示标题
          return '首页'
        }
        if (formattingDate(new Date(), 'yyyyMMdd') === date) {
          return '今日热闻'
        } else {
          let d = +new Date(date.substr(0, 4), date.substr(4, 2) - 1, date.substr(6, 2))
          let day = new Date(d).getDay()
          return `${date.substr(4, 2)}月${date.substr(6, 2)}日 ${this.days[day]}`
        }
      },
      selectList (list) {
        this.$router.push(`../../detail/${list.id}`)
        this.setStories(list)
        setTimeout(() => {
          this.setDetailShow(true)
        }, 500)
      },
      ...mapMutations({
        'setStoriesHeight': 'SET_STORIES_HEIGHT',
        'setDetailShow': 'SET_DETAIL_SHOW',
        'setStories': 'SET_STORIES_STATE'
      }),
      _calculateHeight () {
        let list = this.$refs.storiesListBox
        let arr = []
        let height = list[0].offsetTop
        arr.push(height)
        for (let i = 0, len = list.length; i < len; i++) {
          height += list[i].clientHeight
          arr.push(height)
        }
        this.setStoriesHeight(arr)
      }
    },
    watch: {
      stories () {
        if (this.showTitle) {
          setTimeout(() => {
            this._calculateHeight()
          }, 20)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .stories-list
    .stories-list-box
      padding:.267rem 0 0 0
      background:#f2f2f2
      .title
        margin:0 0 10px 20px
        font-size:14px
        font-weight:300
        color:#76787e
      ul
        padding: 0
        .list
          padding:10px
          margin:10px 10px 0 10px
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

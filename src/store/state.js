import {loadStories, loadNightMode} from 'common/js/cache'

const state = {
  storiesHeight: [],
  themeId: 0,
  scrollTop: 0,
  detailShow: false,
  sidebarShow: false,
  favoriteShow: false,
  stories: {},
  favoriteStories: loadStories(),
  nightMode: loadNightMode()
}

export default state

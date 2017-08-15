import * as types from './mutation-types'

const mutations = {
  [types.SET_STORIES_HEIGHT] (state, list) {
    state.storiesHeight = list
  },
  [types.SET_THEME_ID] (state, id) {
    state.themeId = id
  },
  [types.SET_SCROLL_TOP] (state, top) {
    state.scrollTop = top
  },
  [types.SET_DETAIL_SHOW] (state, flag) {
    state.detailShow = flag
  },
  [types.SET_SIDEBAR_SHOW] (state, flag) {
    state.sidebarShow = flag
  },
  [types.SET_FAVORITE_SHOW] (state, flag) {
    state.favoriteShow = flag
  },
  [types.SET_STORIES_STATE] (state, item) {
    state.stories = item
  },
  [types.SET_FAVORITE_STORIES] (state, list) {
    state.favoriteStories = list
  },
  [types.SET_NIGHT_MODE] (state, flag) {
    state.nightMode = flag
  }
}

export default mutations

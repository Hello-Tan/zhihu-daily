export const storiesHeight = state => state.storiesHeight

export const storiesId = (state) => {
  return state.stories.id || 0
}

export const themeId = state => state.themeId

export const scrollTop = state => state.scrollTop

export const detailShow = state => state.detailShow

export const sidebarShow = state => state.sidebarShow

export const favoriteShow = state => state.favoriteShow

export const stories = state => state.stories

export const favoriteStories = state => state.favoriteStories

export const favorite = (state) => {
  let index = -1
  state.favoriteStories.forEach((item, i) => {
    if (item.id === state.stories.id) {
      index = i
      return
    }
  })
  if (index > -1) {
    return true
  } else {
    return false
  }
}

export const nightMode = state => state.nightMode

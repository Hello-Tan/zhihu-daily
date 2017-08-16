import Vue from 'vue'
import Router from 'vue-router'
import StoriesDetail from 'components/stories-detail/stories-detail'
import Comments from 'base/comments/comments'

Vue.use(Router)

const Editors = (resolve) => {
  import('base/editors/editors').then((module) => {
    resolve(module)
  })
}

const Favorite = (resolve) => {
  import('base/favorite/favorite').then((module) => {
    resolve(module)
  })
}

const ThemePage = (resolve) => {
  import('components/themepage/themepage').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/detail/:id',
      component: StoriesDetail,
      children: [{
        path: '/comments',
        component: Comments
      }]
    },
    {
      path: '/theme/:id',
      component: ThemePage,
      children: [{
        path: '/editors',
        component: Editors
      }]
    },
    {
      path: '/favorite',
      component: Favorite
    }
  ]
})

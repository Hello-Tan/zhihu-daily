import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const StoriesDetail = (resolve) => {
  import('components/stories-detail/stories-detail').then((module) => {
    resolve(module)
  })
}

const Comments = (resolve) => {
  import('base/comments/comments').then((module) => {
    resolve(module)
  })
}

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

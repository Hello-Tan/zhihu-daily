 import * as types from './mutation-types'

 import {saveStories, deleteStories, saveNightMode} from 'common/js/cache'

 export const saveStoriesList = function ({commit}, item) {
   commit(types.SET_FAVORITE_STORIES, saveStories(item))
 }

 export const deleteStoriesList = function ({commit}, item) {
   commit(types.SET_FAVORITE_STORIES, deleteStories(item))
 }

 export const saveNightModeState = function ({commit}) {
   commit(types.SET_NIGHT_MODE, saveNightMode())
 }

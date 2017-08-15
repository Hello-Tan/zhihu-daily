import storage from 'good-storage'

const NIGHT_KEY = '__nightMode__'

const STORIES_KEY = '__stories__'

const STORIES_MAX_LEN = 200

function insertArray (arr, val, maxLen) {
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, val) {
  let index = -1
  arr.forEach((item, i) => {
    if (item.id === val.id) {
      index = i
      return
    }
  })
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveStories (item) {
  let stories = storage.get(STORIES_KEY, [])
  insertArray(stories, item, STORIES_MAX_LEN)
  storage.set(STORIES_KEY, stories)
  return stories
}

export function deleteStories (storie) {
  let stories = storage.get(STORIES_KEY, [])
  deleteFromArray(stories, storie)
  storage.set(STORIES_KEY, stories)
  return stories
}

export function saveNightMode () {
  let nightMode = storage.get(NIGHT_KEY, false)
  nightMode = !nightMode
  storage.set(NIGHT_KEY, nightMode)
  return nightMode
}

export function loadStories () {
  return storage.get(STORIES_KEY, [])
}

export function loadNightMode () {
  return storage.get(NIGHT_KEY, false)
}

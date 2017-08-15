import axios from 'axios'
import {
  NewsResource,
  NewsIdResource,
  NewsDateResource,
  NewsInfoResource,
  CommentsResource,
  TopicsResource,
  TopicsIdResource,
  SectionsResource,
  SectionIdResource
} from './resource'
export default {
  getNews () {
    return axios.get(NewsResource)
  },
  getNewsById (id) {
    return axios.get(NewsIdResource + id)
  },
  getNewsByDate (date) {
    return axios.get(NewsDateResource + date)
  },
  getNewsInfoById (id) {
    return axios.get(NewsInfoResource + id)
  },
  getLongComments (id) {
    return axios.get(CommentsResource + id + '/long-comments')
  },
  getShortComments (id) {
    return axios.get(CommentsResource + id + '/short-comments')
  },
  getTopics () {
    return axios.get(TopicsResource)
  },
  getTopicsById (topicid) {
    return axios.get(TopicsIdResource + topicid)
  },
  getTopicsBeforeById (topicid, beforeid) {
    return axios.get(TopicsIdResource + topicid + '/before/' + beforeid)
  },
  getSections () {
    return axios.get(SectionsResource)
  },
  getSectionsById (sectionid) {
    return axios.get(SectionIdResource, {
      params: {
        sectionid: sectionid
      }
    })
  }
}

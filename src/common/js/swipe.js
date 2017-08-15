import {prefixStyle} from 'common/js/dom'
const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')
const transitionTimingFunction = prefixStyle('transitionTimingFunction')

export default class swipe {
  constructor ({el, length, width, autoPlay, interval, speed, threshold}) {
    this.el = el
    this.length = length
    this.width = width
    this.autoPlay = autoPlay
    this.interval = interval
    this.speed = speed
    this.threshold = width * threshold
    this.index = 0
    this.timer = null
    this.touch = {}
  }
  init () {
    this.el.style[transitionTimingFunction] = 'cubic-bezier(0.165, 0.84, 0.44, 1)'
    if (this.autoPlay) {
      this.startAutoPlay()
    }
    this.touchstart()
    this.touchmove()
    this.touchend()
  }
  touchstart () {
    this.el.addEventListener('touchstart', (ev) => {
      this.stopAutoPlay()
      this.touch.initiated = true    // 开始滑动
      this.touch.moved = false      // 滑动状态
      let touch = ev.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    }, false)
  }
  touchmove () {
    this.el.addEventListener('touchmove', (ev) => {
      if (!this.touch.initiated) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true
      }
      let touch = ev.touches[0]
      const offsetX = touch.pageX - this.touch.startX
      const offsetY = touch.pageY - this.touch.startY
      if (Math.abs(offsetX) < Math.abs(offsetY)) {
        return
      } else {
        ev.preventDefault()
        const offset = -(this.index * this.width) + offsetX
        this.el.style[transform] = `translate3d(${offset}px, 0px, 0px)`
        this.el.style[transitionDuration] = '0s'
      }
    }, false)
  }
  touchend () {
    this.el.addEventListener('touchend', (ev) => {
      if (this.autoPlay) {
        this.startAutoPlay()
      }
      if (!this.touch.moved) {    // 当没有滑动状态时退出
        return
      }
      this.touch.initiated = false    // 滑动结束
      let touch = ev.changedTouches[0]
      let offsetX = touch.pageX - this.touch.startX
      if (this.index === 0 && offsetX > 0) {  // 首张右滑
        this.index = 0
        return this.transition()
      }
      if (this.index === this.length - 1 && offsetX < 0) { // 末张左滑
        this.index = this.length - 1
        return this.transition()
      }
      if (Math.abs(offsetX) > this.threshold && offsetX < 0) {
        this.index++
      }
      if (Math.abs(offsetX) > this.threshold && offsetX > 0) {
        this.index--
      }
      return this.transition()
    }, false)
  }
  transition () {
    const offset = -(this.index * this.width)
    this.el.style[transform] = `translate3d(${offset}px, 0px, 0px)`
    this.el.style[transitionDuration] = `${this.speed}ms`
  }
  startAutoPlay () {
    this.stopAutoPlay()
    this.timer = setTimeout(() => {
      this.index++
      if (this.index > this.length - 1) {
        this.index = 0
      }
      this.transition()
      setTimeout(() => {
        this.startAutoPlay()
      }, this.speed)
    }, this.interval)
  }
  stopAutoPlay () {
    clearTimeout(this.timer)
  }
  next () {
    this.index++
    if (this.index > this.length - 1) {
      this.index = 0
    }
    this.transition()
  }
}

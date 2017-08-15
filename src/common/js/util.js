export function throttle (method, delay, duration) {
  var timer = null
  var startTime = new Date()
  return function () {
    var context = this
    var args = arguments
    var currentTime = new Date()
    clearTimeout(timer)
    if (currentTime - startTime >= duration) {
      method.apply(context, args)
      startTime = currentTime
    } else {
      timer = setTimeout(function () {
        method.apply(context, args)
      }, delay)
    }
  }
}

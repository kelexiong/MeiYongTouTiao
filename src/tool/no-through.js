import articleInfo from '@/store/articleInfo'
export default {
  name: 'no-through',
  bind: function (el, binding) {
    const handleTouchstart = function (event) {
      state.targetY = Math.floor(event.targetTouches[0].clientY) // 手指起始触摸位置
    }

    const handleTouchmove = function (event) {
      let newTargetY = Math.floor(event.targetTouches[0].clientY) // 手指滑动中触摸位置

      let sTop = el.scrollTop // 内容滚动到容器顶部的高度

      let sHeight = el.scrollHeight // 内容的可滚动高度

      let cliHeight = el.clientHeight // 当前内容容器的高度

      if (sTop <= 0 && newTargetY - state.targetY > 0 && event.cancelable) {
        console.log('下拉到页面顶部')

        event.preventDefault()
      } else if (
        sTop >= sHeight - cliHeight &&
        newTargetY - state.targetY < 0 &&
        event.cancelable
      ) {
        console.log('上翻到页面底部')

        event.preventDefault()
      }
    }

    el.addEventListener('touchstart', handleTouchstart)

    el.addEventListener('touchmove', handleTouchmove, false)
  },

  unbind: function (el, binding) {
    // 重置全局变量 targetY

    state.targetY = 0
  }
}

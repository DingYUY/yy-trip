import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'
// 监听window窗口的滚动
// 1.当我们离开页面时, 我们移除监听
// 2.如果别的页面也进行类似的监听, 会编写重复代码
// export default function useScroll(reachBottomCB) {
//   const scrollTop = document.documentElement.scrollTop
//   const scrollHeight = document.documentElement.scrollHeight
//   const clientHeight = document.documentElement.clientHeight
//   const scrollListenerHandler = throttle(() => {
//     console.log('----')
//     if( clientHeight + scrollTop >= scrollHeight) {
//       console.log('滑动到底部了')
//       if(reachBottomCB) reachBottomCB()
//     }
//   },1000)

//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   }),

//   onUnmounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   return scrollTop
// }
export default function useScroll() {
  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 防抖/节流
  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 1) {
      console.log("滚动到底部了")
      isReachBottom.value = true
    }
  },1000)
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, scrollHeight, scrollTop, clientHeight }
}
<template>
  <div class="home" ref="homeRef">
    <home-nav-bar></home-nav-bar>
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" alt="">
    </div>
    <home-search-box></home-search-box>
    <home-categories></home-categories>
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :search-date="'09.19'" :end-date="'09.20'"></search-bar>
    </div>
    <home-content></home-content>
  </div>
</template>


<script>
  export default { name: "home" }
</script>
<script setup>
import { watch, onActivated, ref } from 'vue'
import useHomeStore from '@/stores/modules/home';
import HomeNavBar from './npns/HomeNavBar.vue'
import HomeSearchBox from './npns/HomeSearchBox.vue'
import HomeCategories from './npns/HomeCategories.vue';
import HomeContent from './npns/HomeContent.vue'
import useScroll from '@/hooks/useScroll'
import searchBar from '@/components/search-bar/search-bar.vue';
import { computed } from '@vue/reactivity';

// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggests()
homeStore.fetchCategories()
homeStore.fetchHouseList()

// const moreBtnClick = () => {
//   console.log('加载更多')
//   homeStore.fetchHouseList()
// }

// useScroll(() => {
//   homeStore.fetchHouseList()
// })

// 监听滚动到底部
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
// const { scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if(newValue) {
    homeStore.fetchHouseList().then(() => {
      isReachBottom.value = false
    })
  }
})

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
  // return scrollTop >= 360
})

// 跳转回home时, 保留原来的位置
onActivated(() => {
  homeRef.value?.scrollTo({
    top: scrollTop.value
  })
})

</script>

<style lang="less" scoped>
.home {
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 60px;
}

.banner {
  img {
    width: 100%;
  }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>

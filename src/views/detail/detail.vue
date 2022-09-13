<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    >
    </tab-control>
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
      <detail-info name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"></detail-info>
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"></detail-comment>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>
      <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
      <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
 </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { getDetailInfos } from '@/service'

import TabControl from '@/components/tab-control/TabControl.vue';
import DetailSwipe from '@/views/detail/cpns/detail-01-swipe.vue'
import DetailInfo from '@/views/detail/cpns/detail-02-infos.vue'
import DetailFacility from '@/views/detail/cpns/detail-03-facility.vue'
import DetailLandlord from '@/views/detail/cpns/detail-04-landlord.vue'
import DetailComment from './cpns/detail-05-comment.vue';
import DetailNotice from '@/views/detail/cpns/detail-06-notice.vue'
import DetailMap from '@/views/detail/cpns/detail-07-map.vue'
import DetailIntro from '@/views/detail/cpns/detail-08-intro.vue'
import useScroll from '@/hooks/useScroll';

const router = useRouter()
const route = useRoute()
const houseId = route.params.id

// 发送网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// tabControl相关操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 296
})

const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (!value) return 
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth"
  })
}

// 滚动匹配
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  // 获取所有区域的scrollTops
  const els = Object.values(sectionEls.value)
  const values = els.map(el => el.offsetTop)
  // console.log(values)

  // 跟据newValue去匹配想要索引
  let index = values.length - 1
  for(let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  // console.log(index)
  tabControlRef.value?.setCurrentIndex(index)
})

</script>

<style lang="less" scoped>
  .tabs {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;

    img {
      width: 123px;
    }

    .text {
      margin-top: 12px;
      font-size: 12px;
      color: #7688a7;
    }
  }
</style>
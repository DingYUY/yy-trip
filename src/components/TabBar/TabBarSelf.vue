<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData">
      <div 
        class="tab-bar-item"
        :class="{ active: currentIndex === index }"
        @click="itemClick(index, item)"
      >
        <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
        <img v-else :src="getAssetURL(item.imageActive)" alt="">
        <span class="text">{{ item.text }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>

  import tabbarData from '@/assets/data/tabbar.js'
  import { getAssetURL } from '@/utils/load_assets'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const currentIndex = ref(0)
  const router = useRouter()
  const itemClick = (index, item) => {
    currentIndex.value = index
    router.push(item.path)
  }

</script>

<style lang="less" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  border-top: 1px solid #f3f3f3;

  .tab-bar-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // less中&符解析为父选择器自身或父选择器的伪类
    &.active {
      color: var(--primary-color);
    }

    img {
      width: 32px;
    }

    .text {
      margin-top: 2px;
      font-size: 12px;
    }
  }
}
</style>
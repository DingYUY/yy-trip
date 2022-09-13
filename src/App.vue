<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar"></tab-bar>
    <loading></loading>
  </div>
</template>

<script setup>

  import TabBar from '@/components/TabBar/TabBar.vue'
  import loading from './components/loading/loading.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute()

</script>

<style lang="less" scoped>

</style>

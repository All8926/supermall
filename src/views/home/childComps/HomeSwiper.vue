<template>
  <swiper>
    <swiper-item v-for="item in banners" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",

  // 传入数据
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if(!this.isLoad) {
      this.$emit('swiperImageLoad')
      this.isLoad = true  
      }
    }
  },
  
  components: {
    Swiper,
    SwiperItem,
  },
};
</script>

<style>
</style>
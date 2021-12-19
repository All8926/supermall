<template>

<swiper  class="datail-swiper">
  <swiper-item v-for="item in topImages" :key="item.index" >
    
    <img :src="item" alt="" class="swiper-img">
  </swiper-item>
</swiper>

</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
  name: "DetsilSwiper",
  components: {
Swiper,
SwiperItem
   
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.datail-swiper{
  width: 100%;
  height: 300px;
}
.swiper-img{
 width: 100%;
 height: 100%;

}
</style>
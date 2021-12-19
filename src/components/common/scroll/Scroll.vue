<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>

    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
name: 'Scroll',
props: {
probeType: {
  type: Number,
  default: 0
},
pullUpLoad: {
  type: Boolean,
  default: false
}
},
data() {
  return {
    scroll: null
  }
},
mounted() {
  // 1. 创建Bscroll对象
  this.scroll = new Bscroll(this.$refs.wrapper, {
    observeDOM: true,
    click: true,
    probeType: this.probeType,
    pullUpLoad: this.pullUpLoad
  })
  // 2. 监听滚动的位置 并把滚动值传出
  this.scroll.on('scroll', (position) => {
    // console.log(position);
    this.$emit('scroll', position)
  })
  // 3. 监听上拉加载更多事件 并传出
    this.scroll.on('pullingUp', () => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
},
methods: {
  scrollTo(x, y, time=500) {
    this.scroll && this.scroll.scrollTo(0, 0, time)
  },
  finishPullUp() {
    this.scroll.finishPullUp
  },
  refresh() {
    // console.log('------');
    this.scroll && this.scroll.refresh()
  },
  getscrollY() {
    return this.scroll ? this.scroll.y : 0
  }
},
}
</script>

<style>

</style>
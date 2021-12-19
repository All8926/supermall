<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      ref="tabControl1"
      @tabclick="tabclick"
      class="tab-control"
      v-show="isTabFixed"
    >
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        ref="tabControl2"
        @tabclick="tabclick"
      >
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"></back-top>
    <!-- 加上native修饰符，才能给组件添加点击事件 -->
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

// 导入数据
import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin, backTopMixin} from "components/common/mixin"


export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin, backTopMixin],

  data() {
    // 保存 res 里面的指定数据
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      tabOffsetTop: 619,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    console.log("11111");
  },
  // 记录回到当前页面后的状态
  activated() {
    this.$refs.scroll.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh(); // 进行一次刷新
  },
  // 记录离开当前页面后的状态
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getscrollY();
    // 取消全局事件的监听
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {

  },

  methods: {
    /**
     * 事件监听相关的方法
     */
    tabclick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // console.log(position);
      // 屏幕滚动距离大于1000时显示返回顶部按钮
      this.isShowBackTop = -position.y >= this.tabOffsetTop;
      // 决定 tabControl 是否吸顶(固定定位)
      this.isTabFixed = -position.y > 1000;
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
    },

    // 2. 获取组件tabControl 的offsetTop
    // 所有的组件都有一个属性$el，用于获取组件中的元素
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },

    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        // 拿到 res 里面的指定数据并添加到banners里
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 把数据添加到goods里
        this.goods[type].list.push(...res.data.list),
          (this.goods[type].page += 1);

        this.$refs.scroll.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0; */
}
.tab-control {
  position: relative;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>;

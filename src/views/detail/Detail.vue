<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      :pull-up-load="true"
      ref="scroll"
      @scroll="contentScroll"
      :pprobe-type="3"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart='addToCart' />
    <back-top @click.native="backclick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "components/common/utils";
import { itemListenerMixin, backTopMixin } from "components/common/mixin";

import {mapActions} from 'vuex'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin, backTopMixin],

  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemTopY: null,
      currentIndex: 0,
      isTabFixed: false,

    };
  },
  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;
    // 2. 根据iid 请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1. 获取顶部轮播图数据
      this.topImages = data.itemInfo.topImages;
      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3. 获取店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4. 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5. 获取商品参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6. 获取评论信息
      if (data.rate.cRat !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.$nextTick(() => {
        //     // 根据最新的数据，对应的DOM是已经被渲染出来，但是图片是没有加载完
        //     this.themeTopYs = []
        //  this.themeTopYs.push(0)
        //  this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //  this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //  this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //  console.log(this.themeTopYs);
      });
    });
    // 2. 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    // 给getThemTopY赋值，给themeTopYs赋值的操作进行防抖
    this.getThemTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // 给数组最后添加一个无穷大的值
      // console.log(this.themeTopYs);
    }, 200);
  },
  methods: {
    ...mapActions(['addCart']),

    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.getThemTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 当滚动屏幕的值到达themeTopYs中某一个值是改变nav-bar中字体的颜色
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (
        //   i === length -1 && positionY >= this.themeTopYs[i]
        // ))) {
        //   this.currentIndex = i
        //   // console.log(this.currentIndex);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }
      this.isShowBackTop = positionY > 1000;
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 2. 将商品添加到购物车里
      // this.$store.commit('addCart', product)
      this.addCart(product).then(res => {      // 用映射 mapActions
        // console.log(res);
        this.$toast.show(res, 2000)
      })

      // this.$store.dispatch('addCart', product).then(res => {
      //   console.log(res);
      // })
      // console.log(product);
    }
   
  },

  mounted() {},
  // 取消全局事件的监听

};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  position: relative;
  height: calc(100% - 44px - 50px);
  overflow: hidden;
}
</style>
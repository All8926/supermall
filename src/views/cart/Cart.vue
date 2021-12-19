<template>
<div class="cart">
  <!-- 导航 -->
  <nav-bar class="cart-bar">
    <div slot="center">购物车({{cartLength}})</div>
  </nav-bar>

  <!-- 商品的列表 -->
  <cart-list/>

  <!-- 底部结算汇总 -->
  <carrt-bottom-bar/>
</div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from '../detail/childComps/CartList.vue'
import CarrtBottomBar from '../detail/childComps/CarrtBottomBar.vue'


import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
  components: {
    NavBar,
    CartList,
    CarrtBottomBar,
  },
  computed: {
    ...mapGetters(['cartLength'])
  }
  }
</script>

<style scoped>
.cart{
  height: 100vh;
  /* overflow: hidden; */
}
.cart-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>

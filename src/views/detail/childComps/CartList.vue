<template>
  <div class="cart-list">
    <scroll class="centent" ref="scroll" :pull-up-load="true">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    this.$refs.scroll.scroll.refresh();
  },
  methods: {
    pullingUp() {
      this.scroll.on('pullingUp',{})
    }
  },
  // mounted() {
  //    pullUpLoad: false
  // },
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.centent {
  height: 100%;
  overflow: hidden;
}
</style>
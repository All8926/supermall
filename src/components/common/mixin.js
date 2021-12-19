import { debounce } from "components/common/utils";
import BackTop from "components/content/backTop/backTop";
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
    }
  },
  mounted() {
     // 对这个函数进行防抖操作
     const refresh = debounce(this.$refs.scroll.refresh, 200);
     // 对监听的事件进行保存
    this.itemImgListener = () => {
     refresh();
   }
   this.$bus.$on("itemImageItem", this.itemImgListener);
  },
}

// 封装点击返回顶部按钮
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,

      
    }
  },
  methods: {
    backclick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
  },
}
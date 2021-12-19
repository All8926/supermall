<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
      :is-checked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>

    <div class="price">合计: {{ totalPrice }}</div>

    <div class="caculate" @click="calcClick">去结算: ({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CarrtBottomBar",
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) {
        return false;
      }
      //  return this.$store.state.cartList.every(item => item.checked)

      //  普通遍历方法
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true
    },
  },
  methods: {
    checkClick() {
     if(this.isSelectAll){
       this.$store.state.cartList.forEach(item => item.checked = false);
     }else{
       this.$store.state.cartList.forEach(item => item.checked = true);
     }
    },
    calcClick(){
      if(!this.isSelectAll){
     this.$toast.show('请选择商品', 2000)

      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
}
.check-content {
  width: 70px;
  display: flex;
  align-items: center;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 0 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.caculate {
  width: 90px;
  background-color: red;
  color: #eee;
  text-align: center;
}
</style>
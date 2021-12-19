<template>
  <div class="goods-item"  @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsitem.title}}</p>
      <span class="price">￥{{goodsitem.price}}</span>
      <span>❤</span>
      <span class="collect">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
name: "GoodsListItem",
props: {
  goodsitem: {
    type: Object,
    default() {
      return {}
    }
  },
},
computed: {
showImage() {
  return  this.goodsitem.image || this.goodsitem.show.img
}
},
methods: {
    imageLoad(){
      // console.log('imageLoad');
      this.$bus.$emit('itemImageItem')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsitem.iid)
    }
  },
}
</script>

<style scoped>
.goods-item{
  padding-bottom: 10px;
  width: 48%;
}
.goods-item img{
width: 100%;
border-radius: 8px;
}
.goods-item p{
font-size: 14px;
text-overflow:  ellipsis;  
overflow: hidden;  
text-overflow: ellipsis;  
display: -webkit-box;  
-webkit-line-clamp: 2;  
-webkit-box-orient: vertical;
}
.goods-item .price{
display: inline-block;
color: var(--color-high-text);
margin: 5px 10px 0 18px;
}
</style>
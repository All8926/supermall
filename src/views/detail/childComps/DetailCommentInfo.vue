<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span class="color">{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" alt="" v-for="(item, index) in commentInfo.images" :key="index">
      </div> 
    </div>
  </div>
</template>

<script>
import {formatDate} from 'components/common/utils'

export default {
name: 'DetailCommentInfo',
props: {
  commentInfo: {
    type: Object,
    default() {
      return {}
    }
  }
},
filters: {
showDate(value) {
  // 将时间戳转换成Date对象  Date里面以毫秒为单位
  const date = new Date(value * 1000)
  // 将Date进行格式化
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
}
}
}
</script>

<style scoped>
.comment-info {
    padding: 8px 8px 20px;
    border-bottom: solid 4px rgba(100, 100, 100, .1);
}
.info-header {
    padding: 10px 0;
    display: flex; 
    justify-content: space-between; 
    border-bottom: 2px solid rgba(100, 100, 100, .1);
}
.info-user {
    margin-top: 8px;
}
.info-user img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.info-user span {
    position: relative;
    top: -15px;
    left: 8px;
}
.info-detail p {
    padding: 4px;
    text-indent: 2em;
    color: var(--color-text);
}
.info-detail .other {
    color: var(--color-text);
}
.info-detail .other span {
    padding: 4px;
}
.info-detail .comment-img {
    display: flex;
}
.info-imgs img {
    width: 25%;
    padding-right: 6px;
}
</style>
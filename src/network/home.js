import { request } from "./request";

// 封装一个首页轮播图数据
export function getHomeMultidata(){
  return request({
    url:'/home/multidata'
  })
}

// 封装一个首页下面商品的数据
export function getHomeGoods(type, page) {
  return request({
    url:'/home/data',
    params: {

      type, 
      page
    }
  })
}
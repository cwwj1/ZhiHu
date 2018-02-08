<template>
  <div class="share">
    <div class="share-title">分享这篇内容</div>
    <mt-swipe :auto="0">
      <mt-swipe-item>
        <div class="share-item">
          <span class="icon icon-weixinhaoyou"></span>
          <span>微信好友</span>
        </div>
        <div class="share-item">
          <span class="icon icon-weixinpengyouquan"></span>
          <span>微信朋友圈</span>
        </div>
        <div class="share-item">
          <span class="icon icon-QQ"></span>
          <span>QQ</span>
        </div>
        <div class="share-item">
          <span class="icon icon-weibo"></span>
          <span>新浪微博</span>
        </div>
        <div class="share-item">
          <span class="icon icon-fuzhi"></span>
          <span>复制链接</span>
        </div>
        <div class="share-item">
          <span class="icon icon-youdaoyunbiji"></span>
          <span>有道云笔记</span>
        </div>
        <div class="share-item">
          <span class="icon icon-yinxiangbiji"></span>
          <span>印象笔记</span>
        </div>
        <div class="share-item">
          <span class="icon icon-tengxunweibo"></span>
          <span>腾讯微博</span>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="share-item">
          <span class="icon icon-xinxi"></span>
          <span>微信好友</span>
        </div>
        <div class="share-item">
          <span class="icon icon-instapaper"></span>
          <span>微信朋友圈</span>
        </div>
      </mt-swipe-item>
    </mt-swipe>
    <div class="button" @click="toggleCollect">{{this.$store.getters.collectText}}</div>
    <div class="button" @click="cancel">取消</div>  </div>
</template>

<script>
  export default {
    created() {
      this.$store.dispatch('judgeCollectState');
    },
    methods: {
      // 隐藏分享菜单事件
      cancel: function() {
        this.$emit('cancel');
      },
      // 收藏文章
      toggleCollect: function() {
        this.$store.dispatch('toggleCollect');
      }
    }
  }
</script>

<style scoped>
.share{
  width: 100%;
  height: 380px;
  background: #e9e9e9;
  text-align: center;
}
.share .share-title{
  display: block;
  font-size: 18px;
  color: #5a5a5a;
  padding: 10px 0;
}
.share .mint-swipe{
  height: 210px;
  width: 330px;
  margin: 0 auto;
}
.share .mint-swipe .mint-swipe-item{
  display: flex;
  flex-wrap: wrap;
}
.share .mint-swipe .mint-swipe-item .share-item{
  width: 25%;
  height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: #9b9b9b;
}
.share .mint-swipe .mint-swipe-item .share-item .icon{
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 50px;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-weixinhaoyou{
  background: #64c654 url("../assets/images/icon-weixinhaoyou.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-weixinpengyouquan{
  background: #75cd37 url("../assets/images/icon-weixinpengyouquan.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-QQ{
  background: #286bc4 url("../assets/images/icon-QQ.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-weibo{
  background: #ec4226 url("../assets/images/icon-weibo.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-fuzhi{
  background: #dd472c url("../assets/images/icon-fuzhi.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-youdaoyunbiji{
  background: #38a3ea url("../assets/images/icon-youdaoyunbiji.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-yinxiangbiji{
  background: #5db346 url("../assets/images/icon-yinxiangbiji.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-tengxunweibo{
  background: #3ea1d9 url("../assets/images/icon-tengxunweibo.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-xinxi{
  background: #4fe54e url("../assets/images/icon-xinxi.png") center no-repeat;
}
.share .mint-swipe .mint-swipe-item .share-item .icon-instapaper{
  background: #6c6c6c url("../assets/images/icon-instapaper.png") center no-repeat;
}

.share .button{
  width: 330px;
  height: 44px;
  margin: 16px auto;
  line-height: 44px;
  background: #fff;
  color: #949494;
}
</style>

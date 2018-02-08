<template>
  <transition name>
    <div class="welcome" :class="{ hide: isHide }">
      <div class="img-wrap">
        <img src="../assets/images/welcome.jpg" alt="" width="100%" height="100%">
        <span class="author">Kimon&nbsp;&nbsp;Maritz</span>
      </div>
      <div class="text-wrap">
        <div class="logo"></div>
        <div class="text">
          <span class="title">知乎日报</span>
          <span class="bio">每天三次，每次七分钟</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        isHide: false
      }
    },
    created () {
      let isFirstLoad = this.$store.state.isFirstLoad;
      if (isFirstLoad) {
        // 3.5秒后隐藏欢迎界面
        setTimeout(() => {
          this.isHide = true;
        }, 3500);
      } else {
        this.isHide = true;
      }
    }
  }
</script>

<style scoped>
  .welcome{
    position: absolute;
    height: 100%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    color: #fff;
  }
  .welcome .img-wrap{
    position: relative;
  }
  .welcome .img-wrap .author{
    display: block;
    position: absolute;
    bottom: 10px;
    left: 50%;
    margin-left: -46px;
    transform: scale(.85);
  }
  .welcome .text-wrap{
    flex: 0 1 auto;
    display: flex;
    align-items: center;
    height: 100%;
    background: #17181a;
  }
  .welcome .text-wrap .logo{
    width: 40px;
    height: 40px;
    border: 1px solid #fff;
    border-radius: 10px;
    margin: 0 25px 0 25px;
  }
  .welcome .text-wrap .text{
    display: flex;
    flex-direction: column;
  }
  .welcome .text-wrap .text .title{
    margin-bottom: 8px;
    font-size: 20px;
  }
  .welcome .text-wrap .text .bio{
    color: #75757b;
  }

  .hide{
    display: none;
  }
  .welcome::before{
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #000;
    opacity: .25;
    z-index: 10;
  }
</style>

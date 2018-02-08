<template>
  <div class="index">
    <Welcome></Welcome>
    <Sidebar v-if="isShowSidebar" v-on:hideSidebar="toggleSidebar"></Sidebar>
    <div class="main">
      <div class="header">
        <span class="icon-list" @click="toggleSidebar"></span>
        <span class="hot-news">今日热闻</span>
      </div>
      <Swipe></Swipe>
      <NewsList></NewsList>
    </div>
  </div>
</template>

<script>
  import Welcome from '../components/Welcome.vue'
  import Sidebar from '../components/Sidebar.vue'
  import Swipe from '../components/Swipe.vue'
  import NewsList from '../components/NewsList'

  export default {
    components: {
      Welcome,
      Sidebar,
      Swipe,
      NewsList
    },
    data () {
      return {
        isShowSidebar: false
      }
    },
    methods: {
      toggleSidebar () {
        // 侧边栏显示时设置底部列表不能滑动
        let scrollTop;

        if (!this.isShowSidebar) { // 禁止滑动
          scrollTop = document.scrollingElement.scrollTop;
          document.body.style.position = 'fixed';
          document.body.style.top = -scrollTop + 'px';
        } else { // 取消滑动限制
          document.body.style.position = '';
          document.scrollingElement.scrollTop = scrollTop;
        }

        this.isShowSidebar = !this.isShowSidebar
      }
    }
  }
</script>

<style scoped>
  .index .main .header{
    position: fixed;
    width: 100%;
    height: 32px;
    z-index: 2;
    font-size: 22px;
    color: #fff;
    line-height: 32px;
    background: #000;
  }
  .index .main .header .icon-list{
    display: inline-block;
    width:26px;
    height: 26px;
    background: url('../assets/images/icon-list.png') center no-repeat;
    background-size: 26px 26px;
  }
  .index .main .header .hot-news{
    position: absolute;
    width: 88px;
    height: 100%;
    left: 50%;
    top: 0;
    margin-left: -44px;
  }
</style>

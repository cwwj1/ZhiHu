<template>
  <transition name="move">
    <div class="wrap">
      <div class="sidebar">
        <div class="top">
          <img src="../assets/images/avatar.png" alt="" class="avatar">
          <span class="name">程伟佳</span>
        </div>
        <div class="menuBar">
          <div @click="goCollect"><span>收藏</span></div>
          <div><span>消息</span></div>
          <div><span>设置</span></div>
        </div>
        <div class="menuWrapper">
          <ul>
            <li class="menu-item" v-for="item in data" :key="item.id" @click="themeDetail(item.id)">
              <span class="item-text">{{item.name}}</span>
              <span class="icon-more"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mask" @click="hideSidebar"></div>
    </div>
  </transition>
</template>

<script>
  import axios from 'axios'
  import router from '../router';

  export default {
    data () {
      return {
        data: []
      }
    },
    created () {
      axios.get('api/themes')
        .then( response => {
        this.data = response.data.others;


        this.data.unshift({
          color: 0,
          thumbnail: '',
          description: '首页',
          id: -1,
          name: '首页'
        })

      })
      .catch ( error => {
        console.log(error)
      })
    },
    methods: {
      hideSidebar () {
        this.$emit('hideSidebar')
      },
      // 跳转主题详情页
      themeDetail(id) {
        if (id === -1) { // 首页
          this.hideSidebar();
        } else { // 不是首页
          this.$store.dispatch('changeCurrentThemeId', id);
          router.push({ name: 'themeDetail', params: { id: id } });
        }
      },
      // 跳转收藏页
      goCollect() {
        router.push({ name: 'collect' });
      }
    }
  }
</script>

<style scoped>
  .move-enter-active, .move-leave-active {
     transition: all .3s ease-out;
     transform: translate3d(0, 0, 0);
     opacity: 1;
   }
  .move-enter, .move-leave-active {
     transform: translate3d(-100%, 0, 0);
     opacity: 0;
   }
  .wrap{
    z-index: 10;
  }
  .wrap .sidebar{
    position: fixed;
    width: 60%;
    height: 100%;
    background: #232a30;
    z-index: 12;
    color: #94999d;
    display: flex;
    flex-direction: column;
  }
  .wrap .sidebar .top{
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
  }
  .wrap .sidebar .top .avatar{
    width: 36px;
    border-radius: 50%;
    line-height: 36px;
    margin-right: 12px;
  }
  .wrap .sidebar .menuBar{
    height: 60px;
    display: flex;
    margin-bottom: 10px;
  }
  .wrap .sidebar .menuBar div{
    width: 33.3%;
    text-align: center;
    line-height: 1.2;
  }
  .wrap .sidebar .menuBar div span{
    transform: scale(.75);
    display: inline-block;
  }
  .wrap .sidebar .menuWrapper{
    padding: 0 20px;
    flex: auto;
    overflow: auto;
  }
  .wrap .sidebar .menuWrapper ul{
    padding: 0;
  }
  .wrap .sidebar .menuWrapper ul .menu-item{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }
  .wrap .sidebar .menuWrapper ul .menu-item .item-text{
    display: inline-block;
  }
  .wrap .sidebar .menuWrapper ul .menu-item .icon-more{
    display: inline-block;
    vertical-align: top;
    width:14px;
    height: inherit;
    float: right;
    background: url('../assets/images/icon-more.png') center no-repeat;
    background-size: 14px 14px;
  }

  .wrap .mask{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
    z-index: 11;
  }
</style>

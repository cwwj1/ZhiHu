<template>
  <div class="news-menu">
    <ul class="menu-wrap">
      <li class="menu-item" @click="goBack">
        <span class="icon-back"></span>
      </li>
      <li class="menu-item" @click="goNext">
        <span class="icon-next"></span>
      </li>
      <li class="menu-item" @click="thumbUp">
        <span class="icon-good" :class="{'icon-good-active': isDianzan}"></span>
        <span class="dianzan-number">{{this.$store.state.popularity}}</span>
      </li>
      <li class="menu-item" @click="showMenu">
        <span class="icon-share"></span>
      </li>
      <li class="menu-item" @click="showComment">
        <span class="icon-comment"></span>
        <span class="comments-number">{{this.$store.state.comments}}</span>
      </li>
    </ul>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <Share @cancel="hideMenu"></Share>
    </mt-popup>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router/index'
  import Share from './Share'

  export default {
    data () {
      return {
        isDianzan: false,   // 是否已点赞
        popupVisible: false // 分享组件是否展示
      }
    },
    components: {
      Share
    },
    created () {
      this.fetchStoryExtra();
    },
    watch: {
      // 如果路由有变化，会再次执行方法
      '$route': 'reloadId'
    },
    methods: {
      // 获取新闻额外信息
      fetchStoryExtra: function() {
        axios.get('api/story-extra/' + this.$store.state.id)
          .then(response => {
          this.$store.state.long_comments = response.data.long_comments;
        this.$store.state.popularity = response.data.popularity;
        this.$store.state.short_comments = response.data.short_comments;
        this.$store.state.comments = response.data.comments;
        })
      },
      // 返回上一页事件
      goBack: function() {
        let type = this.$store.state.newsType;
        if (type === 0) {
          router.push({ name: 'index' });
        } else if (type === 1) {
          let currentThemeId = this.$store.state.currentThemeId;
          router.push({ name: 'themeDetail', params: { id: currentThemeId } });
        } else if (type === 2) {
          router.push({ name: 'collect' });
        }
      },
      // 载入下一篇新闻
      goNext () {
        router.push({ name: 'newsDetail', params: { id: this.$store.state.nextId } });
      },
      // 点赞事件
      thumbUp () {
        if (!this.isDianzan) {
          this.$store.state.popularity++;
        } else {
          this.$store.state.popularity--;
        }
        this.isDianzan = !this.isDianzan;
      },
      // 展示分享菜单事件
      showMenu: function() {
        this.popupVisible = true;
      },
      // 隐藏分享组件
      hideMenu: function() {
        this.popupVisible = false;
      },
      reloadId () {
        this.$emit('reloadId');
        this.fetchStoryExtra();
      },
      showComment () {
        router.push({ name: 'comment', params: { id: this.$store.state.id } });
      }
    }
  }
</script>

<style scoped>
  .news-menu{
    position: fixed;
    width: 100%;
    height: 44px;
    left: 0;
    bottom: 0;
  }
  .news-menu .menu-wrap{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0;
    text-align: center;
    line-height: 44px;
    border-top: 1px solid #f5f5f5;
    background: #fff;
  }
  .news-menu .menu-wrap .menu-item{
    position: relative;
    width: 20%;
  }
  .news-menu .menu-wrap .menu-item span{
    display: inline-block;
    width: 24px;
    height:24px;
    background-size: 24px 24px;
  }
  .news-menu .menu-wrap .menu-item .icon-back{
    background: url("../assets/images/icon-back.png") center no-repeat;
  }
  .news-menu .menu-wrap .menu-item .icon-next{
     background: url("../assets/images/icon-next.png") center no-repeat;
   }
  .news-menu .menu-wrap .menu-item .icon-good{
    background: url("../assets/images/icon-good.png") center no-repeat;
  }
  .news-menu .menu-wrap .menu-item .dianzan-number{
    position: absolute;
    top: 8px;
    right: 6px;
    width: 24px;
    height: 14px;
    font-size: 12px;
  }
  .news-menu .menu-wrap .menu-item .icon-good-active{
     background: url("../assets/images/icon-good-active.png") center no-repeat;
   }
  .news-menu .menu-wrap .menu-item .icon-share{
    background: url("../assets/images/icon-share.png") center no-repeat;
  }
  .news-menu .menu-wrap .menu-item .icon-comment{
    background: url("../assets/images/icon-comment.png") center no-repeat;
  }
  .news-menu .menu-wrap .menu-item .comments-number{
    position: absolute;
    top: 8px;
    right: 6px;
    width: 24px;
    height: 14px;
    font-size: 12px;
  }

  .news-menu .mint-popup{
    width: 100%;
  }
</style>

<template>
  <div class="theme-detail">
    <header>
      <img v-lazy="attachImageUrl(data.image)" alt="">
      <span class="icon-back" @click="backIndex"></span>
      <span class="title">{{data.name}}</span>
    </header>
    <div class="editors" @click="showEditors()">
      <span class="text">主编</span>
      <img v-for="item in data.editors" v-lazy="attachImageUrl(item.avatar)" alt="">
      <span class="icon-more"></span>
    </div>
    <ul class="list" ref="list">
      <li class="list-item" v-for="story in data.stories" :key="story.id" @click="viewDetail(story.id)">
        <span class="item-title">{{story.title}}</span>
        <div class="image-wrapper" v-if="story.images !== undefined">
          <img class="item-image" v-lazy.list="attachImageUrl(story.images[0])" :alt="story.title">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import router from '../router';
  import axios from 'axios';

  export default {
    data() {
      return {
        id: '',
        data: {},
        editorIds: [],
        isFocus: true
      };
    },
    created () {
      this.id = this.$route.params.id;
      this.fetchData();
    },
    methods: {
      // 获取指定id主题下的数据
      fetchData () {
        axios.get('api/theme/' + this.id)
          .then( response => {
          this.data = response.data;
          this.data.editors.map((item) => {
            this.editorIds.push(item.id);
          });
        })
      },
      // 跳转到对应id的文章详情页
      viewDetail: function(id) {
        this.$store.dispatch('changeCurrentNewsId', id);
        this.$store.dispatch('changeNewsType', 1);
        router.push({ name: 'newsDetail', params: { id: id } });
      },
      // 修改图片链接
      attachImageUrl: function(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      // 返回首页
      backIndex() {
        router.push({ name: 'index' });
      },
      // 查看编辑列表
      showEditors() {
        router.push({ name: 'editorsList', params: { themeId: this.id } });
      }
    }
  }
</script>

<style>
  header{
    height: 45px;
    position: relative;
    color: #fff;
    line-height: 45px;
    text-align: center;
    font-size: 20px;
  }
  header img{
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: -1;
    filter: blur(2px);
  }
  header .icon-back{
    display: inline-block;
    width: 24px;
    height: 24px;
    margin: 0 10px;
    float: left;
    background: url("../assets/images/icon-back.png") center no-repeat;
  }

  .editors{
    height: 45px;
    padding: 0 15px;
    line-height: 45px;
    color: #585858;
    border-bottom: 1px solid #e5e5e5;
  }
  .editors img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 15px;
    margin-bottom: 5px;
  }
  .editors .icon-more{
    display: inline-block;
    width: 24px;
    height: 24px;
    float: right;
    background: url("../assets/images/icon-more.png") center no-repeat;
  }

  .list{
    padding: 0;
  }
  .list .list-item{
    height: 90px;
    margin: 0 15px;
    border-bottom: 1px solid #f5f5f5;
  }
  .list .list-item .item-title{
    display: inline-block;
    width: 70%;
    padding-top: 15px;
    line-height: 20px;
  }
  .list .list-item .image-wrapper{
    position: relative;
    float: right;
    padding-top: 15px;
  }
  .list .list-item .image-wrapper .item-image{
    width: 75px;
    height: 60px;
  }
</style>

<template>
  <div class="editors-list">
    <header>
      <span class="icon-back" @click="back"></span>
      <span class="text">主编</span>
    </header>
    <ul class="list" ref="editorList">
      <li class="item" v-for="item in data" @click="viewEditorProfile(item.id, item.name)">
        <div class="wrap">
          <img v-lazy.editorList="attachImageUrl(item.avatar)" alt="">
          <span class="name">{{item.name}}</span>
          <span class="bio">{{item.bio}}</span>
          <span class="icon-more"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';

  export default {
    data() {
      return {
        data: []
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      // 获取指定id主题下的编辑信息
      fetchData() {
        axios.get('api/theme/' + this.$route.params.id)
          .then(response => {
          this.data = response.data.editors;
        });
      },
      // 返回上一页
      back() {
        router.go(-1);
      },
      // 修改图片链接
      attachImageUrl: function(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      // 跳转查看编辑详情页
      viewEditorProfile(id, name) {
        router.push({ name: 'editor', params: { editorId: id, editorName: name } });
      }
    }
  }
</script>

<style>
  header{
    position: fixed;
    width: 100%;
    height: 40px;
    z-index: 2;
    font-size: 20px;
    color: #fff;
    line-height: 40px;
    background: #1ba3ea;
  }
  header .icon-back{
    display: inline-block;
    width: 26px;
    height: 26px;
    background: url("../assets/images/icon-back.png") center no-repeat;
    padding: 0 15px;
  }
  header .text{
    position: absolute;
    width: 44px;
    height: 100%;
    left: 50%;
    top: 0;
    margin-left: -22px;
  }

  .list{
    padding-top: 40px;
    padding-left: 0;
  }
  .list .item{
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #ebebeb;
  }
  .list .item .wrap{
    position: relative;
    padding: 0 15px;
    height: 100%;
    line-height: 50px;
  }
  .list .item .wrap img{
    position: absolute;
    top: 50%;
    left: 20px;
    margin-top: -17.5px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .list .item .wrap .name{
    position: absolute;
    top: -6px;
    left: 70px;
    font-size: 16px;
  }
  .list .item .wrap .bio{
    position: absolute;
    top: 14px;
    left: 70px;
    font-size: 12px;
    color: #b0b0b0;
    letter-spacing: 2px;
  }
  .list .item .wrap .icon-more{
    position: absolute;
    top: 0;
    right: 15px;
    display: inline-block;
    width: 26px;
    height: 26px;
    background: url("../assets/images/icon-more.png") center no-repeat;
  }
</style>

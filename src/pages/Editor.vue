<template>
  <div class="editor">
    <header>
      <span class="icon-back" @click="back"></span>
      <div class="text">{{this.$route.params.editorName}}</div>
      <div class="box"></div>
    </header>
    <div class="html-content" v-html="this.data"></div>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router';

  export default {
    data() {
      return {
        data: '',
        html: ''
      };
    },
    methods:{
      // 获取指定id主题下的编辑信息
      fetchData() {
        axios.get('api/editor/' + this.$route.params.editorId + '/profile-page/ios')
          .then(response => {
          response.data = this.attachBodyContent(response.data);
          this.data = response.data;
        console.log(this.data)
        });
      },
      // 返回上一页
      back() {
        router.go(-1);
      },
      // 修改返回数据中的body中的图片链接
      attachBodyContent: function(body) {
        return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
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
    display: flex;
    justify-content: space-between;
  }
  header .icon-back{
    display: inline-block;
    width: 26px;
    height: 26px;
    padding: 0 15px;
    background: url("../assets/images/icon-back.png") center no-repeat;
  }
  header .text{
    height: 100%;
  }
  header .box{
    height: 100%;
    width: 56px;
  }

  .html-content{
    padding-top: 40px;
  }
</style>

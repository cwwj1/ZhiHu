<template>
  <div class="news-detail">
    <div class="top-wrapper" v-if="this.$store.state.newsType === 0">
      <img v-lazy="attachImageUrl(this.data.image)" :alt="this.data.title">
      <span class="top-title">{{data.title}}</span>
      <span class="image-source">图片：{{this.data.image_source}}</span>
    </div>
    <div class="body-wrap" v-html="this.data.body"></div>
    <NewsMenu @reloadId="fetchData"></NewsMenu>
  </div>
</template>

<script>
  import axios from 'axios';
  import NewsMenu from '../components/NewsMenu';

  export default {
    components: {
      NewsMenu
    },
    data () {
      return {
        data: {}
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData: function () {
        // 获取路由参数上的id新闻具体内容
        let id = this.$route.params.id;
        console.log(id);
        axios.get('api/news/' + id)
          .then( response => {
          response.data.body = this.attachBodyContent(response.data.body);
        this.data = response.data;
        })
        this.$store.dispatch('changeCurrentNewsId', id);
        this.$store.dispatch('changeCurrentNewsId', id);
      },
      // 修改图片链接
      attachImageUrl: function(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      // 修改返回数据中的body中的图片链接
      attachBodyContent: function(body) {
        return body.replace(/src="http\w{0,1}:\/\//g, 'src="https://images.weserv.nl/?url=');
      }
    }
  }
</script>

<style scoped>
  .news-detail .top-wrapper{
    height: 200px;
    position: relative;
    overflow-y: hidden;
    z-index: 99;
  }
  .news-detail .top-wrapper img{
    position: absolute;
    bottom: -75px;
    width: 100%;
  }
  .news-detail .top-wrapper .top-title{
    position: absolute;
    top: 90px;
    padding: 30px 20px;
    line-height: 25px;
    color: #fff;
    font-size: 22px;
  }
  .news-detail .top-wrapper .image-source{
    position: absolute;
    right: 8px;
    bottom: 10px;
    font-size: 12px;
    color: #ccc;
  }
  .news-detail .body-wrap{
    position: absolute;
    width: 100%;
    top: 0;
    padding-bottom: 44px;
  }
</style>

<template>
  <div class="swipe">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="topStory in topStories" :key="topStory.id">
        <img :src="attachImageUrl(topStory.image)" :alt="topStory.title"/>
        <span class="top-story-title">{{topStory.title}}</span>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        topStories: {}
      }
    },
    created () {
      //获取最热新闻
      axios.get('api/news/latest')
        .then( response => {
          this.topStories = response.data.top_stories;
          console.log(this.topStories)
        })
    },
    methods: {
      //修改图片链接
      attachImageUrl: function (srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      }
    }
  }
</script>

<style>
  .swipe{
    height: 220px;
    color: #fff;
    font-size: 20px;
  }
  .swipe img{
    position: absolute;
    bottom: -75px;
    width: 100%;
  }
  .swipe .top-story-title{
    position: absolute;
    z-index: 2;
    bottom: 0;
    padding: 30px 20px;
    line-height: 25px;
  }
</style>

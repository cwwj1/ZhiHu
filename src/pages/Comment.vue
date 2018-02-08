<template>
  <div class="comment">
    <div class="head">{{this.$store.state.comments}}条点评</div>
    <long-comment></long-comment>
    <short-comment></short-comment>
    <div class="foot">
      <span class="icon icon-back" @click="backToDetail"></span>
      <span class="icon icon-bianxie" @click="writeComment">写评论</span>
    </div>
  </div>
</template>

<script>
  import router from '../router';
  import LongComment from '../components/LongComment';
  import ShortComment from '../components/ShortComment';

  export default {
    methods: {
      // 返回文章详情
      backToDetail() {
        router.go(-1);
      },
      // 写点评
      writeComment() {
        router.push({ name: 'writeComment', params: { id: this.$store.state.id } });
      }
    },
    components: {
      'long-comment': LongComment,
      'short-comment': ShortComment
    }
  }
</script>

<style scoped>
  .comment .head{
    position: fixed;
    top: 0;
    width: 100%;
    height: 40px;
    background: #1ba3ea;
    color: #fff;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .comment .foot{
    position: fixed;
    display: flex;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: #3c3c3c;
  }
  .comment .foot .icon-back{
    display: inline-block;
    flex: 0 0 50px;
    border-right: 1px solid #505050;
    line-height: 40px;
    background: url("../assets/images/icon-back.png") center no-repeat;
  }
  .comment .foot .icon-bianxie{
    flex: 1 1 auto;
    color: #d3d3d3;
    font-size: 16px;
    text-align: center;
    line-height: 40px;
  }
</style>

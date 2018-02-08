<template>
  <div class="write-comment">
    <div class="header">
      <span class="icon-back" @click="backToComment"></span>
      <span class="header-text">写点评</span>
      <span class="header-release" @click="release">发布</span>
    </div>
    <div class="warning-text">
      不友善言论会被删除，深度讨论会被优先展示
    </div>
  </div>
</template>

<script>
  import router from '../router';
  export default {
    methods: {
      // 返回评论
      backToComment() {
        router.go(-1);
      },
      // 发布评论
      release() {
        alert('发布评论');
      }
    }
  };
</script>

<style>
  .header{
    height: 45px;
    background: #1ba3ea;
    display: flex;
    justify-content: space-between;
    text-align: center;
    line-height: 45px;
    color: #fff;
    padding-right: 10px;
  }
  .header .icon-back{
    display: inline-block;
    width: 45px;
    background: url("../assets/images/icon-back.png") center no-repeat;
  }
  .header .header-text{
    font-size: 22px;
  }
  .header .header-release{
    font-size: 18px;
  }
  .warning-text{
    font-size: 18px;
    color: #d8d8d8;
    padding: 15px;
    letter-spacing: 3px;
  }
</style>

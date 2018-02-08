<template>
  <div class="short-comment">
    <div class="short-comment-number" v-show="this.comments.length !== 0" @click="toggleShortComment">
      {{this.$store.state.short_comments}}条短评
    </div>
    <ul class="comment-list" ref="shortCommentList">
      <li class="comment-item" v-for="comment in this.comments">
        <img v-lazy.shortCommentList="attachImageUrl(comment.avatar)" :alt="comment.author" class="avatar">
        <div class="comment-content">
          <span class="author">{{comment.author}}</span>
          <p class="text">{{comment.content}}</p>
          <template v-if="comment.reply_to !== undefined">
            <p class="reply" >
              <span class="reply-author">//{{comment.reply_to.author}}:</span>
              {{comment.reply_to.content}}
            </p>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data () {
      return {
        comments: [],
        isShow: false  // 是否展开短评
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      // 获取短评数据
      fetchData() {
        axios.get('api/story/' + this.$store.state.id + '/short-comments')
          .then(response => {
          this.comments = response.data.comments;
          console.log("短评"+this.comments);
        })
      },
      // 修改图片链接
      attachImageUrl: function(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      },
      // 切换短评展示
      toggleShortComment: function() {
        this.isShow = !this.isShow;
        // let top = document.body.clientHeight - 43;
        // console.log(top);
      }
    }
  }
</script>

<style scoped>
  .short-comment{
    padding-bottom: 40px;
  }
  .short-comment .short-comment-number{
    font-size: 16px;
    color: #333;
    line-height: 1.5em;
    font-weight: 700;
    border-bottom: 1px solid #eee;
    margin: 0;
    padding: 9px 20px;
  }
  .short-comment .comment-list{
    padding: 0;
  }
  .short-comment .comment-list .comment-item{
    display: flex;
    font-size: 15px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding: 20px;
  }
  .short-comment .comment-list .comment-item .avatar{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .short-comment .comment-list .comment-item .comment-content{
    flex: 1;
    padding-left: 10px;
  }
  .short-comment .comment-list .comment-item .comment-content .author{
    font-size: 19px;
    color: #000;
    font-weight: 400;
  }
  .short-comment .comment-list .comment-item .comment-content .text{
    margin: 10px 0 !important;
    line-height: 18px;
  }
  .short-comment .comment-list .comment-item .comment-content .reply{
    margin: 10px 0 !important;
    color: #929292;
    line-height: 18px;
  }
  .short-comment .comment-list .comment-item .comment-content .reply .reply-author{
    color: #000;
  }
</style>

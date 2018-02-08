<template>
  <div class="long-comment">
    <div class="box"></div>
    <div class="long-comment-number" v-show="this.comments.length !== 0">{{this.$store.state.long_comments}}条长评</div>
    <ul class="comment-list">
      <li class="comment-item" v-for="comment in this.comments">
        <img v-lazy.longCommentList="attachImageUrl(comment.avatar)" :alt="comment.author" class="avatar">
        <div class="comment-content">
          <span class="author">{{comment.author}}</span>
          <span class="icon-dianzan">{{comment.likes}}</span>
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
    data() {
      return {
        comments: []
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      // 获取长评数据
      fetchData () {
        axios.get('api/story/' + this.$store.state.id + '/long-comments')
          .then( response => {
          this.comments = response.data.comments;
        console.log(this.comments);
        })
      },
      // 修改图片链接
      attachImageUrl: function(srcUrl) {
        if (srcUrl !== undefined) {
          return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
        }
      }
    }
  }
</script>

<style scoped>
  .long-comment .box{
    width: 100%;
    height: 40px;
  }
  .long-comment .long-comment-number{
    font-size: 16px;
    color: #333;
    line-height: 1.5em;
    font-weight: 700;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin: 0;
    padding: 9px 20px;
  }
  .long-comment .comment-list{
    padding: 0;
  }
  .long-comment .comment-list .comment-item{
    display: flex;
    font-size: 15px;
    color: #666;
    border-bottom: 1px solid #eee;
    padding: 20px;
  }
  .long-comment .comment-list .comment-item .avatar{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .long-comment .comment-list .comment-item .comment-content{
    flex: 1;
    padding-left: 10px;
  }
  .long-comment .comment-list .comment-item .comment-content .author{
    font-size: 19px;
    color: #000;
    font-weight: 400;
  }
  .long-comment .comment-list .comment-item .comment-content .icon-dianzan{
    display: inline-block;
    width: 24px;
    height:24px;
    background-size: 24px 24px;
    background: url("../assets/images/icon-good.png") center no-repeat;
    float: right;
  }
  .long-comment .comment-list .comment-item .comment-content .text{
    margin: 10px 0 !important;
    line-height: 18px;
  }
  .long-comment .comment-list .comment-item .comment-content .reply{
    margin: 10px 0 !important;
    color: #929292;
    line-height: 18px;
  }
  .long-comment .comment-list .comment-item .comment-content .reply .reply-author{
    color: #000;
  }

</style>

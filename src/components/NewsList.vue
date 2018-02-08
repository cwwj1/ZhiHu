<template>
  <div class="newsList">
    <div v-for="(items, index) in newsList">
      <div class="date">{{showDay(index)}}</div>
      <div class="list" >
        <ul>
          <li class="list-item" v-for="item in items" @click="viewDetail(item.id)">
            <span class="text">{{item.title}}</span>
            <img :src="attachImageUrl(item.images[0])" class="image"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="infinite-scroll" v-show="loading">
      <svg class="loader-circular" viewBox="25 25 50 50">
        <circle class="loader-path" cx="50" cy="50" r="20" fill="none" stroke="rgb(53, 157, 218)" stroke-width="5"></circle>
      </svg>
      <span class="infinite-scroll-text">{{tips}}</span>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import router from '../router/index'

  export default {
    data () {
      return {
        newsList: [],
        date: [],
        todayDate: '',
        REQUIRE: true,
        loading: false,
        tips: '努力加载中...'
      }
    },
    created () {
      // 判断是否是第一次进入首页
      if (this.$store.state.isFirstLoad) {
        /*this.fetchData();*/
        this.$store.dispatch('changeLoadState');
      }
      this.fetchData();
    },
    mounted () {
      // 添加滚动事件，检测滚动到页面底部
      window.addEventListener('scroll', this.scrollBottom)
    },
    methods: {
      fetchData() {
        // 获取今日新闻
        axios.get('http://zhihuapi.herokuapp.com/api/4/news/latest')
          .then( (res) => {
          this.newsList.push(res.data['stories'])
          this.date.push(res.data['date']);
          this.todayDate = res.data['date'];

          let stories = res.data.stories;
          let ids = stories.map(story => story.id);
          this.$store.dispatch('addNews', {
            stories: stories,
            ids: ids
          });
        })
      },
      scrollBottom() {
        // 滚动到页面底部时，请求前一天的文章内容
        if (((window.screen.height + document.body.scrollTop) > (document.body.clientHeight)) && this.REQUIRE) {
          // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
          this.REQUIRE = false;
          this.loading = true;
          this.tips = '努力加载中...';
          axios.get('http://zhihuapi.herokuapp.com/api/4/news/before/' + this.todayDate).then((res) => {
            this.newsList.push(res.data['stories']);
          this.date.push(res.data['date']);
          this.todayDate = res.data['date'];
          // 请求的数据加载完成后，再次滚动到底部时，允许请求前一天数据
          this.$nextTick(() => {
            this.REQUIRE = true;
            this.loading = false;
          });
        }).catch(() => {
            this.tips = '连接失败，请稍后重试';
          // 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
          this.REQUIRE = true;
        });
        }
      },
      showDay (index) {
        if (index === 0) {
          return '今日新闻'
        } else {
          return this.getToday(index)
        }
      },
      getToday (index) {
        let year = this.date[index].slice(0, 4);
        let month = this.date[index].slice(4, 6);
        let day = this.date[index].slice(6);
        let today = new Date(year + '/' + month + '/' + day);
        let week = ['日', '一', '二', '三', '四', '五', '六'];
        return month + '月' + day + '日' + ' 星期' + week[today.getDay()];
      },
      attachImageUrl (srcUrl) {
        if (srcUrl !== undefined) {
          return 'http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=' + srcUrl.slice(0, 4) + srcUrl.slice(5);
        }
      },
      // 跳转到对应id的文章详情页
      viewDetail (id) {
        this.$store.dispatch('changeCurrentNewsId', id);
        this.$store.dispatch('changeNewsType', 0);
        router.push({ name: 'newsDetail', params: { id: id } });
      }
    }
  }
</script>

<style scoped>
  .newsList{
    width: 100%;
    background: rgba(240, 240, 240, 0.8);
  }
  .newsList .date{
    height: 40px;
    padding-left: 20px;
    line-height: 40px;
    font-size: 14px;
    color: rgba(12, 12, 12, 0.9);
  }
  .newsList .list{
    margin: 0 10px;
  }
  .newsList .list .list-item{
    display: flex;
    width: 100%;
    margin-bottom: 8px;
    padding: 14px 14px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #ccc;
  }
  .newsList .list .list-item .text{
    flex: 1;
    padding-right: 10px;
    font-size: 18px;
    line-height: 22px;
  }
  .newsList .list .list-item .image{
    flex: 0 0 auto;
    height: 75px;
  }
  .newsList .infinite-scroll{
    position: relative;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .newsList .infinite-scroll .loader-circular{
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    animation: rotate 2s linear infinite;
  }
  .newsList .infinite-scroll .loader-circular .loader-path{
    animation: dash 1.5s linear infinite;
  }
  .newsList .infinite-scroll .infinite-scroll-text{
    margin-left: 10px;
    font-size: 16px;
  }
</style>

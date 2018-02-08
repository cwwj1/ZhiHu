// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';

import store from './vuex/store';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

// 使用vue-lazyload
Vue.use(VueLazyload, {
  preload: 1.3,
  loading: '../static/loading.gif',
  attempt: 1,
  listenEvents: [ 'scroll' ]
});

// 使用 MintUI
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

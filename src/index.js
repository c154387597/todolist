import Vue from 'vue';
import VueRouter from 'vue-router';
import createRouter from './router/index';
import App from './App';

Vue.use(VueRouter);

const router = createRouter();

new Vue({
  router,
  render: h => h(App)
}).$mount('#demo')

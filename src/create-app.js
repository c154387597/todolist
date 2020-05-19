import Vue from 'vue';
import VueRouter from 'vue-router';
// 处理头标签
import Meta from 'vue-meta';
import App from './app.vue';
import createRouter from './router';

Vue.use(VueRouter);
Vue.use(Meta);

export default () => {
  const router = createRouter();

  const app = new Vue({
    router,
    render: h => h(App)
  });

  return { app, router };
}

import Vue from 'vue';
import App from './App.vue';
import createRouter from './router/index';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const router = createRouter();

const app = new Vue({
  router,
  render: h => h(App)
});

export default context => {
  return new Promise((resolve, reject) => {
    router.push(context.url);
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (matchedComponents.length === 0) {
        return reject(new Error(`new component matched`));
      }
      resolve(app);
    });
  })
}

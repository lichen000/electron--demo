import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/pages/mainpage';

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/',
          redirect: '/main'
      },
    {
      path: '/main',
      component: MainPage
    }
  ]
})

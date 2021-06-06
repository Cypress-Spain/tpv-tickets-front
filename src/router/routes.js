import Vue from 'vue';
import Router from 'vue-router';
import storage from '../persistence';

import Main from '@/views/Main.vue';
import Login from '@/views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        public: true,
        onlyWhenLoggedOut: true,
      },
    },
    {
      path: '/',
      name: 'admin',
      component: Main,
    },
  ],
});

const { getToken } = storage('cookieStorage');

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const loggedIn = !!getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: '/login',
      // query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
    });
  }

  if (loggedIn && onlyWhenLoggedOut) {
    return next('/');
  }

  return next();
});

export default router;

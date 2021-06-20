import { doLogin } from '@/api';
import storage from '@/persistence';
import router from '@/router/routes';
import { NOTIFICATION_LOGIN } from '../notificationTypes';


const { setItem } = storage('cookieStorage');

export default {
  async login({ commit, dispatch }, payload) {
    return doLogin(payload)
      .then(({ data }) => {
        setItem('session_token', data.jwt);
        router.push('/').catch(() => {});
      })
      .catch(() => dispatch('sendError', { title: NOTIFICATION_LOGIN.error.title, text: NOTIFICATION_LOGIN.error.text }))
      .finally(() => commit('SET_LOADING', false));
  },
};

import axios from 'axios';
import storage from '@/persistence';

const { getToken } = storage('cookieStorage');

const TPV_APP_API_URL = 'https://taxi-tpv-tickets-api.herokuapp.com/api/v1';

export const doLogin = ({ username, password }) => (
  axios.post(`${TPV_APP_API_URL}/login`, {
    email: username,
    password,
  })
);

export const uploadPDF = formData => (
  axios.post(`${TPV_APP_API_URL}/tickets`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: getToken(),
      },
    })
);

export const register = body => (
  axios.post(`${TPV_APP_API_URL}/tickets/register`,
    body,
    {
      headers: {
        Authorization: getToken(),
      },
    })
);

export const getData = () => axios.get(`${TPV_APP_API_URL}/tickets`, {
  headers: {
    Authorization: getToken(),
  },
});

export const deleteTicket = id => axios.delete(`${TPV_APP_API_URL}/tickets/${id}`, {
  headers: {
    Authorization: getToken(),
  },
});

export const upload = body => url => axios.post(`${TPV_APP_API_URL}${url}`,
  body,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: getToken(),
    },
  });

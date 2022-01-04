import api from './api';

const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common['authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['authorization'];
    localStorage.removeItem('token');
  }
};

console.log(localStorage.token, '***');

export default setAuthToken;

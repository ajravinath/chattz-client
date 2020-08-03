import authHelper from '../modules/shared/helper/authHelper';
import { baseUrl } from './constants';

const userApi = {
  getUserById: async id => {
    const response = await fetch(`${baseUrl}/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token: authHelper.getToken()
      }
    });
    if (response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    } else {
      return response.json();
    }
  }
};

export default userApi;

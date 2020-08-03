const KEY_TOKEN = 'TOKEN';

const authHelper = {
  onLogin: token => {
    localStorage.setItem(KEY_TOKEN, token);
  },

  onLogout: () => {
    localStorage.removeItem(KEY_TOKEN);
  },

  getToken: () => {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      if (token && token.length > 0) {
        return token;
      }
      throw new Error('Token Empty');
    } catch (error) {
      return error;
    }
  },

  isLoggedIn: localStorage.getItem(KEY_TOKEN) ? true : false
};

export default authHelper;

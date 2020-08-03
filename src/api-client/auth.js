import { baseUrl } from './constants';

const signUp = async data => {
  const response = await fetch(`${baseUrl}/auth/sign-up`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

const login = async data => {
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
};

const authApi = { signUp, login };
export default authApi;

import { useContext, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import userApi from '../../../api-client/user';
import AppContext from '../app-context/AppContext';
import authHelper from '../helper/authHelper';

export default function RestoreCurrentUser() {
  const { onLogin } = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async id => {
      const { data } = await userApi.getUserById(id);
      onLogin(data);
    };

    try {
      const user = jwt.decode(authHelper.getToken());
      if (user && user.id) fetchUser(user.id);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

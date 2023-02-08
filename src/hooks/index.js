import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import { login as userLogin } from '../api';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';

// hook to use Auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// hook to provide state to AuthContext
export const useProviderAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // when the page loads we set the user if it exists

    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

    if (userToken) {
      const user = jwtDecode(userToken);

      setUser(user);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // getting response from the API
    const response = await userLogin(email, password);

    if (response.success) {
      // if email and password validated

      // setting the user as received from the API
      setUser(response.data.user);

      // storing the user in local storage
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      // if email and password not validated
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);

    // removing the user from local storage
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  // returning the state for AuthContext
  return {
    user,
    login,
    logout,
    loading,
  };
};

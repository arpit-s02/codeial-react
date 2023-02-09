import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../providers/AuthProvider';
import {
  editProfile,
  fetchFriends,
  login as userLogin,
  signUp as userSignUp,
} from '../api';

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
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwtDecode(userToken);
        const response = await fetchFriends();

        setUser({
          ...user,
          friendships: response.data.friends,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const signUp = async (name, email, password, confirmPassword) => {
    const response = await userSignUp(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const setFriends = async () => {
    const response = await fetchFriends();

    if (response.success) {
      setUser({
        ...user,
        friendships: response.data.friends,
      });
    } else {
      console.error(response.message);
    }
  };

  const login = async (email, password) => {
    // getting response from the API
    const response = await userLogin(email, password);

    if (response.success) {
      // if email and password validated
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

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    if (response.success) {
      setUser(response.data.user);

      // updating the user token in local storage
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const updateUserFriends = (addFriend, friend) => {
    // if addFriend is true we add the friend in our local state
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
      return;
    }
    // else we remove the friend from our local state
    else {
      const updatedFriends = user.friendships.filter((f) => {
        return f.to_user._id !== friend;
      });

      setUser({
        ...user,
        friendships: updatedFriends,
      });
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
    setFriends,
    logout,
    loading,
    signUp,
    updateUser,
    updateUserFriends,
  };
};

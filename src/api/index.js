import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY } from '../utils';

// in the second argument, body is destructured and rest of the keys are called customConfig
const customFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
  };

  // if token exists, we are adding authorization key to headers as some APIs require authorization
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  // creating config to be passed in fetch
  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  // stringifying the body as we cannnot send objects directly, and adding it inside the config
  // body can contain keys such as email and password in log-in
  if (body) {
    config.body = getFormBody(body);
  }

  try {
    // fetching the data from the API
    const response = await fetch(url, config);

    // converting the response into JSON
    const data = await response.json();

    if (data.success) {
      // if the data received has success == true
      return {
        data: data.data,
        success: true,
        message: data.message,
      };
    }

    // else we'll throw error
    throw new Error(data.message);
  } catch (error) {
    console.error('error');
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 5) => {
  return customFetch(API_URLS.posts(page, limit), {
    method: 'GET',
  });
};

export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};

export const signUp = async (name, email, password, confirm_password) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: {
      name,
      email,
      password,
      confirm_password,
    },
  });
};

export const editProfile = async (id, name, password, confirm_password) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: {
      id,
      name,
      password,
      confirm_password,
    },
  });
};

export const fetchUserInfo = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};

export const addFriend = (userId) => {
  return customFetch(API_URLS.createFriendship(userId), {
    method: 'POST',
  });
};

export const fetchFriends = () => {
  return customFetch(API_URLS.friends(), {
    method: 'GET',
  });
};

export const unFriend = (userId) => {
  return customFetch(API_URLS.removeFriend(userId), {
    method: 'POST',
  });
};

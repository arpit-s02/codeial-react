import { createContext } from 'react';
import { useProviderAuth } from '../hooks';

// const initialState = {
//   user: null,
//   login: () => {},
//   logout: () => {},
//   laoding: true,
// };

// creating a context for authentication
export const AuthContext = createContext();

// export const AuthContext = createContext(initialState);

// function which will provide us a wrapper which can be used to use the context anywhere in the app
export const AuthProvider = ({ children }) => {
  // getting the state for AuthContext
  const auth = useProviderAuth();

  // telling AuthContext its state and returning AuthContext.Provider which would be a wrapper around whole app
  return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
};

import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// Create a new context for authentication
export const AuthContext = createContext();

// Create a provider component for the authentication context
export const AuthProvider = ({ children }) => {
  // Maintain the user's information in the state
  const [user, setUser] = useState(null);

  // Define a function to log in a user
  const saveUser = (userData) => {
    setUser(userData);
  };

  // Define a function to log out a user
  const unsetUser = () => {
    setUser(null);
  };

  const value = useMemo(() => ({ user, saveUser, unsetUser }), [user]);

  // Provide the user's information and the login and logout functions to the children components
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}
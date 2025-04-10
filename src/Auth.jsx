import React, { createContext, useContext, useState } from 'react';

const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds user info like email

  return (
    <Auth.Provider value={{ user, setUser }}>
      {children}
    </Auth.Provider>
  );
};

export const useAuth = () => useContext(Auth);

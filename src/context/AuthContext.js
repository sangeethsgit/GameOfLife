import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [token, setToken] = useState('');

  // Check for existing session on app load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedAddress = localStorage.getItem('userAddress');
    
    if (storedToken && storedAddress) {
      setToken(storedToken);
      setUserAddress(storedAddress);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (address, authToken) => {
    localStorage.setItem('token', authToken);
    localStorage.setItem('userAddress', address);
    setToken(authToken);
    setUserAddress(address);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userAddress');
    setToken('');
    setUserAddress('');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    userAddress,
    token,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 
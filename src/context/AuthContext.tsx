import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const defaultContext: AuthContextType = {
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is authenticated (from localStorage or session)
    const authStatus = localStorage.getItem('wcvfw_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    // Here you would typically validate credentials with your backend
    // For demo purposes, we're just setting the auth state
    setIsAuthenticated(true);
    localStorage.setItem('wcvfw_auth', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wcvfw_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
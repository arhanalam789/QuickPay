import { createContext, useState, useEffect, useContext } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/authService';
import { clearAuthSession, getStoredUser, storeAuthSession } from '../api/authStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    setUser(data.user);
    storeAuthSession(data);
  };

  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    setUser(data.user);
    storeAuthSession(data);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch(err) {
      console.warn("Logout api failed, clearing local state anyway");
    } finally {
      setUser(null);
      clearAuthSession();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

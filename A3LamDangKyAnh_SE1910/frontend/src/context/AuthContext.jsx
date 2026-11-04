import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  // Đăng nhập
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const data = response.data;

      const userData = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        role: data.role,
        isStaff: data.isStaff
      };

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(userData));

      setToken(data.token);
      setUser(userData);
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản.';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Cập nhật thông tin profile của user trong context
  const updateUserData = (updatedFields) => {
    if (!user) return;
    const newUser = { ...user, ...updatedFields };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const isStaff = Boolean(user && (user.isStaff || user.role === 'ROLE_STAFF'));
  const isCustomer = Boolean(user && !isStaff);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      isStaff,
      isCustomer,
      login,
      logout,
      updateUserData
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


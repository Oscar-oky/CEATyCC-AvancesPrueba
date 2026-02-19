
import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';

export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
}

export interface LoginResponse {
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
  token: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  allUsers: User[];
  isLoadingAllUsers: boolean; // Nuevo estado de carga para allUsers
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAdmin: () => boolean;
  isLoggedIn: () => boolean;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isRegisterModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  register: (email: string, name: string, password: string, role: 'admin' | 'user') => Promise<{ success: boolean; message?: string }>;
  fetchAllUsers: () => Promise<void>;
  deleteUser: (email: string) => Promise<void>;
  blockUser: (email: string, status: 'active' | 'blocked') => Promise<void>;
  updateUser: (email: string, name: string, role: 'admin' | 'user') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoadingAllUsers, setIsLoadingAllUsers] = useState(true); // Nuevo estado de carga

  useEffect(() => {
    const savedUser = localStorage.getItem('calendar-user');
    const savedToken = localStorage.getItem('calendar-token');
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (error) {
        console.error('Error loading user or token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      localStorage.setItem('calendar-user', JSON.stringify(user));
      localStorage.setItem('calendar-token', token);
    } else {
      localStorage.removeItem('calendar-user');
      localStorage.removeItem('calendar-token');
    }
  }, [user, token]);

  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      const loggedInUser: User = {
        email: data.email,
        name: data.name,
        role: data.role,
        status: data.status,
      };
      setUser(loggedInUser);
      setToken(data.token);
      return { success: true, message: '¡Sesión iniciada con éxito!' };
    } catch (error: any) {
      console.error('Error logging in user:', error);
      return { success: false, message: error.message || 'Error desconocido al iniciar sesión.' };
    }
  };

  const blockUser = async (email: string, status: 'active' | 'blocked') => {
    if (user?.role !== 'admin') return;
    try {
      const response = await fetch(`/api/users/${email}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error('Failed to block user');
      }
      setAllUsers(prev => prev.map(u => u.email === email ? { ...u, status } : u));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const updateUser = async (email: string, name: string, role: 'admin' | 'user') => {
    if (user?.role !== 'admin') return;
    try {
      const response = await fetch(`/api/users/${email}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, role }),
        });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      setAllUsers(prev => prev.map(u => u.email === email ? { ...u, name, role } : u));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const fetchAllUsers = useCallback(async () => {
    if (user?.role !== 'admin') {
      setIsLoadingAllUsers(false); // Finaliza la carga si no es admin
      return;
    }
    setIsLoadingAllUsers(true); // Inicia la carga
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingAllUsers(false); // Finaliza la carga
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAllUsers();
    }
  }, [user, fetchAllUsers]);

  const logout = () => setUser(null);
  const isAdmin = () => user?.role === 'admin';
  const isLoggedIn = () => user !== null;

  const openLoginModal = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  const openRegisterModal = () => setRegisterModalOpen(true);
  const closeRegisterModal = () => setRegisterModalOpen(false);

  const register = async (email: string, name: string, password: string, role: 'admin' | 'user' = 'user'): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar usuario');
      }

      // Optionally log in the user immediately after registration
      // login(email, password); 
      return { success: true, message: data.message || 'Usuario registrado con éxito.' };
    } catch (error: any) {
      console.error('Error registering user:', error);
      return { success: false, message: error.message || 'Error desconocido al registrar usuario.' };
    }
  };

  const deleteUser = async (email: string) => {
    if (user?.role !== 'admin') return;
    try {
      const response = await fetch(`/api/users/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setAllUsers(prev => prev.filter(u => u.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const value = {
    user,
    token,
    allUsers,
    isLoadingAllUsers, // Exponer el nuevo estado de carga
    login,
    logout,
    isAdmin,
    isLoggedIn,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    isRegisterModalOpen,
    openRegisterModal,
    closeRegisterModal,
    register,
    fetchAllUsers,
    deleteUser,
    blockUser,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

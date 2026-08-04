'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const MOCK_USERS: Record<UserRole, User> = {
  student: {
    id: 'stu-001',
    name: 'Aarav Sharma',
    email: 'student@edusphere.edu',
    role: 'student',
    department: 'Computer Science & Engineering',
    rollNumber: 'CS2021001',
    semester: 7,
    year: 4,
    phone: '+91 98765 43210',
    joinedAt: '2021-07-15',
    avatar: '',
  },
  faculty: {
    id: 'fac-001',
    name: 'Dr. Anjali Sharma',
    email: 'faculty@edusphere.edu',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    employeeId: 'FAC001',
    phone: '+91 98765 43220',
    joinedAt: '2013-06-01',
    avatar: '',
  },
  admin: {
    id: 'adm-001',
    name: 'Prof. Ramesh Babu',
    email: 'admin@edusphere.edu',
    role: 'admin',
    department: 'Administration',
    employeeId: 'ADM001',
    phone: '+91 98765 43230',
    joinedAt: '2010-01-01',
    avatar: '',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('edusphere_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string, role: UserRole) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    const mockUser = { ...MOCK_USERS[role], email };
    setUser(mockUser);
    localStorage.setItem('edusphere_user', JSON.stringify(mockUser));
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('edusphere_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

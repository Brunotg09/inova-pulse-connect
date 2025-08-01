import React, { createContext, useContext, useState } from 'react';
import { MockDatabase, Company, User } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  company: Company | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Simular usuário logado para desenvolvimento
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  });
  const [company, setCompany] = useState<Company | null>(() => {
    const savedCompany = localStorage.getItem('mockCompany');
    if (savedCompany) {
      return JSON.parse(savedCompany);
    }
    return null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Buscar usuário no mock database
      const user = MockDatabase.getUserByEmail(email);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      // Buscar empresa do usuário
      const company = MockDatabase.getCompanies().find(c => c.id === user.company_id);
      if (!company) {
        throw new Error('Empresa não encontrada');
      }
      
      setUser(user);
      setCompany(company);
      localStorage.setItem('mockUser', JSON.stringify(user));
      localStorage.setItem('mockCompany', JSON.stringify(company));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setCompany(null);
    localStorage.removeItem('mockUser');
    localStorage.removeItem('mockCompany');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, company }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
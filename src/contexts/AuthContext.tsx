import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'colaborador';
  team_id?: string;
  company_id: string;
  company_name: string;
  company_slug: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  company: Company | null;
}

interface Company {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: 'free' | 'pro' | 'enterprise';
  employees_count: number;
  created_at: string;
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
      // Mock login com diferentes empresas
      const companySlug = email.split('@')[1]?.split('.')[0] || 'demo';
      const mockCompany: Company = {
        id: '1',
        name: companySlug === 'admin' ? 'InovaTech Solutions' : 'TechCorp Brasil',
        slug: companySlug,
        plan: email.includes('admin') ? 'enterprise' : 'pro',
        employees_count: 60,
        created_at: '2024-01-01'
      };
      
      const mockUser: User = {
        id: '1',
        name: 'João Silva',
        email: email,
        role: email.includes('admin') ? 'admin' : 'colaborador',
        team_id: '1',
        company_id: mockCompany.id,
        company_name: mockCompany.name,
        company_slug: mockCompany.slug
      };
      
      setUser(mockUser);
      setCompany(mockCompany);
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      localStorage.setItem('mockCompany', JSON.stringify(mockCompany));
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
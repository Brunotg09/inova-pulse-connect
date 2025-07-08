import { ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user } = useAuth();
  const { companySlug } = useParams<{ companySlug: string }>();

  if (!user) {
    return <Navigate to={`/${companySlug}/login`} replace />;
  }

  if (adminOnly && user.role !== 'admin') {
    return <Navigate to={`/${companySlug}/dashboard`} replace />;
  }

  return <>{children}</>;
}
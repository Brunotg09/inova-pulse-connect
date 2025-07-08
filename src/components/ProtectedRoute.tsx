import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Permitir acesso livremente a todas as rotas
  return <>{children}</>;
}

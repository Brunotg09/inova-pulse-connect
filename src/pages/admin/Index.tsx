import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminIndex() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Administração</h1>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Administrativo</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Painel de controle para administradores.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
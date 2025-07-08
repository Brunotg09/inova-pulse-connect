import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminSettings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <Card>
          <CardHeader>
            <CardTitle>Configurações da Empresa</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configure parâmetros gerais da empresa.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
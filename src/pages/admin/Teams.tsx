import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminTeams() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Gestão de Equipes</h1>
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Equipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie equipes e membros da organização.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
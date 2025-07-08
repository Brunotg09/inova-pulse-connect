import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamIndex() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Minha Equipe</h1>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visão geral da sua equipe e atividades.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
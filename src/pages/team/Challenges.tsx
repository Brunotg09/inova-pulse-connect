import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamChallenges() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Desafios da Equipe</h1>
        <Card>
          <CardHeader>
            <CardTitle>Desafios Específicos da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Desafios criados especialmente para sua equipe.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
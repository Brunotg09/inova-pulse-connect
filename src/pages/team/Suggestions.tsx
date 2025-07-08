import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamSuggestions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Sugestões da Equipe</h1>
        <Card>
          <CardHeader>
            <CardTitle>Sugestões Específicas da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sugestões criadas pela sua equipe.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
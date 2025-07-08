import { DashboardLayout } from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TeamFeedbacks() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Feedbacks da Equipe</h1>
        <Card>
          <CardHeader>
            <CardTitle>Feedbacks Internos da Equipe</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Feedbacks específicos da sua equipe.</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
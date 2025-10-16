import { useTranslation } from 'react-i18next';
import MetricCard from '@/components/MetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, TrendingUp, UsersRound, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { generateDashboardData, mockEmployees, mockSurveyResponses } from '@/lib/mockData';

const COLORS = ['hsl(142, 76%, 36%)', 'hsl(0, 84%, 60%)'];

export default function Dashboard() {
  const { t } = useTranslation();
  const { last30Days, byDepartment, choiceDistribution } = generateDashboardData();

  const responseRate = Math.round((mockSurveyResponses.length / mockEmployees.length) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title={t('dashboard.totalEmployees')}
          value={mockEmployees.length}
          icon={Users}
          trend={{ value: '+12%', direction: 'up' }}
          color="text-primary"
        />
        <MetricCard
          title={t('dashboard.responseRate')}
          value={`${responseRate}%`}
          icon={TrendingUp}
          trend={{ value: '+8%', direction: 'up' }}
          color="text-success"
        />
        <MetricCard
          title={t('dashboard.teamsFormed')}
          value={12}
          icon={UsersRound}
          color="text-chart-3"
        />
        <MetricCard
          title={t('dashboard.cohesionIndex')}
          value="8.2/10"
          icon={Activity}
          trend={{ value: '+0.3', direction: 'up' }}
          color="text-chart-4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.responseEvolution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={last30Days}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Line type="monotone" dataKey="responses" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.responsesByDepartment')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byDepartment}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="department" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="responses" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.choiceDistribution')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={choiceDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {choiceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

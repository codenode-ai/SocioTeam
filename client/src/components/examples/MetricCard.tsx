import MetricCard from '../MetricCard';
import { Users } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-6 space-y-4">
      <MetricCard
        title="Total Employees"
        value={150}
        icon={Users}
        trend={{ value: '+12%', direction: 'up' }}
        color="text-primary"
      />
    </div>
  );
}

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  color?: string;
}

export default function MetricCard({ title, value, icon: Icon, trend, color = 'text-primary' }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-2">{title}</p>
          <p className="text-3xl font-semibold font-mono">{value}</p>
          {trend && (
            <Badge variant="secondary" className="mt-2">
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}
            </Badge>
          )}
        </div>
        <div className={`${color} opacity-80`}>
          <Icon className="w-12 h-12" />
        </div>
      </div>
    </Card>
  );
}

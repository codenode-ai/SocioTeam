import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, UserX, AlertTriangle } from 'lucide-react';
import { generateSociometricData, mockEmployees } from '@/lib/mockData';

export default function SociometricGraph() {
  const { t } = useTranslation();
  const [department, setDepartment] = useState('all');
  const [connectionType, setConnectionType] = useState<'all' | 'positive' | 'negative'>('all');
  const [minStrength, setMinStrength] = useState([0]);
  
  const data = generateSociometricData();
  
  const topStars = data.nodes
    .sort((a, b) => b.size - a.size)
    .slice(0, 5)
    .map(node => mockEmployees.find(e => e.id === node.id)!);

  const isolated = data.nodes
    .sort((a, b) => a.size - b.size)
    .slice(0, 3)
    .map(node => mockEmployees.find(e => e.id === node.id)!);

  const conflicts = data.links
    .filter(link => link.type === 'negative')
    .slice(0, 5);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{t('sociometry.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  {data.links
                    .filter(link => connectionType === 'all' || link.type === connectionType)
                    .filter(link => link.strength >= minStrength[0])
                    .map((link, idx) => {
                      const sourceNode = data.nodes.find(n => n.id === link.source);
                      const targetNode = data.nodes.find(n => n.id === link.target);
                      if (!sourceNode || !targetNode) return null;
                      
                      const x1 = (sourceNode.id % 7) * 14 + 10;
                      const y1 = Math.floor(sourceNode.id / 7) * 16 + 10;
                      const x2 = (targetNode.id % 7) * 14 + 10;
                      const y2 = Math.floor(targetNode.id / 7) * 16 + 10;
                      
                      return (
                        <line
                          key={idx}
                          x1={`${x1}%`}
                          y1={`${y1}%`}
                          x2={`${x2}%`}
                          y2={`${y2}%`}
                          stroke={link.type === 'positive' ? 'hsl(142, 76%, 36%)' : 'hsl(0, 84%, 60%)'}
                          strokeWidth={link.strength * 2}
                          opacity={0.4}
                        />
                      );
                    })}
                  
                  {data.nodes.map((node) => {
                    const x = (node.id % 7) * 14 + 10;
                    const y = Math.floor(node.id / 7) * 16 + 10;
                    
                    return (
                      <g key={node.id}>
                        <circle
                          cx={`${x}%`}
                          cy={`${y}%`}
                          r={node.size / 2}
                          fill="hsl(var(--primary))"
                          opacity={0.8}
                        />
                        <text
                          x={`${x}%`}
                          y={`${y + 4}%`}
                          textAnchor="middle"
                          className="text-xs fill-primary-foreground font-medium"
                        >
                          {node.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('sociometry.department')}</label>
                  <Select value={department} onValueChange={setDepartment}>
                    <SelectTrigger data-testid="select-department">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('sociometry.allDepartments')}</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">{t('sociometry.connectionType')}</label>
                  <Select value={connectionType} onValueChange={(v) => setConnectionType(v as typeof connectionType)}>
                    <SelectTrigger data-testid="select-connection-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('sociometry.all')}</SelectItem>
                      <SelectItem value="positive">{t('sociometry.positive')}</SelectItem>
                      <SelectItem value="negative">{t('sociometry.negative')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    {t('sociometry.minStrength')}: {minStrength[0].toFixed(1)}
                  </label>
                  <Slider
                    value={minStrength}
                    onValueChange={setMinStrength}
                    max={1}
                    step={0.1}
                    className="mt-3"
                    data-testid="slider-min-strength"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                {t('sociometry.topStars')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topStars.map((emp, idx) => (
                <div key={emp.id} className="flex items-center gap-2" data-testid={`top-star-${idx}`}>
                  <Badge variant="secondary" className="w-6 h-6 flex items-center justify-center p-0">
                    {idx + 1}
                  </Badge>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={emp.avatar} alt={emp.name} />
                    <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.department}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <UserX className="w-5 h-5 text-muted-foreground" />
                {t('sociometry.isolated')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {isolated.map((emp) => (
                <div key={emp.id} className="flex items-center gap-2" data-testid={`isolated-${emp.id}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={emp.avatar} alt={emp.name} />
                    <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{emp.name}</p>
                    <p className="text-xs text-muted-foreground">{emp.department}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                {t('sociometry.conflicts')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {conflicts.length} negative connections detected
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

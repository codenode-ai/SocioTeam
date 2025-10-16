import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { Sparkles, AlertTriangle } from 'lucide-react';
import { mockEmployees } from '@/lib/mockData';
import { Employee } from '@/types';

interface TeamData {
  id: string;
  name: string;
  members: Employee[];
  cohesion: number;
}

export default function TeamBuilder() {
  const { t } = useTranslation();
  const [availableEmployees, setAvailableEmployees] = useState<Employee[]>(mockEmployees.slice(0, 20));
  const [teams, setTeams] = useState<TeamData[]>([
    { id: '1', name: 'Team Alpha', members: [], cohesion: 0 },
    { id: '2', name: 'Team Beta', members: [], cohesion: 0 },
    { id: '3', name: 'Team Gamma', members: [], cohesion: 0 },
  ]);
  const [activeEmployee, setActiveEmployee] = useState<Employee | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const employee = availableEmployees.find(e => e.id === active.id) ||
      teams.flatMap(t => t.members).find(e => e.id === active.id);
    setActiveEmployee(employee || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveEmployee(null);

    if (!over) return;

    const employeeId = active.id as string;
    const targetTeamId = over.id as string;

    const sourceTeam = teams.find(t => t.members.some(m => m.id === employeeId)) ||
      availableEmployees.find(e => e.id === employeeId);

    if (!employee) return;

    if (sourceTeam) {
      setTeams(teams.map(t =>
        t.id === sourceTeam.id
          ? { ...t, members: t.members.filter(m => m.id !== employeeId) }
          : t.id === targetTeamId
          ? { ...t, members: [...t.members, employee], cohesion: Math.random() * 3 + 7 }
          : t
      ));
    } else {
      setAvailableEmployees(availableEmployees.filter(e => e.id !== employeeId));
      setTeams(teams.map(t =>
        t.id === targetTeamId
          ? { ...t, members: [...t.members, employee], cohesion: Math.random() * 3 + 7 }
          : t
      ));
    }
  };

  const handleSuggestTeams = () => {
    const shuffled = [...availableEmployees].sort(() => Math.random() - 0.5);
    const teamsWithMembers = teams.map((team, idx) => ({
      ...team,
      members: shuffled.slice(idx * 5, (idx + 1) * 5),
      cohesion: Math.random() * 3 + 7
    }));
    setTeams(teamsWithMembers);
    setAvailableEmployees(shuffled.slice(15));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">{t('teams.title')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSuggestTeams} data-testid="button-suggest-teams">
            <Sparkles className="w-4 h-4 mr-2" />
            {t('teams.suggestTeams')}
          </Button>
          <Button onClick={() => console.log('Save teams')} data-testid="button-save-teams">
            {t('teams.saveTeams')}
          </Button>
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">{t('teams.availablePool')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {availableEmployees.map(emp => (
                <div
                  key={emp.id}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData('employeeId', emp.id.toString());
                  }}
                  className="p-3 rounded-lg border bg-card cursor-move hover-elevate"
                  data-testid={`draggable-employee-${emp.id}`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={emp.avatar} alt={emp.name} />
                      <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{emp.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{emp.position}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {teams.map(team => (
              <Card
                key={team.id}
                className="border-2 border-dashed"
                data-testid={`dropzone-team-${team.id}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const employeeId = e.dataTransfer.getData('employeeId');
                  const employee = availableEmployees.find(emp => emp.id === employeeId);
                  if (employee) {
                    setAvailableEmployees(availableEmployees.filter(e => e.id !== employeeId));
                    setTeams(teams.map(t =>
                      t.id === team.id
                        ? { ...t, members: [...t.members, employee], cohesion: Math.random() * 3 + 7 }
                        : t
                    ));
                  }
                }}
              >
                <CardHeader>
                  <Input
                    value={team.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setTeams(teams.map(t => t.id === team.id ? { ...t, name: newName } : t));
                    }}
                    className="font-semibold text-lg border-0 px-0 focus-visible:ring-0"
                    data-testid={`input-team-name-${team.id}`}
                  />
                  {team.members.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{t('teams.cohesion')}</span>
                        <span className="font-mono">{team.cohesion.toFixed(1)}/10</span>
                      </div>
                      <Progress value={team.cohesion * 10} className="h-1" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-2">
                  {team.members.map(member => (
                    <div
                      key={member.id}
                      className="p-2 rounded bg-muted/50"
                      data-testid={`team-member-${team.id}-${member.id}`}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{member.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{member.position}</p>
                        </div>
                        {Math.random() > 0.8 && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="w-3 h-3" />
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {team.members.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Drag employees here
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeEmployee && (
            <div className="p-3 rounded-lg border bg-card shadow-lg">
              <div className="flex items-center gap-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activeEmployee.avatar} alt={activeEmployee.name} />
                  <AvatarFallback>{activeEmployee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{activeEmployee.name}</p>
                  <p className="text-xs text-muted-foreground">{activeEmployee.position}</p>
                </div>
              </div>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

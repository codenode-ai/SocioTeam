import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Employee } from '@/types';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: () => void;
  selected?: boolean;
}

export default function EmployeeCard({ employee, onClick, selected }: EmployeeCardProps) {
  return (
    <Card
      className={`p-4 cursor-pointer hover-elevate transition-all ${
        selected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={onClick}
      data-testid={`card-employee-${employee.id}`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{employee.name}</p>
          <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
          <Badge variant="secondary" className="mt-1 text-xs">
            {employee.department}
          </Badge>
        </div>
      </div>
    </Card>
  );
}

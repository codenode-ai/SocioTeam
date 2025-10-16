import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Copy, Mail, Smartphone, CheckCircle2, Clock } from 'lucide-react';
import { mockEmployees } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

interface SurveyLinkData {
  employeeId: number;
  token: string;
  status: 'pending' | 'completed';
}

export default function SurveyDistribution() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [surveyLinks, setSurveyLinks] = useState<SurveyLinkData[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const handleGenerateLinks = () => {
    const links = mockEmployees.slice(0, 30).map((emp, idx) => ({
      employeeId: emp.id,
      token: crypto.randomUUID(),
      status: idx < 20 ? ('completed' as const) : ('pending' as const)
    }));
    setSurveyLinks(links);
    toast({
      title: "Links Generated",
      description: `${links.length} unique survey links have been created.`
    });
  };

  const handleCopyLink = (token: string) => {
    const link = `${window.location.origin}/survey/${token}`;
    navigator.clipboard.writeText(link);
    toast({
      title: t('survey.linkCopied'),
      description: link
    });
  };

  const filteredLinks = surveyLinks.filter(link => {
    if (filter === 'all') return true;
    return link.status === filter;
  });

  const completedCount = surveyLinks.filter(l => l.status === 'completed').length;
  const progressPercent = surveyLinks.length > 0 
    ? Math.round((completedCount / surveyLinks.length) * 100)
    : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">{t('survey.distribution')}</h1>
        <Button
          onClick={handleGenerateLinks}
          data-testid="button-generate-links"
        >
          {t('survey.generateLinks')}
        </Button>
      </div>

      {surveyLinks.length > 0 && (
        <Card className="p-6">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Response Progress</span>
              <span className="text-muted-foreground">{completedCount}/{surveyLinks.length} ({progressPercent}%)</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </Card>
      )}

      {surveyLinks.length > 0 && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
              <SelectTrigger className="w-48" data-testid="select-filter-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('survey.filterAll')}</SelectItem>
                <SelectItem value="pending">{t('survey.filterPending')}</SelectItem>
                <SelectItem value="completed">{t('survey.filterCompleted')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('employees.name')}</TableHead>
                  <TableHead>{t('employees.status')}</TableHead>
                  <TableHead className="hidden lg:table-cell">Link</TableHead>
                  <TableHead className="text-right">{t('employees.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLinks.map((link) => {
                  const employee = mockEmployees.find(e => e.id === link.employeeId)!;
                  return (
                    <TableRow key={link.token} data-testid={`row-link-${link.employeeId}`}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={employee.avatar} alt={employee.name} />
                            <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={link.status === 'completed' ? 'default' : 'secondary'}
                          className="gap-1"
                        >
                          {link.status === 'completed' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Clock className="w-3 h-3" />
                          )}
                          {t(`survey.${link.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          /survey/{link.token.slice(0, 8)}...
                        </code>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyLink(link.token)}
                            data-testid={`button-copy-${link.employeeId}`}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => console.log('Send email')}
                            data-testid={`button-email-${link.employeeId}`}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => console.log('Send SMS')}
                            data-testid={`button-sms-${link.employeeId}`}
                          >
                            <Smartphone className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {surveyLinks.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            Click "Generate Unique Links" to create survey links for employees
          </p>
        </Card>
      )}
    </div>
  );
}

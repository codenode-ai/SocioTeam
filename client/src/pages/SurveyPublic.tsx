import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Network, CheckCircle2 } from 'lucide-react';
import LanguageSelector from '@/components/LanguageSelector';
import { mockEmployees, mockSurvey } from '@/lib/mockData';

export default function SurveyPublic() {
  const { t } = useTranslation();
  const { token } = useParams();
  const [responses, setResponses] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleSelection = (questionId: number, employeeId: number, maxChoices: number) => {
    setResponses(prev => {
      const current = prev[questionId] || [];
      const isSelected = current.includes(employeeId);
      
      if (isSelected) {
        return { ...prev, [questionId]: current.filter(id => id !== employeeId) };
      } else if (current.length < maxChoices) {
        return { ...prev, [questionId]: [...current, employeeId] };
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    console.log('Survey submitted:', { token, responses });
    setSubmitted(true);
  };

  const isComplete = mockSurvey.questions.every(q => 
    (responses[q.id]?.length || 0) > 0
  );

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
          <h1 className="text-2xl font-semibold mb-2">{t('survey.thankYou')}</h1>
          <p className="text-muted-foreground">
            Your responses have been recorded successfully.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-6 h-6 text-primary" />
          <span className="font-semibold text-lg">SocioTeam</span>
        </div>
        <LanguageSelector />
      </header>

      <main className="max-w-3xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-2">{mockSurvey.name}</h1>
          <p className="text-muted-foreground">
            Please answer all questions honestly. Your responses are confidential.
          </p>
        </div>

        {mockSurvey.questions.map((question, qIdx) => (
          <Card key={question.id} className="p-6">
            <div className="mb-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-lg font-semibold">
                  {qIdx + 1}. {t(`survey.question${question.id}`)}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('survey.selectUpTo', { count: question.maxChoices })}
              </p>
              <p className="text-sm font-medium mt-2">
                Selected: {responses[question.id]?.length || 0}/{question.maxChoices}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockEmployees.slice(0, 20).map((employee) => {
                const isSelected = responses[question.id]?.includes(employee.id) || false;
                const canSelect = (responses[question.id]?.length || 0) < question.maxChoices;
                
                return (
                  <div
                    key={employee.id}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover-elevate ${
                      isSelected ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => toggleSelection(question.id, employee.id, question.maxChoices)}
                    data-testid={`option-q${question.id}-emp${employee.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={isSelected}
                        disabled={!isSelected && !canSelect}
                        onCheckedChange={() => toggleSelection(question.id, employee.id, question.maxChoices)}
                      />
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={employee.avatar} alt={employee.name} />
                        <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{employee.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                        <p className="text-xs text-muted-foreground">{employee.department}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}

        <div className="flex justify-center">
          <Button
            size="lg"
            className="w-full sm:w-auto sm:px-12"
            disabled={!isComplete}
            onClick={handleSubmit}
            data-testid="button-submit-survey"
          >
            {t('survey.submit')}
          </Button>
        </div>
      </main>
    </div>
  );
}

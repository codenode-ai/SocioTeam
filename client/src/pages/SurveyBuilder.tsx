import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Eye } from 'lucide-react';
import { mockSurvey } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function SurveyBuilder() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [surveyName, setSurveyName] = useState('Team Formation Survey 2025');
  const [questions] = useState(mockSurvey.questions);

  const handleSave = () => {
    toast({
      title: "Survey Saved",
      description: `"${surveyName}" has been saved successfully.`
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">{t('survey.title')}</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => console.log('Preview')} data-testid="button-preview">
            <Eye className="w-4 h-4 mr-2" />
            {t('survey.preview')}
          </Button>
          <Button onClick={handleSave} data-testid="button-save-survey">
            {t('survey.save')}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Survey Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={surveyName}
                onChange={(e) => setSurveyName(e.target.value)}
                placeholder={t('survey.surveyName')}
                className="text-lg font-medium"
                data-testid="input-survey-name"
              />
            </CardContent>
          </Card>

          <div className="space-y-4">
            {questions.map((question, idx) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">Question {idx + 1}</Badge>
                        <Badge
                          variant={
                            question.type === 'positive'
                              ? 'default'
                              : question.type === 'negative'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {question.type}
                        </Badge>
                      </div>
                      <Input
                        defaultValue={t(`survey.question${question.id}`)}
                        className="text-base font-medium border-0 px-0"
                        data-testid={`input-question-${question.id}`}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t('survey.selectUpTo', { count: question.maxChoices })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button variant="outline" className="w-full" data-testid="button-add-question">
            <Plus className="w-4 h-4 mr-2" />
            {t('survey.addQuestion')}
          </Button>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{surveyName}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {questions.map((question, idx) => (
                <div key={question.id} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{idx + 1}</Badge>
                    <p className="font-medium">{t(`survey.question${question.id}`)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('survey.selectUpTo', { count: question.maxChoices })}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="p-3 border rounded-lg text-sm text-muted-foreground">
                        Employee option {i}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

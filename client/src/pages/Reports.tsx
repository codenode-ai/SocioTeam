import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText } from 'lucide-react';

export default function Reports() {
  const { t } = useTranslation();
  const [reportType, setReportType] = useState<string>('');
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    setShowPreview(true);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{t('reports.title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">{t('reports.type')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger data-testid="select-report-type">
                <SelectValue placeholder={t('reports.selectType')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">{t('reports.fullAnalysis')}</SelectItem>
                <SelectItem value="team">{t('reports.teamReport')}</SelectItem>
                <SelectItem value="conflict">{t('reports.conflictAnalysis')}</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('reports.filterByDate')}</label>
              <input
                type="date"
                className="w-full px-3 py-2 rounded-md border bg-background"
                data-testid="input-filter-date"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">{t('reports.filterByDepartment')}</label>
              <Select>
                <SelectTrigger data-testid="select-filter-department">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleGenerate}
              disabled={!reportType}
              data-testid="button-generate-report"
            >
              {t('reports.generate')}
            </Button>

            {showPreview && (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => console.log('Export PDF')}
                data-testid="button-export-pdf"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t('reports.exportPDF')}
              </Button>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {showPreview ? (
            <Card>
              <CardHeader>
                <CardTitle>
                  {reportType === 'full' && t('reports.fullAnalysis')}
                  {reportType === 'team' && t('reports.teamReport')}
                  {reportType === 'conflict' && t('reports.conflictAnalysis')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Total Employees</p>
                    <p className="text-2xl font-semibold font-mono mt-1">150</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Response Rate</p>
                    <p className="text-2xl font-semibold font-mono mt-1">73%</p>
                  </Card>
                  <Card className="p-4">
                    <p className="text-sm text-muted-foreground">Avg. Cohesion</p>
                    <p className="text-2xl font-semibold font-mono mt-1">8.2/10</p>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Executive Summary</h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-muted-foreground">
                      The sociometric analysis reveals strong collaboration patterns within the organization.
                      The overall cohesion index of 8.2/10 indicates healthy team dynamics with clear
                      preference patterns emerging across departments.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Findings</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span className="text-sm">High collaboration between IT and Marketing departments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success">✓</span>
                      <span className="text-sm">Strong technical leadership identification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-warning">!</span>
                      <span className="text-sm">Some isolated individuals requiring team integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-destructive">✗</span>
                      <span className="text-sm">3 conflict pairs detected requiring attention</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    <Card className="p-4">
                      <p className="text-sm font-medium">Cross-functional Teams</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Leverage strong IT-Marketing connections for product development initiatives
                      </p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm font-medium">Integration Programs</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Implement buddy systems for isolated team members
                      </p>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center p-12">
              <div className="text-center text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a report type and click generate to view the preview</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

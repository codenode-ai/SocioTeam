import SurveyDistribution from '@/pages/SurveyDistribution';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function SurveyDistributionExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-background">
        <SurveyDistribution />
      </div>
    </I18nextProvider>
  );
}

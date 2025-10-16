import SurveyPublic from '@/pages/SurveyPublic';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { Router } from 'wouter';

export default function SurveyPublicExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <SurveyPublic />
      </Router>
    </I18nextProvider>
  );
}

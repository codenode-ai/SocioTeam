import TeamBuilder from '@/pages/TeamBuilder';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function TeamBuilderExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-background">
        <TeamBuilder />
      </div>
    </I18nextProvider>
  );
}

import SociometricGraph from '@/pages/SociometricGraph';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function SociometricGraphExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-background">
        <SociometricGraph />
      </div>
    </I18nextProvider>
  );
}

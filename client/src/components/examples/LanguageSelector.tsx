import LanguageSelector from '../LanguageSelector';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function LanguageSelectorExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="p-6">
        <LanguageSelector />
      </div>
    </I18nextProvider>
  );
}

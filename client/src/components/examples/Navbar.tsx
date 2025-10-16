import Navbar from '../Navbar';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function NavbarExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <Navbar title="Dashboard" onMenuClick={() => console.log('Menu clicked')} />
    </I18nextProvider>
  );
}

import Employees from '@/pages/Employees';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function EmployeesExample() {
  return (
    <I18nextProvider i18n={i18n}>
      <div className="min-h-screen bg-background">
        <Employees />
      </div>
    </I18nextProvider>
  );
}

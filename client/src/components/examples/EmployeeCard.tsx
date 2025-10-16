import EmployeeCard from '../EmployeeCard';
import { mockEmployees } from '@/lib/mockData';
import { useState } from 'react';

export default function EmployeeCardExample() {
  const [selected, setSelected] = useState(false);
  
  return (
    <div className="p-6 max-w-sm">
      <EmployeeCard
        employee={mockEmployees[0]}
        onClick={() => {
          setSelected(!selected);
          console.log('Employee card clicked');
        }}
        selected={selected}
      />
    </div>
  );
}

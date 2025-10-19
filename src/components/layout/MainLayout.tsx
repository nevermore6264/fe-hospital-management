'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Dashboard } from './Dashboard';
import { PatientManagement } from './PatientManagement';
import { AppointmentManagement } from './AppointmentManagement';
import { UserManagement } from './UserManagement';
import { DoctorManagement } from './DoctorManagement';
import { BillingManagement } from './BillingManagement';
import { ReportsManagement } from './ReportsManagement';
import { SettingsManagement } from './SettingsManagement';
import { PrescriptionManagement } from './PrescriptionManagement';
import { MedicalRecordsManagement } from './MedicalRecordsManagement';
import { ScheduleManagement } from './ScheduleManagement';
import { QueueManagement } from './QueueManagement';
import { DatabaseManagement } from './DatabaseManagement';
import { StaffScheduleManagement } from './StaffScheduleManagement';
import { EquipmentManagement } from './EquipmentManagement';
import { useAuth } from './AuthContext';

// Placeholder components for other pages

export function MainLayout() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { user } = useAuth();

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'doctors':
        return <DoctorManagement />;
      case 'patients':
        return <PatientManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'medical-records':
        return <MedicalRecordsManagement />;
      case 'prescriptions':
        return <PrescriptionManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'reports':
        return <ReportsManagement />;
      case 'settings':
        return <SettingsManagement />;
      case 'queue':
        return <QueueManagement />;
      case 'schedule':
        return <ScheduleManagement />;
      case 'staff-schedule':
        return <StaffScheduleManagement />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'database':
        return <DatabaseManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}
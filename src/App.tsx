/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';

// Dedicated Driver Views
import { DriverPortalView } from './components/driver/DriverPortalView';
import { DriverWalletView } from './components/driver/DriverWalletView';
import { DriverHistoryView } from './components/driver/DriverHistoryView';
import { DriverProfileView } from './components/driver/DriverProfileView';
import { DriverNotificationsView } from './components/driver/DriverNotificationsView';

// Driver Modals
import { DriverRegistrationModal } from './components/driver/DriverRegistrationModal';
import { ChatModal } from './components/chat/ChatModal';

const AppContent: React.FC = () => {
  const { currentView, isDeviceFrame } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'cockpit':
      case 'driver':
      case 'orders':
        return <DriverPortalView />;
      case 'wallet':
        return <DriverWalletView />;
      case 'history':
        return <DriverHistoryView />;
      case 'notifications':
        return <DriverNotificationsView />;
      case 'profile':
      case 'account':
        return <DriverProfileView />;
      default:
        return <DriverPortalView />;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors ${isDeviceFrame ? 'py-4 flex justify-center items-center' : ''}`}>
      {/* Device frame container or responsive container */}
      <div
        className={`w-full bg-slate-50 dark:bg-slate-900 transition-all ${
          isDeviceFrame
            ? 'max-w-[390px] h-[820px] rounded-[44px] shadow-2xl border-[8px] border-slate-800 dark:border-slate-700 overflow-hidden relative flex flex-col'
            : 'max-w-5xl lg:max-w-6xl mx-auto flex flex-col shadow-sm min-h-screen lg:h-screen lg:overflow-hidden'
        }`}
      >
        {/* Smartphone Speaker / Notch when in device frame */}
        {isDeviceFrame && (
          <div className="bg-slate-900 dark:bg-slate-800 h-5 w-full flex items-center justify-between px-6 text-[9px] text-white shrink-0">
            <span className="font-bold">AWD Driver</span>
            <div className="w-16 h-3.5 bg-black rounded-full mx-auto" />
            <span className="font-bold">5G • 100%</span>
          </div>
        )}

        {/* Global Driver Header */}
        <Header />

        {/* Main Driver Content Area */}
        <main className="flex-1 px-2.5 sm:px-4 py-2.5 overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Global Driver Bottom Navigation */}
        <BottomNav />

        {/* Home Indicator Bar in device frame */}
        {isDeviceFrame && (
          <div className="h-4 bg-white dark:bg-slate-900 flex justify-center items-center shrink-0">
            <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          </div>
        )}

        {/* Driver Modals */}
        <DriverRegistrationModal />
        <ChatModal />
        <ToastContainer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

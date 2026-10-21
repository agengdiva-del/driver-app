/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';

// Feature Views
import { HomeView } from './components/home/HomeView';
import { FoodDeliveryView } from './components/food/FoodDeliveryView';
import { GroceryView } from './components/grocery/GroceryView';
import { PharmacyView } from './components/pharmacy/PharmacyView';
import { CourierDeliveryView } from './components/courier/CourierDeliveryView';
import { PpobView } from './components/ppob/PpobView';
import { UmkmView } from './components/umkm/UmkmView';
import { GlobalSearchView } from './components/search/GlobalSearchView';
import { OrderHistoryView } from './components/orders/OrderHistoryView';
import { WalletView } from './components/wallet/WalletView';
import { NotificationView } from './components/notifications/NotificationView';
import { ProfileView } from './components/profile/ProfileView';

// Modals
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/tracking/OrderTrackingModal';
import { ChatModal } from './components/chat/ChatModal';
import { AuthModal } from './components/auth/AuthModal';
import { KycModal } from './components/profile/KycModal';
import { AddressManagementModal } from './components/profile/AddressManagementModal';
import { ArchitectureSchemaModal } from './components/developer/ArchitectureSchemaModal';

const AppContent: React.FC = () => {
  const { currentView, isDeviceFrame, activeOrder } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'food':
        return <FoodDeliveryView />;
      case 'grocery':
        return <GroceryView />;
      case 'pharmacy':
        return <PharmacyView />;
      case 'courier':
        return <CourierDeliveryView />;
      case 'ppob':
        return <PpobView />;
      case 'umkm':
        return <UmkmView />;
      case 'search':
        return <GlobalSearchView />;
      case 'orders':
        return <OrderHistoryView />;
      case 'wallet':
        return <WalletView />;
      case 'notifications':
        return <NotificationView />;
      case 'account':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className={`min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors ${isDeviceFrame ? 'py-8 flex justify-center items-center' : ''}`}>
      {/* Device frame container or responsive container */}
      <div
        className={`w-full bg-white dark:bg-stone-900 min-h-screen transition-all ${
          isDeviceFrame
            ? 'max-w-[420px] h-[880px] rounded-[48px] shadow-2xl border-[10px] border-stone-800 dark:border-stone-700 overflow-hidden relative flex flex-col'
            : 'max-w-4xl mx-auto flex flex-col shadow-sm'
        }`}
      >
        {/* Smartphone Speaker / Notch when in device frame */}
        {isDeviceFrame && (
          <div className="bg-stone-800 dark:bg-stone-700 h-6 w-full flex items-center justify-between px-6 text-[10px] text-white shrink-0">
            <span className="font-bold">20:26</span>
            <div className="w-20 h-4 bg-stone-900 rounded-full mx-auto" />
            <span className="font-bold">5G • 100%</span>
          </div>
        )}

        {/* Global Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 px-3 sm:px-4 pt-3 overflow-y-auto">
          {renderActiveView()}
        </main>

        {/* Global Navigation Bar */}
        <BottomNav />

        {/* Home Indicator Bar in device frame */}
        {isDeviceFrame && (
          <div className="h-4 bg-white dark:bg-stone-900 flex justify-center items-center shrink-0">
            <div className="w-32 h-1 bg-stone-300 dark:bg-stone-700 rounded-full" />
          </div>
        )}

        {/* Overlay Modals & Drawers */}
        <CartDrawer />
        <CheckoutModal />
        <OrderTrackingModal />
        <ChatModal />
        <AuthModal />
        <KycModal />
        <AddressManagementModal />
        <ArchitectureSchemaModal />
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

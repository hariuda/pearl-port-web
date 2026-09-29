import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { BottomNavigation } from './components/BottomNavigation';
import { DashboardScreen } from './screens/DashboardScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { AllocationScreen } from './screens/AllocationScreen';
import { initializeNativeApp } from './services/nativeService';

const MainAppContent: React.FC = () => {
  const { isDarkMode } = usePortfolio();

  // Initialize native status bar and splash screen
  useEffect(() => {
    initializeNativeApp(isDarkMode);
  }, [isDarkMode]);

  // Navigation route: 'dashboard' | 'portfolio' | 'reports' | 'allocation'
  const [currentRoute, setCurrentRoute] = useState<string>('dashboard');
  const [routeStack, setRouteStack] = useState<string[]>(['dashboard']);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (routeStack.length > 1) {
        const nextStack = [...routeStack];
        nextStack.pop();
        const prevRoute = nextStack[nextStack.length - 1];
        setRouteStack(nextStack);
        setCurrentRoute(prevRoute);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [routeStack]);

  const navigateTo = (route: string) => {
    if (route === currentRoute) return;
    window.history.pushState({ route }, '', `#${route}`);
    setRouteStack((prev) => [...prev, route]);
    setCurrentRoute(route);
  };

  const navigateBack = () => {
    if (routeStack.length > 1) {
      window.history.back();
    } else {
      navigateTo('dashboard');
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center ${isDarkMode ? 'dark bg-[#0B0F19]' : 'bg-[#F4F5F9]'}`}
    >
      {/* Mobile Shell Container */}
      <div
        style={{
          backgroundColor: isDarkMode ? '#0B0F19' : '#F8FAFC',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
        }}
        className="w-full max-w-lg min-h-screen relative flex flex-col shadow-2xl overflow-x-hidden border-x border-slate-200/40 dark:border-slate-800/40"
      >
        {/* Screen Routing */}
        <main className="flex-1 w-full overflow-y-auto">
          {currentRoute === 'dashboard' && (
            <DashboardScreen onNavigateToAllocation={() => navigateTo('allocation')} />
          )}
          {currentRoute === 'portfolio' && <PortfolioScreen />}
          {currentRoute === 'reports' && <ReportsScreen />}
          {currentRoute === 'allocation' && (
            <AllocationScreen onNavigateBack={navigateBack} />
          )}
        </main>

        {/* Bottom Navigation (Only for main screens) */}
        {currentRoute !== 'allocation' && (
          <BottomNavigation
            currentRoute={currentRoute}
            onNavigate={(route) => navigateTo(route)}
          />
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
};

export default App;

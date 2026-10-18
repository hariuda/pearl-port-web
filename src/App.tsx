import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { BottomNavigation } from './components/BottomNavigation';
import { DashboardScreen } from './screens/DashboardScreen';
import { PortfolioScreen } from './screens/PortfolioScreen';
import { ReportsScreen } from './screens/ReportsScreen';
import { AllocationScreen } from './screens/AllocationScreen';
import { initializeNativeApp } from './services/nativeService';

const VALID_ROUTES = ['dashboard', 'portfolio', 'reports', 'allocation'];

const getStoredRoute = (): string => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.replace('#', '').trim();
    if (VALID_ROUTES.includes(hash)) return hash;
    try {
      const saved = sessionStorage.getItem('pearlport_current_route') || localStorage.getItem('pearlport_current_route');
      if (saved && VALID_ROUTES.includes(saved)) return saved;
    } catch {}
  }
  return 'dashboard';
};

const MainAppContent: React.FC = () => {
  const { isDarkMode, isRefreshingPrices } = usePortfolio();

  // Initialize native status bar and splash screen
  useEffect(() => {
    initializeNativeApp(isDarkMode);
  }, [isDarkMode]);

  // Navigation route: 'dashboard' | 'portfolio' | 'reports' | 'allocation'
  const [currentRoute, setCurrentRoute] = useState<string>(getStoredRoute);
  const [routeStack, setRouteStack] = useState<string[]>(() => [getStoredRoute()]);

  const syncRouteToStorage = (route: string) => {
    try {
      sessionStorage.setItem('pearlport_current_route', route);
      localStorage.setItem('pearlport_current_route', route);
    } catch {}
  };

  // Sync initial hash and storage on mount
  useEffect(() => {
    const currentHash = window.location.hash.replace('#', '').trim();
    if (VALID_ROUTES.includes(currentHash) && currentHash !== currentRoute) {
      setCurrentRoute(currentHash);
      syncRouteToStorage(currentHash);
    } else if (!currentHash && currentRoute !== 'dashboard') {
      window.history.replaceState({ route: currentRoute }, '', `#${currentRoute}`);
      syncRouteToStorage(currentRoute);
    }
  }, []);

  // Handle browser back button and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (VALID_ROUTES.includes(hash)) {
        setCurrentRoute(hash);
        syncRouteToStorage(hash);
      }
    };

    const handlePopState = () => {
      if (routeStack.length > 1) {
        const nextStack = [...routeStack];
        nextStack.pop();
        const prevRoute = nextStack[nextStack.length - 1];
        setRouteStack(nextStack);
        setCurrentRoute(prevRoute);
        syncRouteToStorage(prevRoute);
      } else {
        const hash = window.location.hash.replace('#', '').trim();
        if (VALID_ROUTES.includes(hash)) {
          setCurrentRoute(hash);
          syncRouteToStorage(hash);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [routeStack]);

  const navigateTo = (route: string) => {
    if (route === currentRoute) return;
    window.history.pushState({ route }, '', `#${route}`);
    syncRouteToStorage(route);
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
        className="w-full max-w-lg min-h-screen relative flex flex-col shadow-2xl overflow-x-hidden border-x border-slate-200/40 dark:border-slate-800/40 app-reveal"
      >
        {/* Top subtle live market sync shimmer bar */}
        {isRefreshingPrices && (
          <div className="absolute top-0 left-0 right-0 h-[2.5px] top-progress-shimmer z-50 pointer-events-none" />
        )}

        {/* Screen Routing with subtle transition */}
        <main className="flex-1 w-full overflow-y-auto">
          <div key={currentRoute} className="screen-transition-enter w-full">
            {currentRoute === 'dashboard' && (
              <DashboardScreen onNavigateToAllocation={() => navigateTo('allocation')} />
            )}
            {currentRoute === 'portfolio' && <PortfolioScreen />}
            {currentRoute === 'reports' && <ReportsScreen />}
            {currentRoute === 'allocation' && (
              <AllocationScreen onNavigateBack={navigateBack} />
            )}
          </div>
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

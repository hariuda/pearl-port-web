import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw } from 'lucide-react';
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
  const { isDarkMode, refreshPrices, isRefreshingPrices } = usePortfolio();

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

  // Pull-to-refresh implementation on the main scrollable container
  const mainRef = useRef<HTMLElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const touchStartY = useRef(0);
  const isPullingRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!mainRef.current) return;
    if (mainRef.current.scrollTop <= 2) {
      touchStartY.current = e.touches[0].clientY;
      isPullingRef.current = true;
    } else {
      isPullingRef.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPullingRef.current || !mainRef.current) return;
    if (mainRef.current.scrollTop > 2) {
      isPullingRef.current = false;
      setPullDistance(0);
      setIsPulling(false);
      return;
    }

    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY.current;
    if (diff > 5) {
      const distance = Math.min(Math.pow(diff, 0.85) * 1.6, 75);
      setPullDistance(distance);
      setIsPulling(true);
    } else {
      setPullDistance(0);
      setIsPulling(false);
    }
  };

  const handleTouchEnd = async () => {
    if (!isPullingRef.current) return;
    isPullingRef.current = false;

    if (pullDistance >= 45) {
      setPullDistance(48);
      try {
        await refreshPrices();
      } finally {
        setTimeout(() => {
          setPullDistance(0);
          setIsPulling(false);
        }, 400);
      }
    } else {
      setPullDistance(0);
      setIsPulling(false);
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
        {/* Screen Routing with Pull to Refresh */}
        <main
          ref={mainRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="flex-1 w-full overflow-y-auto relative overscroll-y-contain"
        >
          {/* Animated Pull to Refresh Indicator */}
          <div
            style={{
              height: `${pullDistance}px`,
              opacity: pullDistance > 10 ? Math.min(pullDistance / 35, 1) : 0,
              transition: isPulling ? 'none' : 'height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease',
            }}
            className="w-full flex items-center justify-center overflow-hidden pointer-events-none select-none"
          >
            <div
              className={`flex items-center gap-2 py-1.5 px-3.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-md border ${
                isDarkMode
                  ? 'bg-slate-800/90 text-slate-200 border-slate-700/60'
                  : 'bg-white/95 text-slate-700 border-slate-200/80'
              }`}
            >
              <RefreshCw
                size={13}
                className={`${isRefreshingPrices || pullDistance >= 45 ? 'animate-spin text-emerald-500' : 'text-slate-400'}`}
              />
              <span>
                {isRefreshingPrices
                  ? 'Updating live prices...'
                  : pullDistance >= 45
                  ? 'Release to update'
                  : 'Pull down to update'}
              </span>
            </div>
          </div>

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

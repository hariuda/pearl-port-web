import React from 'react';
import { Home, TrendingUp, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface BottomNavigationProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentRoute, onNavigate }) => {
  const { isDarkMode } = usePortfolio();

  const items = [
    { route: 'dashboard', title: 'Home', icon: Home },
    { route: 'portfolio', title: 'Portfolio', icon: TrendingUp },
    { route: 'reports', title: 'Reports', icon: FileText },
  ];

  return (
    <div
      style={{
        height: 'calc(68px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
        borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        boxShadow: isDarkMode ? '0 -4px 16px rgba(0,0,0,0.4)' : '0 -4px 16px rgba(0,0,0,0.04)',
      }}
      className="fixed bottom-0 left-0 right-0 z-40 max-w-lg mx-auto flex items-center justify-around px-2 select-none"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isSelected = currentRoute === item.route;

        return (
          <button
            key={item.route}
            onClick={() => {
              if (navigator.vibrate) navigator.vibrate(15);
              onNavigate(item.route);
            }}
            className="flex-1 flex flex-col items-center justify-center py-1 transition-all duration-150 outline-none"
            style={{
              color: isSelected
                ? isDarkMode ? '#A5B4FC' : '#2C2260'
                : isDarkMode ? '#94A3B8' : '#64748B',
            }}
          >
            {/* Pill Container */}
            <div
              className={`flex items-center justify-center transition-all duration-200 ${
                isSelected
                  ? 'px-5 py-1 rounded-full'
                  : 'px-5 py-1'
              }`}
              style={{
                backgroundColor: isSelected
                  ? isDarkMode ? 'rgba(79, 70, 229, 0.25)' : 'rgba(44, 34, 96, 0.12)'
                  : 'transparent',
              }}
            >
              <Icon size={22} strokeWidth={isSelected ? 2.5 : 2} />
            </div>
            <span
              className={`text-xs mt-1 transition-all ${
                isSelected ? 'font-bold tracking-tight' : 'font-normal opacity-85'
              }`}
              style={{ fontSize: '11.5px' }}
            >
              {item.title}
            </span>
          </button>
        );
      })}
    </div>
  );
};

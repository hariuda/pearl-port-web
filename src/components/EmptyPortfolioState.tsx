import React from 'react';
import { LucideIcon, Wallet } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface EmptyPortfolioStateProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
}

export const EmptyPortfolioState: React.FC<EmptyPortfolioStateProps> = ({
  title = "No Assets Yet",
  message = "Tap the + button to add your first investment to this category.",
  icon: Icon = Wallet
}) => {
  const { isDarkMode } = usePortfolio();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[280px]">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.15)' : 'rgba(74, 59, 140, 0.12)'
        }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: isDarkMode ? 'rgba(124, 58, 237, 0.3)' : 'rgba(74, 59, 140, 0.25)'
          }}
        >
          <Icon
            className="w-8 h-8"
            style={{
              color: isDarkMode ? '#A78BFA' : '#2C2260'
            }}
          />
        </div>
      </div>

      <h3
        className="mt-6 text-base font-bold"
        style={{ color: isDarkMode ? '#F8FAFC' : '#1A1A1A' }}
      >
        {title}
      </h3>

      <p
        className="mt-2 text-sm max-w-xs"
        style={{ color: isDarkMode ? '#94A3B8' : '#666666' }}
      >
        {message}
      </p>
    </div>
  );
};

import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface SectionTitleProps {
  title: string;
  action?: string;
  onActionClick?: () => void;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ title, action, onActionClick }) => {
  const { isDarkMode } = usePortfolio();

  return (
    <div className="w-full flex items-end justify-between px-4 pt-3 pb-1 select-none">
      <h2
        className="text-base font-bold tracking-tight"
        style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
      >
        {title}
      </h2>
      {action && (
        <button
          onClick={onActionClick}
          className="text-xs font-semibold cursor-pointer outline-none hover:underline"
          style={{ color: isDarkMode ? '#818CF8' : '#2C2260' }}
        >
          {action}
        </button>
      )}
    </div>
  );
};

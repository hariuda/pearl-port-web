import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface GradientOutlinedCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const GradientOutlinedCard: React.FC<GradientOutlinedCardProps> = ({
  children,
  className = '',
  onClick,
  style = {}
}) => {
  const { isDarkMode } = usePortfolio();

  const isClickable = !!onClick;

  return (
    <div
      onClick={onClick}
      style={{
        background: isDarkMode
          ? 'linear-gradient(135deg, #131A2B 0%, #1E283C 100%)'
          : '#FFFFFF',
        borderColor: isDarkMode ? '#2D3B54' : '#E2E8F0',
        borderRadius: '16px',
        borderWidth: '1px',
        borderStyle: 'solid',
        boxShadow: isDarkMode
          ? '0 4px 14px 0 rgba(0, 0, 0, 0.37)'
          : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        ...style
      }}
      className={`relative overflow-hidden ${isClickable ? 'active:scale-[0.99] select-none' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

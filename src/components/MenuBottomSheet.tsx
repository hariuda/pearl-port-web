import React from 'react';
import { User, CloudDownload, Info, ChevronRight, Shield } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface MenuBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile: () => void;
  onOpenBackup: () => void;
  onOpenAbout: () => void;
}

export const MenuBottomSheet: React.FC<MenuBottomSheetProps> = ({
  isOpen,
  onClose,
  onOpenProfile,
  onOpenBackup,
  onOpenAbout,
}) => {
  const { userName, isDarkMode } = usePortfolio();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm animate-fade-in">
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Modal */}
      <div
        style={{
          backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          borderTopLeftRadius: '28px',
          borderTopRightRadius: '28px',
          maxHeight: '90vh',
        }}
        className="relative z-10 w-full max-w-lg px-5 pt-3 pb-8 shadow-2xl flex flex-col animate-slide-up"
      >
        {/* Drag Handle */}
        <div className="w-full flex justify-center py-2">
          <div
            className="w-10 h-1 rounded-full"
            style={{
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
            }}
          />
        </div>

        {/* User Profile Card */}
        <div
          style={{
            backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.12)' : 'rgba(44, 34, 96, 0.08)',
            border: `1px solid ${isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(44, 34, 96, 0.15)'}`,
            borderRadius: '20px',
          }}
          className="flex items-center p-4 mt-2"
        >
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-sm flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #2C2260 0%, #4F46E5 100%)',
            }}
          >
            {userName ? userName.charAt(0).toUpperCase() : 'I'}
          </div>

          <div className="ml-3 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="font-bold text-base truncate"
                style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
              >
                {userName || 'Investor'}
              </span>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.25)' : 'rgba(44, 34, 96, 0.12)',
                  color: isDarkMode ? '#818CF8' : '#2C2260',
                }}
              >
                INVESTOR
              </span>
            </div>
            <p
              className="text-xs mt-0.5"
              style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
            >
              Pearl Port Portfolio
            </p>
          </div>
        </div>

        {/* Section Label */}
        <div className="mt-5 mb-2 px-1">
          <span
            className="text-[11px] font-bold tracking-wider uppercase"
            style={{ color: isDarkMode ? '#818CF8' : '#2C2260' }}
          >
            MENU & SETTINGS
          </span>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5">
          {/* Item 1: Investor Profile */}
          <button
            onClick={() => {
              onClose();
              onOpenProfile();
            }}
            className="flex items-center p-3.5 rounded-2xl transition-all text-left w-full active:scale-[0.99]"
            style={{
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#F8FAFC',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(44, 34, 96, 0.1)',
                color: isDarkMode ? '#A5B4FC' : '#2C2260',
              }}
            >
              <User size={20} />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div
                className="font-semibold text-sm"
                style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
              >
                Investor Profile
              </div>
              <div
                className="text-xs truncate"
                style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
              >
                Update display name & preferences
              </div>
            </div>
            <ChevronRight
              size={18}
              style={{ color: isDarkMode ? '#64748B' : '#94A3B8' }}
            />
          </button>

          {/* Item 2: Backup & Restore */}
          <button
            onClick={() => {
              onClose();
              onOpenBackup();
            }}
            className="flex items-center p-3.5 rounded-2xl transition-all text-left w-full active:scale-[0.99]"
            style={{
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#F8FAFC',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(2, 132, 199, 0.15)',
                color: '#0284C7',
              }}
            >
              <CloudDownload size={20} />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div
                className="font-semibold text-sm"
                style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
              >
                Backup & Restore
              </div>
              <div
                className="text-xs truncate"
                style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
              >
                Export snapshot or restore data from file
              </div>
            </div>
            <ChevronRight
              size={18}
              style={{ color: isDarkMode ? '#64748B' : '#94A3B8' }}
            />
          </button>

          {/* Item 3: About */}
          <button
            onClick={() => {
              onClose();
              onOpenAbout();
            }}
            className="flex items-center p-3.5 rounded-2xl transition-all text-left w-full active:scale-[0.99]"
            style={{
              backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.8)' : '#F8FAFC',
              border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#F59E0B',
              }}
            >
              <Info size={20} />
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div
                className="font-semibold text-sm"
                style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
              >
                About Pearl Port
              </div>
              <div
                className="text-xs truncate"
                style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
              >
                Version 1.0 • Sri Lanka CSE Asset Tracker
              </div>
            </div>
            <ChevronRight
              size={18}
              style={{ color: isDarkMode ? '#64748B' : '#94A3B8' }}
            />
          </button>
        </div>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-slate-500">
          <Shield size={14} className="opacity-75" />
          <span>100% Offline & Private Local Storage</span>
        </div>
      </div>
    </div>
  );
};

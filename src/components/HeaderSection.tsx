import React, { useState } from 'react';
import { Sun, Moon, Menu, User, CloudDownload, Upload, Download, Info } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { MenuBottomSheet } from './MenuBottomSheet';

export const HeaderSection: React.FC = () => {
  const {
    userName,
    setUserName,
    toggleDarkMode,
    isDarkMode,
    exportBackup,
    importBackup,
  } = usePortfolio();

  const [menuExpanded, setMenuExpanded] = useState(false);
  const [showAccountDialog, setShowAccountDialog] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [nameInput, setNameInput] = useState(userName);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Determine greeting based on current hour
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? 'Good morning,'
      : currentHour < 18
      ? 'Good afternoon,'
      : 'Good evening,';

  // Handle Export Backup
  const handleExport = () => {
    try {
      const json = exportBackup();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '_');
      link.href = url;
      link.download = `pearlport_backup_${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Backup saved successfully');
      setShowBackupDialog(false);
    } catch (e) {
      showToast('Failed to save backup');
    }
  };

  // Handle Import Backup
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = event.target?.result as string;
        if (json) {
          const success = importBackup(json);
          if (success) {
            showToast('Backup restored successfully');
          } else {
            showToast('Invalid backup data format');
          }
        }
      } catch (err) {
        showToast('Failed to parse backup file');
      }
    };
    reader.readAsText(file);
    setShowBackupDialog(false);
  };

  return (
    <div className="w-full px-4 pt-3 pb-2">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700 animate-fade-in">
          {toastMessage}
        </div>
      )}

      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <div>
          <span
            className="text-xs font-medium block"
            style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
          >
            {greeting}
          </span>
          <h1
            className="text-lg font-bold flex items-center gap-1.5 leading-tight"
            style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
          >
            {userName} <span>👋</span>
          </h1>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Quick Toggle */}
          <button
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95"
            style={{
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
              color: isDarkMode ? '#A5B4FC' : '#2C2260',
            }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setMenuExpanded(true)}
            title="Menu"
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 active:scale-95"
            style={{
              backgroundColor: isDarkMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(44, 34, 96, 0.1)',
              color: isDarkMode ? '#A5B4FC' : '#2C2260',
            }}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Modal Bottom Sheet Menu */}
      <MenuBottomSheet
        isOpen={menuExpanded}
        onClose={() => setMenuExpanded(false)}
        onOpenProfile={() => {
          setNameInput(userName);
          setShowAccountDialog(true);
        }}
        onOpenBackup={() => setShowBackupDialog(true)}
        onOpenAbout={() => setShowAboutDialog(true)}
      />

      {/* Account / Investor Profile Dialog */}
      {showAccountDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            style={{
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
              borderRadius: '24px',
            }}
            className="w-full max-w-sm p-6 shadow-2xl relative"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-indigo-500/15 text-indigo-500">
              <User size={24} />
            </div>

            <h3 className="text-xl font-bold text-center mb-1">Investor Profile</h3>
            <p className="text-xs text-center text-slate-500 mb-5">
              Customize your display name across your Pearl Port portfolio dashboard and reports.
            </p>

            <div className="mb-6">
              <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
                Display Name
              </label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Harindra"
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                style={{
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                  color: isDarkMode ? '#F8FAFC' : '#0F172A',
                }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowAccountDialog(false)}
                className="flex-1 py-2.5 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setUserName(nameInput.trim() || 'Investor');
                  setShowAccountDialog(false);
                }}
                className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backup & Restore Dialog */}
      {showBackupDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            style={{
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
              borderRadius: '24px',
            }}
            className="w-full max-w-sm p-6 shadow-2xl relative"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-sky-500/15 text-sky-500">
              <CloudDownload size={24} />
            </div>

            <h3 className="text-xl font-bold text-center mb-1">Backup & Restore</h3>
            <p className="text-xs text-center text-slate-500 mb-5">
              Secure your entire portfolio offline or transfer to another device via JSON snapshot.
            </p>

            <div className="flex flex-col gap-3 mb-6">
              {/* Export Button */}
              <button
                onClick={handleExport}
                className="flex items-center p-3.5 rounded-xl border text-left transition-all active:scale-[0.99]"
                style={{
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                }}
              >
                <div className="w-9 h-9 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center flex-shrink-0">
                  <Download size={18} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-xs font-bold">Export Backup (JSON)</div>
                  <div className="text-[11px] text-slate-500">Save all stocks, FDs, crypto & dividends</div>
                </div>
              </button>

              {/* Import Button */}
              <label
                className="flex items-center p-3.5 rounded-xl border text-left transition-all active:scale-[0.99] cursor-pointer"
                style={{
                  backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                  borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                }}
              >
                <input
                  type="file"
                  accept="application/json,.json"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Upload size={18} />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-xs font-bold">Restore from Backup</div>
                  <div className="text-[11px] text-slate-500">Load saved portfolio from JSON file</div>
                </div>
              </label>
            </div>

            <button
              onClick={() => setShowBackupDialog(false)}
              className="w-full py-2.5 text-xs font-semibold rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* About Pearl Port Dialog */}
      {showAboutDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            style={{
              backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
              borderRadius: '24px',
            }}
            className="w-full max-w-sm p-6 shadow-2xl relative"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-amber-500/15 text-amber-500">
              <Info size={24} />
            </div>

            <h3 className="text-xl font-bold text-center mb-1">Pearl Port</h3>
            <p className="text-xs text-center text-slate-500 mb-4">
              A modern investment portfolio and asset management companion built specifically for Sri Lankan investors.
            </p>

            <div
              className="p-3.5 rounded-xl border text-xs flex flex-col gap-2 mb-6"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-slate-500">App</span>
                <span className="font-bold">Pearl Port</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Version</span>
                <span className="font-bold">1.0.0 (Release)</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Market</span>
                <span className="font-bold">Colombo Stock Exchange (CSE)</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Created By</span>
                <span className="font-bold">Harindra</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800" />
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Contact</span>
                <span className="font-bold">harindra.rdh@gmail.com</span>
              </div>
            </div>

            <button
              onClick={() => setShowAboutDialog(false)}
              className="w-full py-2.5 text-xs font-bold rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

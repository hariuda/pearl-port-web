import React, { useEffect } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface AIInsightsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIInsightsDialog: React.FC<AIInsightsDialogProps> = ({ isOpen, onClose }) => {
  const { aiInsights, isFetchingInsights, generateAIInsights, isDarkMode } = usePortfolio();

  useEffect(() => {
    if (isOpen && !aiInsights && !isFetchingInsights) {
      generateAIInsights();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        style={{
          backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
          borderRadius: '24px',
        }}
        className="w-full max-w-md p-6 shadow-2xl relative max-h-[85vh] flex flex-col"
      >
        {/* Title */}
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Sparkles className="text-indigo-500" size={22} />
          <h3 className="text-lg font-bold">AI Portfolio Insights</h3>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-1 text-sm leading-relaxed">
          {isFetchingInsights ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <Loader2 className="animate-spin text-indigo-500" size={36} />
              <p className="text-xs text-slate-500">
                Analyzing portfolio with Gemini...
              </p>
            </div>
          ) : aiInsights ? (
            <div className="space-y-3 whitespace-pre-line text-xs md:text-sm text-slate-700 dark:text-slate-300">
              {aiInsights}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Could not generate insights. Tap below to retry.
              <div className="mt-3">
                <button
                  onClick={() => generateAIInsights()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  Retry Analysis
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

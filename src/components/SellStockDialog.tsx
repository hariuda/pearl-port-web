import React, { useState } from 'react';
import { StockPosition } from '../types';
import { usePortfolio } from '../context/PortfolioContext';

interface SellStockDialogProps {
  position: StockPosition | null;
  onDismiss: () => void;
  onSell: (position: StockPosition, price: number, quantity: number) => void;
}

export const SellStockDialog: React.FC<SellStockDialogProps> = ({
  position,
  onDismiss,
  onSell,
}) => {
  const { isDarkMode } = usePortfolio();
  if (!position) return null;

  const [sellPriceStr, setSellPriceStr] = useState(
    position.currentPrice > 0 ? position.currentPrice.toString() : position.averagePrice.toString()
  );
  const [sellQuantityStr, setSellQuantityStr] = useState(position.quantity.toString());

  const handleConfirm = () => {
    const price = parseFloat(sellPriceStr);
    const qty = parseInt(sellQuantityStr, 10);
    if (!isNaN(price) && price > 0 && !isNaN(qty) && qty > 0) {
      onSell(position, price, Math.min(qty, position.quantity));
      onDismiss();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        style={{
          backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
          borderRadius: '24px',
        }}
        className="w-full max-w-sm p-6 shadow-2xl relative"
      >
        <h3 className="text-lg font-bold mb-1">Log Sale</h3>
        <p className="text-xs text-slate-500 mb-4">
          Enter the sale details for <strong className="text-indigo-500">{position.symbol}</strong>. This will calculate capital gains.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Quantity Sold (Max {position.quantity})
            </label>
            <input
              type="number"
              value={sellQuantityStr}
              max={position.quantity}
              onChange={(e) => setSellQuantityStr(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-slate-600 dark:text-slate-400">
              Sell Price (LKR)
            </label>
            <input
              type="number"
              step="0.05"
              value={sellPriceStr}
              onChange={(e) => setSellPriceStr(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{
                backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC',
                borderColor: isDarkMode ? '#334155' : '#E2E8F0',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onDismiss}
            className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors shadow-sm"
          >
            Record Sale
          </button>
        </div>
      </div>
    </div>
  );
};

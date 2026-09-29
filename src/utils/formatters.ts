export function formatCurrency(amount: number, includePrefix = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return includePrefix ? 'LKR 0.00' : '0.00';
  }
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  return includePrefix ? `LKR ${formatted}` : formatted;
}

import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface PerformanceLineChartProps {
  points: number[]; // normalized 0..1 (where 0 is top, 1 is bottom or vice versa)
  rawMin: number;
  rawMax: number;
  startMillis: number;
  timeRange: string;
  lineColor?: string;
}

export const PerformanceLineChart: React.FC<PerformanceLineChartProps> = ({
  points,
  rawMin,
  rawMax,
  startMillis,
  timeRange,
  lineColor
}) => {
  const { isDarkMode } = usePortfolio();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const defaultLineColor = lineColor || (isDarkMode ? '#A78BFA' : '#4A3B8C');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = 200;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const chartHeight = height - 26; // Reserve bottom for date labels
    const gridLines = 4;
    const gridColor = isDarkMode ? 'rgba(51, 65, 85, 0.4)' : 'rgba(203, 213, 225, 0.5)';
    const labelColor = isDarkMode ? 'rgba(148, 163, 184, 0.7)' : 'rgba(100, 116, 139, 0.8)';

    ctx.font = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

    // Draw horizontal grid lines & labels
    for (let i = 0; i < gridLines; i++) {
      const y = chartHeight * (i / (gridLines - 1));
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();

      const val = rawMax - (rawMax - rawMin) * (i / (gridLines - 1));
      let formattedVal = '';
      if (val >= 1_000_000) {
        formattedVal = (val / 1_000_000).toFixed(1) + 'M';
      } else if (val >= 1_000) {
        formattedVal = (val / 1_000).toFixed(1) + 'K';
      } else {
        formattedVal = Math.round(val).toString();
      }

      ctx.fillStyle = labelColor;
      ctx.fillText(formattedVal, 6, Math.max(10, y - 4));
    }

    // Draw date labels on horizontal axis
    const numLabels = 4;
    const now = Date.now();
    for (let i = 0; i < numLabels; i++) {
      const t = new Date(startMillis + (now - startMillis) * (i / (numLabels - 1)));
      let label = '';
      if (timeRange === '1D') {
        label = t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else if (timeRange === 'ALL') {
        label = t.getFullYear().toString();
      } else {
        label = t.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }

      ctx.fillStyle = labelColor;
      const metrics = ctx.measureText(label);
      let xPos = 0;
      if (i === 0) xPos = 4;
      else if (i === numLabels - 1) xPos = width - metrics.width - 4;
      else xPos = width * (i / (numLabels - 1)) - metrics.width / 2;

      ctx.fillText(label, xPos, chartHeight + 18);
    }

    if (!points || points.length < 2) return;

    const mappedPoints: { x: number; y: number }[] = points.map((p, index) => ({
      x: width * (index / (points.length - 1)),
      y: chartHeight * p
    }));

    // Build Bezier Path
    const path = new Path2D();
    path.moveTo(mappedPoints[0].x, mappedPoints[0].y);
    for (let i = 0; i < mappedPoints.length - 1; i++) {
      const p0 = mappedPoints[i];
      const p1 = mappedPoints[i + 1];
      const controlX = (p0.x + p1.x) / 2;
      path.bezierCurveTo(controlX, p0.y, controlX, p1.y, p1.x, p1.y);
    }

    // Draw Gradient Area
    const fillPath = new Path2D(path);
    fillPath.lineTo(width, chartHeight);
    fillPath.lineTo(0, chartHeight);
    fillPath.closePath();

    const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradient.addColorStop(0, defaultLineColor + (isDarkMode ? '60' : '40')); // alpha
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.fill(fillPath);

    // Draw Main Line
    ctx.beginPath();
    ctx.strokeStyle = defaultLineColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke(path);

    // Draw Endpoint glowing dots
    const lastPt = mappedPoints[mappedPoints.length - 1];

    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = defaultLineColor + '40';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 4.5, 0, 2 * Math.PI);
    ctx.fillStyle = defaultLineColor;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(lastPt.x, lastPt.y, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();

  }, [points, rawMin, rawMax, startMillis, timeRange, defaultLineColor, isDarkMode]);

  return (
    <div className="w-full h-[200px] relative rounded-lg overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

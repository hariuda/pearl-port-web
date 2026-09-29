import React, { useRef, useEffect } from 'react';

interface SectorPieChartProps {
  data: Record<string, number>;
  colors: string[];
  size?: number;
  strokeWidth?: number;
}

export const SectorPieChart: React.FC<SectorPieChartProps> = ({
  data,
  colors,
  size = 130,
  strokeWidth = 20
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    const values = Object.values(data);
    const total = values.reduce((sum, v) => sum + v, 0);
    if (total <= 0) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = (size - strokeWidth) / 2;

    const gapDeg = values.length > 1 ? 4 : 0;
    const gapRad = (gapDeg * Math.PI) / 180;
    let startAngle = -Math.PI / 2; // -90 deg

    values.forEach((value, index) => {
      const sweepAngle = (value / total) * (2 * Math.PI);
      const color = colors[index % colors.length] || '#2C2260';

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = strokeWidth;
      ctx.lineCap = 'round';

      // Adjust for gap
      const actualStart = sweepAngle > gapRad * 1.5 && values.length > 1 ? startAngle + gapRad / 2 : startAngle;
      const actualEnd = sweepAngle > gapRad * 1.5 && values.length > 1 ? startAngle + sweepAngle - gapRad / 2 : startAngle + sweepAngle;

      ctx.arc(centerX, centerY, radius, actualStart, actualEnd, false);
      ctx.stroke();

      startAngle += sweepAngle;
    });
  }, [data, colors, size, strokeWidth]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${size}px`, height: `${size}px` }}
      className="block"
    />
  );
};

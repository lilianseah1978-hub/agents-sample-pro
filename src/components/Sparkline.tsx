import React from 'react';
import { ChartPoint } from '../types';

interface SparklineProps {
  data: ChartPoint[];
  isUp: boolean;
  width?: number;
  height?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  isUp,
  width = 72,
  height = 24,
}) => {
  if (!data || data.length < 2) {
    return <div style={{ width, height }} />;
  }

  const prices = data.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  const points = prices
    .map((price, idx) => {
      const x = (idx / (prices.length - 1)) * width;
      // flip y because SVG 0 is top
      const y = height - ((price - min) / range) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const strokeColor = isUp ? '#089981' : '#F23645';

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible shrink-0"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

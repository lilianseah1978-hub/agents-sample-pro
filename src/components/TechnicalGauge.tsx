import React from 'react';

interface TechnicalGaugeProps {
  summary: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  rsi?: number;
}

export const TechnicalGauge: React.FC<TechnicalGaugeProps> = ({ summary, rsi = 58 }) => {
  const ratings = ['Strong Sell', 'Sell', 'Neutral', 'Buy', 'Strong Buy'];
  const currentIndex = ratings.indexOf(summary);
  const activeIdx = currentIndex >= 0 ? currentIndex : 2;

  // Rotation angle for needle (-75deg to +75deg)
  const angleMap = [-72, -36, 0, 36, 72];
  const needleAngle = angleMap[activeIdx];

  const getColor = (rating: string) => {
    switch (rating) {
      case 'Strong Buy':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Buy':
        return 'text-teal-600 dark:text-teal-400 bg-teal-500/10 border-teal-500/30';
      case 'Neutral':
        return 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30';
      case 'Sell':
        return 'text-rose-500 dark:text-rose-400 bg-rose-500/10 border-rose-500/30';
      case 'Strong Sell':
        return 'text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/30';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] p-4 rounded-xl flex flex-col items-center justify-between">
      <div className="text-xs font-semibold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider mb-2">
        Technical Rating
      </div>

      {/* Semi-circle Gauge */}
      <div className="relative w-40 h-20 flex items-end justify-center overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          {/* Gauge Background Arcs */}
          <path
            d="M 10 50 A 40 40 0 0 1 26 21"
            fill="none"
            stroke="#F23645"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 28 19 A 40 40 0 0 1 48 10"
            fill="none"
            stroke="#FF9800"
            strokeWidth="8"
          />
          <path
            d="M 52 10 A 40 40 0 0 1 72 19"
            fill="none"
            stroke="#2196F3"
            strokeWidth="8"
          />
          <path
            d="M 74 21 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#089981"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>

        {/* Needle */}
        <div
          className="absolute bottom-0 left-1/2 w-1 h-14 bg-[#181c21] dark:bg-white origin-bottom -translate-x-1/2 rounded-full transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-50%) rotate(${needleAngle}deg)` }}
        />
        <div className="absolute bottom-0 left-1/2 w-3.5 h-3.5 bg-[#181c21] dark:bg-white rounded-full -translate-x-1/2 translate-y-1/2 border-2 border-white dark:border-[#1E222D]" />
      </div>

      {/* Selected Rating Badge */}
      <div
        className={`mt-3 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getColor(
          summary
        )}`}
      >
        {summary}
      </div>

      {/* Oscillators Summary */}
      <div className="w-full grid grid-cols-2 gap-2 mt-4 text-[11px] font-medium border-t border-[#E0E3EB] dark:border-[#2A2E39] pt-3 text-[#6A6D78] dark:text-[#808392]">
        <div className="text-center">
          <span className="block text-[10px] uppercase">RSI (14)</span>
          <span className="font-tabular font-bold text-[#181c21] dark:text-white">
            {rsi.toFixed(1)}
          </span>
        </div>
        <div className="text-center">
          <span className="block text-[10px] uppercase">MACD Signal</span>
          <span className="font-tabular font-bold text-[#089981]">Bullish</span>
        </div>
      </div>
    </div>
  );
};

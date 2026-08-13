import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';

interface MarketCardIndicesProps {
  indices: MarketAsset[];
  worldIndices: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onViewCategory?: () => void;
}

export const MarketCardIndices: React.FC<MarketCardIndicesProps> = ({
  indices,
  worldIndices,
  onSelectAsset,
  onViewCategory,
}) => {
  return (
    <section className="col-span-1 flex flex-col gap-3 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl p-4 overflow-hidden shadow-xs transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <h2
          onClick={onViewCategory}
          className="font-bold text-xl text-[#181c21] dark:text-white flex items-center hover:text-[#2962FF] dark:hover:text-[#2962FF] cursor-pointer transition-colors group"
        >
          Indices{' '}
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2962FF] transition-colors ml-0.5" />
        </h2>
      </div>

      {/* Main Indices List */}
      <div className="grid grid-cols-1 gap-2">
        {(indices || []).map((item) => {
          const isUp = item.changePercent >= 0;
          return (
            <div
              key={item.id}
              onClick={() => onSelectAsset(item)}
              className={`group flex items-center justify-between p-2.5 rounded-lg bg-[#F8F9FB] dark:bg-[#131722] hover:bg-[#ebeef5] dark:hover:bg-[#2A2E39] cursor-pointer transition-colors ${
                item.lastUpdateDirection === 'up'
                  ? 'animate-flash-up'
                  : item.lastUpdateDirection === 'down'
                  ? 'animate-flash-down'
                  : ''
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white font-semibold text-[10px] shrink-0"
                  style={{ backgroundColor: item.badgeBg || '#181c21' }}
                >
                  {item.badgeText}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-xs text-[#181c21] dark:text-gray-100 group-hover:text-[#2962FF] dark:group-hover:text-[#2962FF] transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-[#6A6D78] dark:text-[#808392]">
                    {item.symbol}
                  </span>
                </div>
              </div>

              {/* Sparkline chart in center */}
              <div className="hidden sm:block">
                <Sparkline data={item.chartData} isUp={isUp} width={50} height={20} />
              </div>

              <div className="flex flex-col items-end font-tabular">
                <span className="text-xs font-semibold text-[#181c21] dark:text-white">
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span
                  className={`text-[11px] font-bold ${
                    isUp ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* World Indices Section */}
      <div className="mt-2 pt-3 border-t border-[#E0E3EB] dark:border-[#2A2E39]">
        <h3 className="text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] mb-2 uppercase tracking-wider">
          World indices
        </h3>
        <div className="flex flex-col gap-1">
          {(worldIndices || []).map((item) => {
            const isUp = item.changePercent >= 0;
            return (
              <div
                key={item.id}
                onClick={() => onSelectAsset(item)}
                className={`flex justify-between items-center py-1.5 px-2 hover:bg-[#F8F9FB] dark:hover:bg-[#2A2E39] rounded transition-colors cursor-pointer group ${
                  item.lastUpdateDirection === 'up'
                    ? 'animate-flash-up'
                    : item.lastUpdateDirection === 'down'
                    ? 'animate-flash-down'
                    : ''
                }`}
              >
                <span className="text-xs text-[#46464c] dark:text-gray-300 flex items-center gap-2">
                  <span className="font-bold text-[#181c21] dark:text-white group-hover:text-[#2962FF] transition-colors">
                    {item.symbol}
                  </span>{' '}
                  <span className="truncate max-w-[90px]">{item.name}</span>
                </span>

                <Sparkline data={item.chartData} isUp={isUp} width={36} height={14} />

                <span
                  className={`font-tabular text-xs font-bold ${
                    isUp ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {item.changePercent.toFixed(1)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


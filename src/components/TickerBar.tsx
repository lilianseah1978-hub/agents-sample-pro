import React from 'react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';

interface TickerBarProps {
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  isStreaming: boolean;
  onToggleStreaming: () => void;
}

export const TickerBar: React.FC<TickerBarProps> = ({
  assets,
  onSelectAsset,
  isStreaming,
  onToggleStreaming,
}) => {
  return (
    <div className="bg-[#181c21] dark:bg-[#0c0e12] text-white text-xs border-b border-[#2A2E39] py-1 px-4 overflow-hidden select-none transition-colors">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-medium shrink-0">
          <button
            onClick={onToggleStreaming}
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase transition-colors ${
              isStreaming
                ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
            }`}
            title="Toggle Live Real-Time Price Stream"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            {isStreaming ? 'STREAMING' : 'PAUSED'}
          </button>
          <span className="hidden sm:inline text-gray-600">|</span>
        </div>

        <div className="flex items-center gap-5 overflow-x-auto no-scrollbar py-0.5 font-tabular">
          {assets.map((asset) => {
            const isUp = asset.changePercent >= 0;
            return (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset)}
                className={`flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-white/5 transition-all rounded px-2 py-1 ${
                  asset.lastUpdateDirection === 'up'
                    ? 'animate-flash-up bg-emerald-500/10'
                    : asset.lastUpdateDirection === 'down'
                    ? 'animate-flash-down bg-rose-500/10'
                    : ''
                }`}
              >
                <span className="font-bold text-gray-200 text-[11px]">{asset.symbol}</span>
                <span className="text-gray-300 font-medium">
                  {asset.price.toLocaleString(undefined, {
                    minimumFractionDigits: asset.price < 10 ? 4 : 2,
                    maximumFractionDigits: asset.price < 10 ? 4 : 2,
                  })}
                </span>
                <span
                  className={`font-bold text-[11px] ${
                    isUp ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isUp ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%
                </span>
                <Sparkline data={asset.chartData} isUp={isUp} width={40} height={16} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


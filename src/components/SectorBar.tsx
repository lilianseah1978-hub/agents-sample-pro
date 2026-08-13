import React from 'react';
import { SectorPerformance } from '../types';

interface SectorBarProps {
  sectors: SectorPerformance[];
  onSelectSector?: (sectorName: string) => void;
}

export const SectorBar: React.FC<SectorBarProps> = ({ sectors }) => {
  return (
    <div className="w-full bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl p-4 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#181c21] dark:text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2962FF]" /> Sector Performance Heatmap
        </h3>
        <span className="text-[11px] font-medium text-[#6A6D78] dark:text-[#808392]">
          Real-time S&P 500 Sectors
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {sectors.map((sector) => {
          const isUp = sector.changePercent >= 0;
          return (
            <div
              key={sector.name}
              className={`p-2.5 rounded-lg border transition-all cursor-pointer hover:scale-[1.02] ${
                isUp
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-[#089981]'
                  : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40 text-[#F23645]'
              }`}
            >
              <div className="text-[11px] font-semibold text-[#181c21] dark:text-gray-200 truncate">
                {sector.name}
              </div>
              <div className="flex items-center justify-between mt-1 font-tabular text-xs font-bold">
                <span>
                  {isUp ? '+' : ''}
                  {sector.changePercent.toFixed(2)}%
                </span>
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isUp ? 'bg-[#089981]' : 'bg-[#F23645]'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

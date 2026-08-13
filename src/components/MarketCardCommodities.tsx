import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';

interface MarketCardCommoditiesProps {
  commoditiesList: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onViewCategory?: () => void;
}

export const MarketCardCommodities: React.FC<MarketCardCommoditiesProps> = ({
  commoditiesList,
  onSelectAsset,
  onViewCategory,
}) => {
  return (
    <section className="col-span-1 flex flex-col justify-between gap-3 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl p-4 overflow-hidden shadow-xs transition-colors">
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2
            onClick={onViewCategory}
            className="font-bold text-xl text-[#181c21] dark:text-white flex items-center hover:text-[#2962FF] dark:hover:text-[#2962FF] cursor-pointer transition-colors group"
          >
            Futures & Commodities{' '}
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2962FF] transition-colors ml-0.5" />
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39]">
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider">
                  Item
                </th>
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider text-center hidden sm:table-cell">
                  Trend
                </th>
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider text-right">
                  Price
                </th>
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider text-right">
                  Chg %
                </th>
              </tr>
            </thead>
            <tbody className="font-tabular text-sm">
              {(commoditiesList || []).map((item) => {
                const isUp = item.changePercent >= 0;
                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectAsset(item)}
                    className="hover:bg-[#F8F9FB] dark:hover:bg-[#2A2E39] transition-colors group cursor-pointer border-b border-[#E0E3EB] dark:border-[#2A2E39] last:border-none"
                  >
                    <td className="py-2.5 flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                        style={{ backgroundColor: item.badgeBg || '#FFD700' }}
                      >
                        {item.badgeText || 'Au'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#181c21] dark:text-gray-100 group-hover:text-[#2962FF] dark:group-hover:text-[#2962FF] transition-colors">
                          {item.symbol}
                        </span>
                        <span className="text-[10px] text-[#6A6D78] dark:text-[#808392] truncate max-w-[100px]">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 text-center hidden sm:table-cell">
                      <Sparkline data={item.chartData} isUp={isUp} width={45} height={16} />
                    </td>

                    <td className="py-2.5 text-right font-semibold text-xs text-[#181c21] dark:text-white">
                      ${item.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-2.5 text-right text-xs font-bold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};


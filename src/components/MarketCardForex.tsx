import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';

interface MarketCardForexProps {
  forexList: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onViewCategory?: () => void;
}

export const MarketCardForex: React.FC<MarketCardForexProps> = ({
  forexList,
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
            Forex{' '}
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2962FF] transition-colors ml-0.5" />
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39]">
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider">
                  Pair
                </th>
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider text-center hidden sm:table-cell">
                  Trend
                </th>
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider text-right">
                  Rate
                </th>
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider text-right">
                  Chg %
                </th>
              </tr>
            </thead>
            <tbody className="font-tabular text-sm">
              {forexList.map((pair) => {
                const isUp = pair.changePercent >= 0;
                return (
                  <tr
                    key={pair.id}
                    onClick={() => onSelectAsset(pair)}
                    className="hover:bg-[#F8F9FB] dark:hover:bg-[#2A2E39] transition-colors group cursor-pointer border-b border-[#E0E3EB] dark:border-[#2A2E39] last:border-none"
                  >
                    <td className="py-2.5 flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#003399] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {pair.badgeText || 'FX'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#181c21] dark:text-gray-100 group-hover:text-[#2962FF] dark:group-hover:text-[#2962FF] transition-colors">
                          {pair.symbol}
                        </span>
                        <span className="text-[10px] text-[#6A6D78] dark:text-[#808392] truncate max-w-[100px]">
                          {pair.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 text-center hidden sm:table-cell">
                      <Sparkline data={pair.chartData} isUp={isUp} width={45} height={16} />
                    </td>

                    <td className="py-2.5 text-right font-semibold text-xs text-[#181c21] dark:text-white">
                      {pair.price < 10 ? pair.price.toFixed(4) : pair.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-2.5 text-right text-xs font-bold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {pair.changePercent.toFixed(2)}%
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


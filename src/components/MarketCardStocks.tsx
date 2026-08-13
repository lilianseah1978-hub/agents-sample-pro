import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';

interface MarketCardStocksProps {
  stocks: MarketAsset[];
  volumeTags: string[];
  onSelectAsset: (asset: MarketAsset) => void;
  onSelectTag?: (tag: string) => void;
  onViewCategory?: () => void;
}

export const MarketCardStocks: React.FC<MarketCardStocksProps> = ({
  stocks,
  volumeTags,
  onSelectAsset,
  onSelectTag,
  onViewCategory,
}) => {
  return (
    <section className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-between gap-3 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl p-4 overflow-hidden shadow-xs transition-colors">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2
            onClick={onViewCategory}
            className="font-bold text-xl text-[#181c21] dark:text-white flex items-center hover:text-[#2962FF] dark:hover:text-[#2962FF] cursor-pointer transition-colors group"
          >
            US Stocks{' '}
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2962FF] transition-colors ml-0.5" />
          </h2>
        </div>

        {/* Stocks Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39]">
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider">
                  Symbol
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
              {(stocks || []).slice(0, 5).map((stock) => {
                const isUp = stock.changePercent >= 0;
                return (
                  <tr
                    key={stock.id}
                    onClick={() => onSelectAsset(stock)}
                    className={`hover:bg-[#F8F9FB] dark:hover:bg-[#2A2E39] transition-colors group cursor-pointer border-b border-[#E0E3EB] dark:border-[#2A2E39] last:border-none ${
                      stock.lastUpdateDirection === 'up'
                        ? 'animate-flash-up'
                        : stock.lastUpdateDirection === 'down'
                        ? 'animate-flash-down'
                        : ''
                    }`}
                  >
                    <td className="py-2.5 flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#ebeef5] dark:bg-[#2A2E39] flex items-center justify-center text-[10px] font-bold text-[#181c21] dark:text-gray-200 shrink-0">
                        {stock.badgeText || stock.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#181c21] dark:text-gray-100 group-hover:text-[#2962FF] dark:group-hover:text-[#2962FF] transition-colors truncate max-w-[100px]">
                          {stock.symbol}
                        </span>
                        <span className="text-[10px] text-[#6A6D78] dark:text-[#808392] truncate max-w-[100px]">
                          {stock.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 text-center hidden sm:table-cell">
                      <Sparkline data={stock.chartData} isUp={isUp} width={45} height={16} />
                    </td>

                    <td className="py-2.5 text-right font-semibold text-xs text-[#181c21] dark:text-white">
                      ${stock.price.toFixed(2)}
                    </td>
                    <td
                      className={`py-2.5 text-right text-xs font-bold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Highest Volume Section */}
      <div className="mt-2 pt-3 border-t border-[#E0E3EB] dark:border-[#2A2E39]">
        <h3 className="text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] mb-2 uppercase tracking-wider">
          Highest Volume Tickers
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {(volumeTags || []).map((tag) => (
            <button
              key={tag}
              onClick={() => {
                const matched = stocks.find((s) => s.symbol === tag);
                if (matched) {
                  onSelectAsset(matched);
                } else if (onSelectTag) {
                  onSelectTag(tag);
                }
              }}
              className="bg-[#F8F9FB] dark:bg-[#131722] hover:bg-[#ebeef5] dark:hover:bg-[#2A2E39] hover:border-[#2962FF] px-2.5 py-1 rounded text-[11px] font-bold font-tabular border border-[#E0E3EB] dark:border-[#2A2E39] text-[#181c21] dark:text-gray-200 transition-all cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};


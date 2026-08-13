import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MarketAsset } from '../types';
import { Sparkline } from './Sparkline';

interface MarketCardCryptoProps {
  cryptoList: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onViewCategory?: () => void;
}

export const MarketCardCrypto: React.FC<MarketCardCryptoProps> = ({
  cryptoList,
  onSelectAsset,
  onViewCategory,
}) => {
  return (
    <section className="col-span-1 lg:col-span-1 flex flex-col justify-between gap-3 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl p-4 overflow-hidden shadow-xs transition-colors">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h2
            onClick={onViewCategory}
            className="font-bold text-xl text-[#181c21] dark:text-white flex items-center hover:text-[#2962FF] dark:hover:text-[#2962FF] cursor-pointer transition-colors group"
          >
            Crypto{' '}
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2962FF] transition-colors ml-0.5" />
          </h2>
        </div>

        {/* Crypto Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39]">
                <th className="py-2 text-[11px] font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider">
                  Coin
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
              {(cryptoList || []).slice(0, 5).map((coin) => {
                const isUp = coin.changePercent > 0;
                const isZero = coin.changePercent === 0;
                return (
                  <tr
                    key={coin.id}
                    onClick={() => onSelectAsset(coin)}
                    className={`hover:bg-[#F8F9FB] dark:hover:bg-[#2A2E39] transition-colors group cursor-pointer border-b border-[#E0E3EB] dark:border-[#2A2E39] last:border-none ${
                      coin.lastUpdateDirection === 'up'
                        ? 'animate-flash-up'
                        : coin.lastUpdateDirection === 'down'
                        ? 'animate-flash-down'
                        : ''
                    }`}
                  >
                    <td className="py-2.5 flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-xs"
                        style={{ backgroundColor: coin.badgeBg || '#F7931A' }}
                      >
                        {coin.badgeText || '₿'}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs text-[#181c21] dark:text-gray-100 group-hover:text-[#2962FF] dark:group-hover:text-[#2962FF] transition-colors">
                          {coin.symbol}
                        </span>
                        <span className="text-[10px] text-[#6A6D78] dark:text-[#808392]">
                          {coin.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2.5 text-center hidden sm:table-cell">
                      <Sparkline data={coin.chartData} isUp={isUp} width={45} height={16} />
                    </td>

                    <td className="py-2.5 text-right font-semibold text-xs text-[#181c21] dark:text-white">
                      ${coin.price >= 1000
                        ? coin.price.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : coin.price.toFixed(coin.price < 1 ? 4 : 2)}
                    </td>
                    <td
                      className={`py-2.5 text-right text-xs font-bold ${
                        isZero
                          ? 'text-[#6A6D78] dark:text-[#808392]'
                          : isUp
                          ? 'text-[#089981]'
                          : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {coin.changePercent.toFixed(coin.changePercent === 0 ? 2 : 1)}%
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


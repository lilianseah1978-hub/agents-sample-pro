import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { MarketAsset } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const filtered = assets.filter((item) => {
    const matchesCat = filterCat === 'all' || item.category === filterCat;
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.symbol.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh] transition-colors">
        {/* Search Header */}
        <div className="p-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol or market (e.g., NVDA, Bitcoin, S&P 500)..."
            className="w-full text-base font-medium text-[#181c21] dark:text-white placeholder:text-gray-400 border-none outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[11px] font-bold px-2 py-1 rounded bg-gray-100 dark:bg-[#2A2E39] text-gray-600 dark:text-gray-300 hover:bg-gray-200"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Tags */}
        <div className="px-4 py-2 border-b border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FB] dark:bg-[#1E222D] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['all', 'indices', 'stocks', 'crypto', 'forex', 'commodities'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                filterCat === cat
                  ? 'bg-[#181c21] dark:bg-white text-white dark:text-[#181c21]'
                  : 'bg-white dark:bg-[#2A2E39] text-gray-600 dark:text-gray-300 border border-[#E0E3EB] dark:border-[#2A2E39] hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-gray-100 dark:divide-[#2A2E39]">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-500 dark:text-gray-400">
              No matching assets found for "{query}"
            </div>
          ) : (
            filtered.map((asset) => {
              const isUp = asset.changePercent >= 0;
              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-[#F8F9FB] dark:hover:bg-[#1E222D] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                      style={{ backgroundColor: asset.badgeBg || '#181c21' }}
                    >
                      {asset.badgeText || asset.symbol.slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#181c21] dark:text-white group-hover:text-[#2962FF] transition-colors">
                          {asset.name}
                        </span>
                        <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#2A2E39] text-gray-600 dark:text-gray-300 font-tabular">
                          {asset.symbol}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {asset.category} • {asset.subRegion || 'Global'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right font-tabular">
                      <div className="text-sm font-semibold text-[#181c21] dark:text-white">
                        ${asset.price.toLocaleString(undefined, {
                          minimumFractionDigits: asset.price < 10 ? 4 : 2,
                          maximumFractionDigits: asset.price < 10 ? 4 : 2,
                        })}
                      </div>
                      <div
                        className={`text-xs font-bold flex items-center justify-end gap-0.5 ${
                          isUp ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isUp ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {isUp ? '+' : ''}
                        {asset.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#2962FF] transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};


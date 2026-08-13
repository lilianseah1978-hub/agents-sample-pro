import React from 'react';
import { X, Trash2, Bookmark, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketAsset } from '../types';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: MarketAsset[];
  onSelectAsset: (asset: MarketAsset) => void;
  onRemoveBookmark: (asset: MarketAsset) => void;
  onClearWatchlist: () => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onSelectAsset,
  onRemoveBookmark,
  onClearWatchlist,
}) => {
  if (!isOpen) return null;

  const safeWatchlist = watchlist || [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#131722] border-l border-[#E0E3EB] dark:border-[#2A2E39] shadow-2xl flex flex-col z-10 transition-colors">
          {/* Header */}
          <div className="p-5 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between bg-[#F8F9FB] dark:bg-[#1E222D]">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#2962FF] text-white rounded-lg shadow-xs">
                <Bookmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-[#181c21] dark:text-white">
                  My Watchlist
                </h3>
                <p className="text-xs text-[#6A6D78] dark:text-[#808392]">
                  {safeWatchlist.length} saved symbol{safeWatchlist.length === 1 ? '' : 's'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {safeWatchlist.length > 0 && (
                <button
                  onClick={onClearWatchlist}
                  className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-2.5 py-1.5 rounded transition-colors"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#2A2E39] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {safeWatchlist.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/40 text-[#2962FF] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-[#181c21] dark:text-white mb-1">
                  Watchlist is Empty
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Click the bookmark icon on any asset or detail modal to save symbols to your watchlist for instant tracking.
                </p>
              </div>
            ) : (
              safeWatchlist.map((asset) => {
                const isUp = asset.changePercent >= 0;
                return (
                  <div
                    key={asset.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-[#E0E3EB] dark:border-[#2A2E39] hover:border-[#2962FF] dark:hover:border-[#2962FF] hover:shadow-xs transition-all group bg-white dark:bg-[#1E222D]"
                  >
                    <div
                      onClick={() => {
                        onSelectAsset(asset);
                        onClose();
                      }}
                      className="flex items-center gap-3 cursor-pointer flex-1"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: asset.badgeBg || '#181c21' }}
                      >
                        {asset.badgeText || asset.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#181c21] dark:text-white group-hover:text-[#2962FF] transition-colors">
                          {asset.symbol}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                          {asset.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div
                        onClick={() => {
                          onSelectAsset(asset);
                          onClose();
                        }}
                        className="text-right font-tabular cursor-pointer"
                      >
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

                      <button
                        onClick={() => onRemoveBookmark(asset)}
                        className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors opacity-80 group-hover:opacity-100"
                        title="Remove from watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


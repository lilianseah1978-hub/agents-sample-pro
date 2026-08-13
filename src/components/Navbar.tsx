import React from 'react';
import { Search, Bookmark, Sun, Moon, Zap } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount,
  activeCategory,
  onSelectCategory,
  theme,
  onToggleTheme,
}) => {
  return (
    <nav className="bg-white dark:bg-[#131722] border-b border-[#E0E3EB] dark:border-[#2A2E39] sticky top-0 z-40 transition-colors">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 h-16 max-w-[1280px] mx-auto">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
            }}
            className="text-[28px] font-bold text-primary flex items-center leading-none tracking-tight group"
            aria-label="TradingView"
          >
            <svg
              className="mr-2 text-[#181c21] dark:text-white transition-colors"
              fill="none"
              height="20"
              viewBox="0 0 28 20"
              width="28"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L8 16H4L8 4H12ZM20 4L16 16H12L16 4H20ZM28 4L24 16H20L24 4H28Z"
                fill="currentColor"
              />
            </svg>
            <span className="hidden sm:inline font-bold text-lg tracking-tight text-[#181c21] dark:text-white">
              TradingView
            </span>
            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-[#2962FF] text-white rounded tracking-wider">
              PRO
            </span>
          </a>

          {/* Search Trigger Input */}
          <div
            onClick={onOpenSearch}
            className="relative hidden md:block w-64 cursor-pointer group"
          >
            <span className="absolute inset-y-0 left-3 flex items-center text-[#6A6D78] dark:text-[#808392]">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              readOnly
              placeholder="Search symbol (Ctrl+K)..."
              className="w-full bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-full py-1.5 pl-9 pr-4 text-xs font-medium text-[#181c21] dark:text-gray-200 cursor-pointer group-hover:border-[#2962FF] transition-colors placeholder:text-[#6A6D78] dark:placeholder:text-[#808392]"
            />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <ul className="hidden lg:flex items-center gap-6 h-full text-xs uppercase font-bold tracking-wider pt-1">
          <li>
            <button
              onClick={() => onSelectCategory('all')}
              className={`transition-colors py-5 border-b-2 ${
                activeCategory === 'all'
                  ? 'text-[#2962FF] border-[#2962FF]'
                  : 'text-[#6A6D78] dark:text-[#808392] border-transparent hover:text-[#181c21] dark:hover:text-white'
              }`}
            >
              Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelectCategory('indices')}
              className={`transition-colors py-5 border-b-2 ${
                activeCategory === 'indices'
                  ? 'text-[#2962FF] border-[#2962FF]'
                  : 'text-[#6A6D78] dark:text-[#808392] border-transparent hover:text-[#181c21] dark:hover:text-white'
              }`}
            >
              Indices
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelectCategory('stocks')}
              className={`transition-colors py-5 border-b-2 ${
                activeCategory === 'stocks'
                  ? 'text-[#2962FF] border-[#2962FF]'
                  : 'text-[#6A6D78] dark:text-[#808392] border-transparent hover:text-[#181c21] dark:hover:text-white'
              }`}
            >
              US Stocks
            </button>
          </li>
          <li>
            <button
              onClick={() => onSelectCategory('crypto')}
              className={`transition-colors py-5 border-b-2 ${
                activeCategory === 'crypto'
                  ? 'text-[#2962FF] border-[#2962FF]'
                  : 'text-[#6A6D78] dark:text-[#808392] border-transparent hover:text-[#181c21] dark:hover:text-white'
              }`}
            >
              Crypto
            </button>
          </li>
        </ul>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live Market Status Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>US MARKETS OPEN</span>
          </div>

          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 text-[#6A6D78] dark:text-[#808392] hover:text-[#181c21] dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-[#1E222D]"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-[#6A6D78] dark:text-[#808392] hover:text-[#181c21] dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-[#1E222D]"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          {/* Watchlist Drawer Toggle */}
          <button
            onClick={onOpenWatchlist}
            className="relative flex items-center gap-1 text-[#6A6D78] dark:text-[#808392] hover:text-[#181c21] dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E222D]"
            title="Open Watchlist"
          >
            <Bookmark className="w-5 h-5" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#2962FF] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {watchlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-1.5 bg-[#2962FF] text-white text-xs font-semibold px-3.5 py-2 rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Live Terminal
          </button>
        </div>
      </div>
    </nav>
  );
};


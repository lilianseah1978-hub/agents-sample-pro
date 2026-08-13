/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  initialIndices,
  initialWorldIndices,
  initialUsStocks,
  highestVolumeTags,
  initialCrypto,
  initialForex,
  initialCommodities,
} from './data/mockMarketData';
import { MarketAsset, ThemeMode } from './types';
import { TickerBar } from './components/TickerBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SectorBar } from './components/SectorBar';
import { MarketCardIndices } from './components/MarketCardIndices';
import { MarketCardStocks } from './components/MarketCardStocks';
import { MarketCardCrypto } from './components/MarketCardCrypto';
import { MarketCardForex } from './components/MarketCardForex';
import { MarketCardCommodities } from './components/MarketCardCommodities';
import { SymbolDetailModal } from './components/SymbolDetailModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { DisqusForum } from './components/DisqusForum';
import { Footer } from './components/Footer';

export default function App() {
  const [indices, setIndices] = useState<MarketAsset[]>(initialIndices);
  const [worldIndices, setWorldIndices] = useState<MarketAsset[]>(initialWorldIndices);
  const [usStocks, setUsStocks] = useState<MarketAsset[]>(initialUsStocks);
  const [crypto, setCrypto] = useState<MarketAsset[]>(initialCrypto);
  const [forex, setForex] = useState<MarketAsset[]>(initialForex);
  const [commodities, setCommodities] = useState<MarketAsset[]>(initialCommodities);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAsset, setSelectedAsset] = useState<MarketAsset | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isWatchlistOpen, setIsWatchlistOpen] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);

  // Theme Mode (Dark by default for pro terminal feel)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('apex_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // fallback
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('apex_theme', theme);
    } catch {
      // fallback
    }
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Watchlist LocalStorage persistence
  const [watchlist, setWatchlist] = useState<MarketAsset[]>(() => {
    try {
      const saved = localStorage.getItem('apex_watchlist');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return [initialUsStocks[0], initialCrypto[0]]; // NVDA, BTC default
  });

  useEffect(() => {
    try {
      localStorage.setItem('apex_watchlist', JSON.stringify(watchlist));
    } catch {
      // fallback
    }
  }, [watchlist]);

  // Combined asset list for global search and ticker bar
  const allAssets = [
    ...indices,
    ...worldIndices,
    ...usStocks,
    ...crypto,
    ...forex,
    ...commodities,
  ];

  // Simulated Live Price Streaming Engine
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      // Pick 1-2 random assets to tick
      const listPickers = [
        { list: indices, setList: setIndices },
        { list: worldIndices, setList: setWorldIndices },
        { list: usStocks, setList: setUsStocks },
        { list: crypto, setList: setCrypto },
        { list: forex, setList: setForex },
        { list: commodities, setList: setCommodities },
      ];

      const chosenIndex = Math.floor(Math.random() * listPickers.length);
      const targetGroup = listPickers[chosenIndex];

      targetGroup.setList((prev) => {
        if (prev.length === 0) return prev;
        const itemIdx = Math.floor(Math.random() * prev.length);
        const item = prev[itemIdx];

        const deltaPercent = (Math.random() - 0.49) * 0.4; // -0.2% to +0.2%
        const priceShift = item.price * (deltaPercent / 100);
        const newPrice = Math.max(0.01, item.price + priceShift);
        const newChangePercent = item.changePercent + deltaPercent;
        const direction = deltaPercent >= 0 ? 'up' : 'down';

        const updated = [...prev];
        updated[itemIdx] = {
          ...item,
          price: parseFloat(newPrice.toFixed(newPrice < 10 ? 4 : 2)),
          changePercent: parseFloat(newChangePercent.toFixed(2)),
          lastUpdateDirection: direction,
          chartData: [
            ...item.chartData.slice(1),
            {
              time: `${new Date().getHours().toString().padStart(2, '0')}:${new Date()
                .getMinutes()
                .toString()
                .padStart(2, '0')}`,
              price: parseFloat(newPrice.toFixed(2)),
            },
          ],
        };

        // Clear animation flag after 1s
        setTimeout(() => {
          targetGroup.setList((currentList) =>
            currentList.map((a) =>
              a.id === item.id ? { ...a, lastUpdateDirection: null } : a
            )
          );
        }, 1000);

        return updated;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isStreaming, indices, worldIndices, usStocks, crypto, forex, commodities]);

  const toggleBookmark = (asset: MarketAsset) => {
    setWatchlist((prev) => {
      const exists = prev.some((item) => item.id === asset.id);
      if (exists) {
        return prev.filter((item) => item.id !== asset.id);
      } else {
        return [...prev, asset];
      }
    });
  };

  const isAssetBookmarked = (asset: MarketAsset) => {
    return watchlist.some((item) => item.id === asset.id);
  };

  return (
    <div className="bg-[#f0f3fa] dark:bg-[#131722] text-[#181c21] dark:text-[#d1d4dc] min-h-screen flex flex-col font-sans selection:bg-[#2962FF] selection:text-white transition-colors">
      {/* Top Streaming Live Ticker Ribbon */}
      <TickerBar
        assets={allAssets.slice(0, 8)}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
        isStreaming={isStreaming}
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
      />

      {/* Main TradingView Header Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWatchlist={() => setIsWatchlistOpen(true)}
        watchlistCount={watchlist.length}
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* Hero Banner Section */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onSelectAsset={(asset) => setSelectedAsset(asset)}
          onOpenAIInsights={() => {
            if (allAssets.length > 0) {
              setSelectedAsset(allAssets[0]);
            }
          }}
        />

        {/* Sector Heatmap & Performance Bar */}
        <SectorBar
          onSelectSector={(sectorName) => {
            if (sectorName.toLowerCase().includes('tech')) setSelectedCategory('stocks');
            else if (sectorName.toLowerCase().includes('crypto')) setSelectedCategory('crypto');
            else setSelectedCategory('all');
          }}
        />

        {/* Markets Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedCategory === 'all' ||
            selectedCategory === 'markets' ||
            selectedCategory === 'indices') && (
            <MarketCardIndices
              indices={indices}
              worldIndices={worldIndices}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onViewCategory={() => setSelectedCategory('indices')}
            />
          )}

          {(selectedCategory === 'all' ||
            selectedCategory === 'markets' ||
            selectedCategory === 'stocks') && (
            <MarketCardStocks
              stocks={usStocks}
              volumeTags={highestVolumeTags}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onSelectTag={(tag) => {
                const found = usStocks.find((s) => s.symbol === tag);
                if (found) setSelectedAsset(found);
              }}
              onViewCategory={() => setSelectedCategory('stocks')}
            />
          )}

          {(selectedCategory === 'all' ||
            selectedCategory === 'markets' ||
            selectedCategory === 'crypto') && (
            <MarketCardCrypto
              cryptoList={crypto}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onViewCategory={() => setSelectedCategory('crypto')}
            />
          )}

          {(selectedCategory === 'all' ||
            selectedCategory === 'forex') && (
            <MarketCardForex
              forexList={forex}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onViewCategory={() => setSelectedCategory('forex')}
            />
          )}

          {(selectedCategory === 'all' ||
            selectedCategory === 'commodities') && (
            <MarketCardCommodities
              commoditiesList={commodities}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onViewCategory={() => setSelectedCategory('commodities')}
            />
          )}
        </div>

        {/* Embedded Disqus Forum */}
        <DisqusForum />
      </main>

      {/* Footer */}
      <Footer />

      {/* Symbol Detail Chart Modal with Gemini AI Analysis */}
      {selectedAsset && (
        <SymbolDetailModal
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          isBookmarked={isAssetBookmarked(selectedAsset)}
          onToggleBookmark={toggleBookmark}
        />
      )}

      {/* Search Modal (Ctrl+K or click) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={allAssets}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
      />

      {/* Watchlist Slide-over Drawer */}
      <WatchlistDrawer
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchlist={watchlist}
        onSelectAsset={(asset) => setSelectedAsset(asset)}
        onRemoveBookmark={toggleBookmark}
        onClearWatchlist={() => setWatchlist([])}
      />
    </div>
  );
}


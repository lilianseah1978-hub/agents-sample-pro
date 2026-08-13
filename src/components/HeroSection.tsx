import React, { useState } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenAIInsights: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  onOpenAIInsights,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Markets' },
    { id: 'indices', label: 'Indices' },
    { id: 'stocks', label: 'US Stocks' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'forex', label: 'Forex' },
    { id: 'commodities', label: 'Futures & Commodities' },
  ];

  return (
    <header className="text-center py-6 sm:py-8 flex flex-col items-center gap-3 sm:gap-4">
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group font-bold text-3xl sm:text-4xl md:text-[44px] text-[#181c21] dark:text-white flex items-center gap-2 justify-center hover:opacity-80 transition-all cursor-pointer tracking-tight"
        >
          Markets, everywhere
          <ChevronDown
            className={`w-7 h-7 sm:w-8 sm:h-8 text-[#181c21] dark:text-white transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-20 cursor-default"
            />
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl shadow-xl py-2 z-30 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6A6D78] dark:text-[#808392] border-b border-[#E0E3EB] dark:border-[#2A2E39]">
                Select Market View
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between hover:bg-[#F8F9FB] dark:hover:bg-[#2A2E39] transition-colors ${
                    selectedCategory === cat.id
                      ? 'font-bold text-[#2962FF]'
                      : 'text-[#181c21] dark:text-gray-200'
                  }`}
                >
                  {cat.label}
                  {selectedCategory === cat.id && <Check className="w-4 h-4 text-[#2962FF]" />}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Category Filter Pills & AI Insights Trigger */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-1 px-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all ${
              selectedCategory === cat.id
                ? 'bg-[#181c21] dark:bg-white text-white dark:text-[#181c21] shadow-sm'
                : 'bg-[#F8F9FB] dark:bg-[#1E222D] text-[#6A6D78] dark:text-[#808392] hover:bg-[#ebeef5] dark:hover:bg-[#2A2E39] hover:text-[#181c21] dark:hover:text-white border border-[#E0E3EB] dark:border-[#2A2E39]'
            }`}
          >
            {cat.label}
          </button>
        ))}

        <button
          onClick={onOpenAIInsights}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 active:scale-95 transition-all shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Macro Analysis
        </button>
      </div>
    </header>
  );
};


import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  TrendingDown,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  Loader2,
  BarChart3,
  RefreshCw,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { MarketAsset, AIAnalysisState } from '../types';
import { TechnicalGauge } from './TechnicalGauge';

interface SymbolDetailModalProps {
  asset: MarketAsset | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (asset: MarketAsset) => void;
}

export const SymbolDetailModal: React.FC<SymbolDetailModalProps> = ({
  asset,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (!asset) return null;

  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');
  const [aiState, setAiState] = useState<AIAnalysisState>({
    loading: false,
    text: null,
    error: null,
  });

  const isUp = asset.changePercent >= 0;

  // 52-week position calculation
  const low52 = asset.fiftyTwoWeekLow || asset.price * 0.7;
  const high52 = asset.fiftyTwoWeekHigh || asset.price * 1.3;
  const range52Pct = Math.min(
    100,
    Math.max(0, ((asset.price - low52) / (high52 - low52 || 1)) * 100)
  );

  const handleFetchAiAnalysis = async () => {
    setAiState({ loading: true, text: null, error: null });
    try {
      const res = await fetch('/api/market-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          symbol: asset.symbol,
          name: asset.name,
          price: asset.price,
          change: asset.changePercent,
          category: asset.category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate AI analysis.');
      }
      setAiState({ loading: false, text: data.analysis, error: null });
    } catch (err: any) {
      setAiState({
        loading: false,
        text: null,
        error: err.message || 'An error occurred while contacting AI analyst.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#131722] border border-[#E0E3EB] dark:border-[#2A2E39] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col transition-colors">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-start justify-between bg-[#F8F9FB] dark:bg-[#1E222D]">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-xs shrink-0"
              style={{ backgroundColor: asset.badgeBg || '#181c21' }}
            >
              {asset.badgeText || asset.symbol.slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-[#181c21] dark:text-white tracking-tight">
                  {asset.name}
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#ebeef5] dark:bg-[#2A2E39] text-[#181c21] dark:text-gray-200 font-tabular">
                  {asset.symbol}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded uppercase bg-blue-50 dark:bg-blue-950/40 text-[#2962FF]">
                  {asset.category}
                </span>
              </div>
              <p className="text-xs text-[#6A6D78] dark:text-[#808392] mt-0.5">
                Real-Time Market Terminal • {asset.subRegion || 'Global'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(asset)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isBookmarked
                  ? 'bg-blue-50 dark:bg-blue-950/40 text-[#2962FF] border border-[#2962FF]/30'
                  : 'bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] text-[#181c21] dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#2A2E39]'
              }`}
            >
              {isBookmarked ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-[#2962FF]" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-[#6A6D78] dark:text-[#808392]" />
                  Watchlist
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-[#2A2E39] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Price & Timeframe Controls */}
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-tabular text-[#181c21] dark:text-white">
                  ${asset.price.toLocaleString(undefined, {
                    minimumFractionDigits: asset.price < 10 ? 4 : 2,
                    maximumFractionDigits: asset.price < 10 ? 4 : 2,
                  })}
                </span>
                <span
                  className={`flex items-center gap-1 font-bold font-tabular text-sm px-2.5 py-1 rounded-md ${
                    isUp
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#089981]'
                      : 'bg-rose-50 dark:bg-rose-950/40 text-[#F23645]'
                  }`}
                >
                  {isUp ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {isUp ? '+' : ''}
                  {asset.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Timeframe Controls */}
            <div className="flex items-center gap-1 bg-[#F8F9FB] dark:bg-[#1E222D] p-1 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39]">
              {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                    timeframe === tf
                      ? 'bg-white dark:bg-[#2A2E39] text-[#2962FF] dark:text-white shadow-xs'
                      : 'text-[#6A6D78] dark:text-[#808392] hover:text-[#181c21] dark:hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Chart & Technical Gauge Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Interactive Chart (2 Columns) */}
            <div className="lg:col-span-2 h-72 w-full bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={asset.chartData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={isUp ? '#089981' : '#F23645'}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={isUp ? '#089981' : '#F23645'}
                        stopOpacity={0.0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    stroke="#808392"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    domain={['auto', 'auto']}
                    stroke="#808392"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E222D',
                      color: '#fff',
                      borderRadius: '8px',
                      borderColor: '#2A2E39',
                      fontSize: '12px',
                      fontFamily: 'JetBrains Mono',
                    }}
                    formatter={(val: any) => [`$${Number(val).toFixed(2)}`, 'Price']}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isUp ? '#089981' : '#F23645'}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Technical Sentiment Gauge (1 Column) */}
            <div className="lg:col-span-1">
              <TechnicalGauge
                summary={asset.technicalSummary || 'Buy'}
                rsi={asset.rsi || 58.4}
              />
            </div>
          </div>

          {/* 52-Week Price Range Slider Visual */}
          <div className="bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] p-4 rounded-xl">
            <div className="flex justify-between text-xs font-bold text-[#6A6D78] dark:text-[#808392] mb-1">
              <span>52W Low: ${low52.toLocaleString()}</span>
              <span className="uppercase text-[#181c21] dark:text-gray-200">
                52-Week Range Position
              </span>
              <span>52W High: ${high52.toLocaleString()}</span>
            </div>
            <div className="relative w-full h-2.5 bg-gray-200 dark:bg-[#2A2E39] rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 left-0 bg-linear-to-r from-blue-500 to-emerald-500 rounded-full"
                style={{ width: `${range52Pct}%` }}
              />
            </div>
          </div>

          {/* Key Market Stats Grid */}
          <div>
            <h3 className="text-xs font-bold text-[#6A6D78] dark:text-[#808392] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#2962FF]" /> Key Market Metrics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] p-3 rounded-xl">
                <span className="text-[11px] text-[#6A6D78] dark:text-[#808392] block font-medium">
                  24h High
                </span>
                <span className="text-sm font-bold font-tabular text-[#181c21] dark:text-white">
                  ${asset.high24h ? asset.high24h.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] p-3 rounded-xl">
                <span className="text-[11px] text-[#6A6D78] dark:text-[#808392] block font-medium">
                  24h Low
                </span>
                <span className="text-sm font-bold font-tabular text-[#181c21] dark:text-white">
                  ${asset.low24h ? asset.low24h.toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] p-3 rounded-xl">
                <span className="text-[11px] text-[#6A6D78] dark:text-[#808392] block font-medium">
                  Volume
                </span>
                <span className="text-sm font-bold font-tabular text-[#181c21] dark:text-white">
                  {asset.volume || 'N/A'}
                </span>
              </div>
              <div className="bg-[#F8F9FB] dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] p-3 rounded-xl">
                <span className="text-[11px] text-[#6A6D78] dark:text-[#808392] block font-medium">
                  Market Cap / Val
                </span>
                <span className="text-sm font-bold font-tabular text-[#181c21] dark:text-white">
                  {asset.marketCap || 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* AI Market Analyst Section (Gemini API Integration) */}
          <div className="bg-linear-to-r from-blue-50/70 via-indigo-50/50 to-purple-50/70 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 border border-blue-200/80 dark:border-blue-800/40 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#2962FF] text-white rounded-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#181c21] dark:text-white">
                    Gemini AI Technical Breakdown
                  </h4>
                  <p className="text-[11px] text-[#6A6D78] dark:text-[#808392]">
                    Real-time AI technical catalyst breakdown for {asset.symbol}
                  </p>
                </div>
              </div>

              <button
                onClick={handleFetchAiAnalysis}
                disabled={aiState.loading}
                className="flex items-center gap-1.5 bg-[#2962FF] text-white hover:bg-blue-700 disabled:opacity-50 text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-xs"
              >
                {aiState.loading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    {aiState.text ? 'Re-Analyze' : 'Generate Insight'}
                  </>
                )}
              </button>
            </div>

            {aiState.error && (
              <div className="text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/40">
                {aiState.error}
              </div>
            )}

            {aiState.text && (
              <div className="text-xs text-[#181c21] dark:text-gray-200 leading-relaxed bg-white/90 dark:bg-[#131722]/90 backdrop-blur-xs p-3.5 rounded-lg border border-blue-100 dark:border-blue-900/30 whitespace-pre-line font-mono">
                {aiState.text}
              </div>
            )}

            {!aiState.text && !aiState.loading && !aiState.error && (
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                Click "Generate Insight" to request Gemini AI technical assessment and support/resistance outlook for this asset.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


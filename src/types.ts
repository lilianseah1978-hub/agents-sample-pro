export type AssetCategory = 'indices' | 'stocks' | 'crypto' | 'forex' | 'commodities';
export type ThemeMode = 'dark' | 'light';

export interface ChartPoint {
  time: string;
  price: number;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  volume?: number;
}

export interface MarketAsset {
  id: string;
  symbol: string;
  name: string;
  category: AssetCategory;
  price: number;
  change: number;
  changePercent: number;
  badgeText?: string;
  badgeBg?: string;
  symbolIcon?: string;
  subRegion?: string; // e.g. "US", "World", "Crypto"
  volume?: string;
  marketCap?: string;
  peRatio?: number;
  bid?: number;
  ask?: number;
  high24h?: number;
  low24h?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  technicalSummary?: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  rsi?: number;
  sma20?: number;
  chartData: ChartPoint[];
  lastUpdateDirection?: 'up' | 'down' | null;
}

export interface MarketGroup {
  title: string;
  category: AssetCategory;
  assets: MarketAsset[];
  secondarySectionTitle?: string;
  secondaryAssets?: MarketAsset[];
  tags?: string[];
}

export interface SectorPerformance {
  name: string;
  changePercent: number;
}

export interface AIAnalysisState {
  loading: boolean;
  text: string | null;
  error: string | null;
}


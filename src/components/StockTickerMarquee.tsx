import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StockDataItem {
  symbol: string;
  price: number;
  change: number; // Absolute price change
  changePercent: number; // Percentage price change
}

interface StockTickerMarqueeProps {
  stocks?: StockDataItem[];
  speed?: string; // Animation duration, e.g., '30s'
}

const defaultStocks: StockDataItem[] = [
  { symbol: 'AAPL', price: 170.34, change: 1.23, changePercent: 0.72 },
  { symbol: 'MSFT', price: 340.54, change: -2.56, changePercent: -0.75 },
  { symbol: 'GOOGL', price: 2730.87, change: 10.45, changePercent: 0.38 },
  { symbol: 'AMZN', price: 3300.12, change: -15.67, changePercent: -0.47 },
  { symbol: 'TSLA', price: 1050.76, change: 25.89, changePercent: 2.52 },
  { symbol: 'NVDA', price: 680.22, change: 5.11, changePercent: 0.76 },
  { symbol: 'META', price: 330.00, change: -1.00, changePercent: -0.30 },
  { symbol: 'SPY', price: 450.18, change: 2.33, changePercent: 0.52 },
  { symbol: 'BTC', price: 62050.99, change: -512.70, changePercent: -0.82 },
  { symbol: 'ETH', price: 4100.45, change: 75.10, changePercent: 1.87 },
];

const StockTickerMarquee: React.FC<StockTickerMarqueeProps> = ({
  stocks = defaultStocks,
  speed = '60s', // Default speed for a smoother, slower scroll with more items
}) => {
  console.log('StockTickerMarquee loaded');

  // Ensure there's enough content for a smooth marquee effect
  const stocksToDisplay = stocks.length > 0 ? stocks : defaultStocks;
  // Duplicate stocks for seamless animation; ensure at least a certain number of items for visual appeal
  let duplicatedStocks = [...stocksToDisplay, ...stocksToDisplay];
  if (stocksToDisplay.length < 5) { // If initial list is very short, duplicate more times
    duplicatedStocks = [...stocksToDisplay, ...stocksToDisplay, ...stocksToDisplay, ...stocksToDisplay];
  }


  const renderStockItem = (stock: StockDataItem, index: number) => (
    <div
      key={`${stock.symbol}-${index}`}
      className="mx-4 sm:mx-6 flex items-baseline space-x-2 py-1 px-2 rounded-md transition-all duration-300 hover:bg-slate-700/50 hover:scale-105 hover:shadow-[0_0_10px_rgba(56,189,248,0.4)]"
    >
      <span className="text-sm sm:text-base font-semibold tracking-wider text-slate-300">{stock.symbol}</span>
      <span className="text-sm sm:text-base font-medium text-white">${stock.price.toFixed(2)}</span>
      <span
        className={`text-xs sm:text-sm flex items-center font-medium ${
          stock.change >= 0 ? 'text-green-400' : 'text-red-400'
        }`}
      >
        {stock.change >= 0 ? (
          <ArrowUpRight size={16} className="mr-0.5 shrink-0" />
        ) : (
          <ArrowDownRight size={16} className="mr-0.5 shrink-0" />
        )}
        {stock.changePercent.toFixed(2)}%
      </span>
    </div>
  );

  // Define animation styles. Using a style tag is a way to include keyframes without modifying tailwind.config.js
  const animationStyle = `
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
    .animate-marquee-custom {
      animation: marquee linear infinite;
    }
  `;

  return (
    <>
      <style>{animationStyle}</style>
      <div className="w-full flex overflow-x-hidden bg-slate-900 text-neutral-100 py-3 shadow-md border-b border-slate-700/60 select-none group cursor-default">
        <div
          className="flex flex-shrink-0 animate-marquee-custom group-hover:[animation-play-state:paused]"
          style={{ animationDuration: speed }}
        >
          {duplicatedStocks.map(renderStockItem)}
        </div>
      </div>
    </>
  );
};

export default StockTickerMarquee;
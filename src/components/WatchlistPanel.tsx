import React from 'react';
import { Link } from 'react-router-dom';
import { GlassmorphicPanel } from '@/components/GlassmorphicPanel';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { TrendingUp, TrendingDown, Eye, Trash2, Minus } from 'lucide-react';
import { toast } from "sonner";

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  // In a real app, miniChartData would be an array of numbers, e.g., for 7-day trend
  // miniChartData?: number[]; 
}

interface WatchlistPanelProps {
  watchlistItems?: WatchlistItem[];
  title?: string;
  className?: string;
}

const defaultWatchlistItems: WatchlistItem[] = [
  { id: 'wl1', symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 2.12, changePercent: 1.26 },
  { id: 'wl2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 300.50, change: -0.75, changePercent: -0.25 },
  { id: 'wl3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2750.80, change: 15.40, changePercent: 0.56 },
  { id: 'wl4', symbol: 'TSLA', name: 'Tesla Inc.', price: 900.00, change: 0.00, changePercent: 0.00 },
  { id: 'wl5', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 3200.10, change: -20.00, changePercent: -0.62 },
  { id: 'wl6', symbol: 'NVDA', name: 'NVIDIA Corporation', price: 850.75, change: 12.50, changePercent: 1.49 },
];

const WatchlistPanel: React.FC<WatchlistPanelProps> = ({
  watchlistItems = defaultWatchlistItems,
  title = "My Watchlist",
  className = ""
}) => {
  console.log('WatchlistPanel loaded');

  const handleRemoveItem = (symbol: string, itemName: string) => {
    // In a real application, this would involve updating state or calling an API
    toast.success(`${itemName} (${symbol}) removed from watchlist (simulated).`);
    // Example: setItems(prevItems => prevItems.filter(item => item.symbol !== symbol));
  };

  // Define SVG sparkline paths - simple fixed paths for demo
  const getSparklinePath = (changePercent: number): string => {
    if (changePercent > 0) return "0,30 10,20 20,25 30,15 40,10 50,18 60,8 70,12 80,5";
    if (changePercent < 0) return "0,10 10,20 20,15 30,25 40,30 50,22 60,32 70,28 80,35";
    return "0,20 80,20"; // Flat line for 0 change
  };

  const getSparklineColor = (changePercent: number): string => {
    if (changePercent > 0) return "#34D399"; // Tailwind green-400
    if (changePercent < 0) return "#F87171"; // Tailwind red-400
    return "#6B7280"; // Tailwind gray-500
  };

  return (
    <GlassmorphicPanel className={`p-4 md:p-6 rounded-xl shadow-2xl h-full flex flex-col text-gray-100 ${className}`}>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-purple-400">{title}</h2>
      {watchlistItems.length === 0 ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 italic">Your watchlist is empty. Add some stocks!</p>
        </div>
      ) : (
        <ScrollArea className="flex-grow pr-1"> {/* Adjusted scrollbar spacing */}
          <div className="space-y-3">
            {watchlistItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 bg-slate-800/60 hover:bg-slate-700/70 rounded-lg transition-all duration-200 group"
              >
                {/* Stock Info */}
                <div className="flex-1 min-w-0 mr-2">
                  <div className="flex items-center space-x-2">
                    <Link 
                      to="/stock-detail" 
                      state={{ symbol: item.symbol, name: item.name }}
                      className="text-base md:text-lg font-bold text-sky-400 hover:text-sky-300 transition-colors"
                      title={`${item.name} (${item.symbol})`}
                    >
                      {item.symbol}
                    </Link>
                    <p className="text-xs text-gray-400 truncate hidden sm:inline-block group-hover:text-gray-300 transition-colors">
                      {item.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="text-sm md:text-base font-medium text-gray-50">${item.price.toFixed(2)}</p>
                    <div className={`flex items-center text-xs md:text-sm font-medium ${
                      item.change > 0 ? 'text-green-400' : item.change < 0 ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {item.change > 0 ? <TrendingUp size={14} className="mr-0.5" /> : 
                       item.change < 0 ? <TrendingDown size={14} className="mr-0.5" /> : 
                       <Minus size={14} className="mr-0.5"/>}
                      <span>{item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)</span>
                    </div>
                  </div>
                </div>

                {/* Mini Chart Placeholder */}
                <div className="hidden lg:block w-24 h-10 mx-2">
                  <svg width="100%" height="100%" viewBox="0 0 80 40" preserveAspectRatio="none">
                    <polyline
                        fill="none"
                        stroke={getSparklineColor(item.changePercent)}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={getSparklinePath(item.changePercent)}
                    />
                  </svg>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-sky-400 h-8 w-8 transition-colors" asChild>
                        <Link to="/stock-detail" state={{ symbol: item.symbol, name: item.name }}>
                          <Eye size={18} />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-900 text-gray-200 border-gray-700 shadow-lg">
                      <p>View Details</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-gray-400 hover:text-red-500 h-8 w-8 transition-colors" 
                        onClick={() => handleRemoveItem(item.symbol, item.name)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-900 text-gray-200 border-gray-700 shadow-lg">
                      <p>Remove</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </GlassmorphicPanel>
  );
};

export default WatchlistPanel;
import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import MainHeader from '@/components/layout/MainHeader';
import ControlSidebar from '@/components/layout/ControlSidebar';
import StockTickerMarquee from '@/components/StockTickerMarquee';
import AdvancedGraphContainer from '@/components/AdvancedGraphContainer';
import WatchlistPanel from '@/components/WatchlistPanel';
import PortfolioCard from '@/components/PortfolioCard';
import MainFooter from '@/components/layout/MainFooter';

// Shadcn/ui Components
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Lucide Icons
import { TrendingUp, ArrowRight, Settings, DollarSign } from 'lucide-react';

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-50 font-sans">
      <MainHeader />
      <StockTickerMarquee /> {/* Full-width ticker below header */}
      
      <div className="flex flex-1 overflow-hidden"> {/* Container for sidebar and main content */}
        <ControlSidebar />
        
        <ScrollArea className="flex-1 bg-slate-900"> {/* Ensure ScrollArea also has dark bg if needed */}
          <main className="p-4 md:p-6 space-y-6 md:space-y-8">
            
            {/* Section 1: Portfolio Overview & Key Stats */}
            <section aria-labelledby="portfolio-overview-title">
              <h2 id="portfolio-overview-title" className="sr-only">Portfolio Overview and Market Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                <PortfolioCard
                  title="Total Portfolio Value"
                  value="$275,430.88"
                  change="+$2,105.20 vs Yesterday"
                  changePercentage="+0.77%"
                  changeDirection="up"
                  icon={<DollarSign className="h-6 w-6 text-cyan-400 opacity-70" />}
                />
                <PortfolioCard
                  title="Featured: MSFT"
                  value="$345.67"
                  change="+$3.12 Today"
                  changePercentage="+0.91%"
                  changeDirection="up"
                  // Assuming no specific icon for MSFT, relying on trendIcon
                />
                <Card className="bg-slate-800/70 backdrop-blur-md border border-slate-700/50 shadow-xl rounded-xl h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
                    <CardTitle className="text-base font-semibold text-sky-300">Market Snapshot</CardTitle>
                    <TrendingUp className="h-5 w-5 text-sky-400 opacity-80" />
                  </CardHeader>
                  <CardContent className="pt-0 px-4 pb-4">
                    <p className="text-sm text-slate-300">S&P 500: <span className="text-green-400">4500.50 (+0.50%)</span></p>
                    <p className="text-sm text-slate-300 mt-1">NASDAQ: <span className="text-red-400">15000.20 (-0.20%)</span></p>
                    <p className="text-sm text-slate-300 mt-1">Dow Jones: <span className="text-green-400">35000.70 (+0.35%)</span></p>
                    {/* Example Link usage. Assuming /market-news is a valid route or placeholder */}
                    <Button asChild variant="link" className="p-0 h-auto mt-3 text-xs text-cyan-400 hover:text-cyan-300">
                      <Link to="/market-news"> {/* This route isn't in App.tsx, will go to NotFound or needs to be added */}
                        View All Indices <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 2: Advanced Graph for a major index or featured stock */}
            <section aria-labelledby="featured-graph-title">
              <h2 id="featured-graph-title" className="sr-only">Featured Market Graph</h2>
              <AdvancedGraphContainer stockSymbol="SPY" initialGraphType="trend-line" />
            </section>

            {/* Section 3: Watchlist Panel */}
            <section aria-labelledby="watchlist-panel-title">
              {/* WatchlistPanel includes its own title element */}
              <WatchlistPanel title="My Watchlist Highlights" />
            </section>
            
            {/* Optional: Call to action / extra button placeholder */}
            <section className="text-center py-4">
                <Button 
                  variant="outline" 
                  className="border-cyan-500/70 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500 transition-all duration-300 group shadow-md hover:shadow-cyan-500/30"
                  onClick={() => console.log("Customize Dashboard action triggered")}
                >
                    Customize Dashboard 
                    <Settings className="ml-2 h-4 w-4 text-cyan-500 group-hover:rotate-45 transition-transform duration-300" />
                </Button>
            </section>

          </main>
        </ScrollArea>
      </div>
      <MainFooter />
    </div>
  );
};

export default DashboardPage;
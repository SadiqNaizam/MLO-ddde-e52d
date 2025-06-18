import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PortfolioCardProps {
  title: string;
  value: string; // e.g., "$150,723.50"
  change: string; // e.g., "+$1,203.00" or "-$500.10"
  changePercentage: string; // e.g., "+0.85%" or "-0.33%"
  changeDirection: 'up' | 'down' | 'neutral'; // To determine color and icon
  icon?: React.ReactNode; // Optional: e.g., a company logo <Avatar> or specific icon
  className?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  title,
  value,
  change,
  changePercentage,
  changeDirection,
  icon,
  className,
}) => {
  console.log('PortfolioCard loaded for:', title);

  const isPositive = changeDirection === 'up';
  const isNegative = changeDirection === 'down';
  const isNeutral = changeDirection === 'neutral';

  const trendIcon = isPositive ? (
    <TrendingUp className="h-5 w-5 text-green-400" />
  ) : isNegative ? (
    <TrendingDown className="h-5 w-5 text-red-400" />
  ) : (
    <Minus className="h-5 w-5 text-gray-400" />
  );

  const changeColor = isPositive
    ? 'text-green-400'
    : isNegative
    ? 'text-red-400'
    : 'text-gray-400';

  return (
    <Card
      className={cn(
        "group", // For group hover effects
        "bg-slate-800/60 backdrop-blur-lg", // Glassmorphism: semi-transparent background with blur
        "border border-slate-700", // Subtle metallic-like border
        "transition-all duration-300 ease-in-out",
        "hover:border-cyan-500/70", // Metallic accent change on hover
        "hover:shadow-[0_0_20px_5px_rgba(0,180,255,0.2)]", // Animated cyan glow on hover
        "text-white rounded-xl overflow-hidden",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-slate-300">
          {title}
        </CardTitle>
        {icon ? (
          <div className="h-8 w-8 flex items-center justify-center">{icon}</div>
        ) : (
          trendIcon
        )}
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="text-3xl font-bold text-slate-50">{value}</div>
        <div className="flex items-center space-x-2 mt-1">
          <p className={cn("text-xs", changeColor)}>
            {change} ({changePercentage})
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
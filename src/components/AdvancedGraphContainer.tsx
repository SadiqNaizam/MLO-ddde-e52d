import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, ZoomIn, ZoomOut, Move, LineChart as LineChartIcon, BarChart3D, TableIcon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, BarChart, Bar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { InteractiveDataPoint, InteractiveDataPointProps } from '@/components/InteractiveDataPoint'; // Assuming this path and props
import { useToast } from "@/components/ui/use-toast";

type GraphType = 'trend-line' | 'dynamic-heatmap' | '3d-bar-chart';

interface AdvancedGraphContainerProps {
  stockSymbol: string;
  initialGraphType?: GraphType;
}

interface StockDataPoint {
  date: string;
  price: number;
  volume?: number;
  // For heatmap/3D, more complex data structure would be needed
  x?: number;
  y?: number;
  z?: number;
  value?: number; // for heatmap
}

const MOCK_DATA_CACHE: Record<string, Record<GraphType, StockDataPoint[]>> = {};

const generateMockData = (symbol: string, type: GraphType): StockDataPoint[] => {
  if (MOCK_DATA_CACHE[symbol]?.[type]) {
    return MOCK_DATA_CACHE[symbol][type];
  }

  const data: StockDataPoint[] = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    if (type === 'trend-line') {
      data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat((Math.random() * 100 + 150 + Math.sin(i / 5) * 20).toFixed(2)),
        volume: Math.floor(Math.random() * 1000000 + 500000),
      });
    } else if (type === 'dynamic-heatmap') {
      // Simplified heatmap data - e.g., correlation or volatility over time
      data.push({
        date: date.toISOString().split('T')[0], // Represents one axis
        value: parseFloat((Math.random() * 10).toFixed(2)), // Represents intensity
        x: i % 5, // Category for heatmap
        y: Math.floor(i / 5), // Time segment for heatmap
      });
    } else if (type === '3d-bar-chart') {
       // Simplified 3D bar chart data - e.g., price, volume, volatility
       data.push({
        date: date.toISOString().split('T')[0],
        price: parseFloat((Math.random() * 50 + 100).toFixed(2)), // Y-axis
        volume: Math.floor(Math.random() * 100000), // Z-axis (conceptual)
        x: i, // X-axis
      });
    }
  }

  if (!MOCK_DATA_CACHE[symbol]) MOCK_DATA_CACHE[symbol] = {} as Record<GraphType, StockDataPoint[]>;
  MOCK_DATA_CACHE[symbol][type] = data;
  return data;
};


const AdvancedGraphContainer: React.FC<AdvancedGraphContainerProps> = ({
  stockSymbol,
  initialGraphType = 'trend-line',
}) => {
  const [graphData, setGraphData] = useState<StockDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeGraphType, setActiveGraphType] = useState<GraphType>(initialGraphType);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  // conceptual pan state
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { toast } = useToast();

  console.log(`AdvancedGraphContainer loaded for symbol: ${stockSymbol}, type: ${activeGraphType}`);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      console.log(`Fetching data for ${stockSymbol} - ${activeGraphType}`);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      try {
        const data = generateMockData(stockSymbol, activeGraphType);
        setGraphData(data);
        toast({
            title: "Graph Data Loaded",
            description: `Successfully loaded ${activeGraphType} for ${stockSymbol}.`,
        });
      } catch (err) {
        setError('Failed to fetch graph data. Please try again.');
        toast({
            title: "Error Loading Data",
            description: `Failed to load data for ${stockSymbol}.`,
            variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [stockSymbol, activeGraphType, toast]);

  const handleGraphTypeChange = (value: string) => {
    setActiveGraphType(value as GraphType);
  };

  const handleZoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev * 1.2, 5)); // Max zoom 5x
    console.log('Zoom In');
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5)); // Min zoom 0.5x
    console.log('Zoom Out');
  }, []);
  
  const handlePan = useCallback((direction: 'left' | 'right' | 'up' | 'down') => {
    const panStep = 50 / zoomLevel;
    setPanOffset(prev => {
        let newX = prev.x;
        let newY = prev.y;
        if (direction === 'left') newX -= panStep;
        if (direction === 'right') newX += panStep;
        // Conceptual Y pan for 3D/Heatmap
        if (direction === 'up') newY -= panStep; 
        if (direction === 'down') newY += panStep;
        return {x: newX, y: newY};
    });
    console.log('Pan:', direction);
  }, [zoomLevel]);


  const renderGraph = () => {
    if (!graphData.length) return <p className="text-center text-gray-400">No data available for this visualization.</p>;

    // InteractiveDataPoint example props
    const interactivePointProps: Omit<InteractiveDataPointProps, 'x' | 'y' | 'payload'> = {
      onClick: (payload) => console.log('Data point clicked:', payload),
      onHover: (payload, active) => console.log(`Data point ${active ? 'hovered' : 'unhovered'}:`, payload),
      label: "Detail",
      highlightColor: "neon-green", // Example, InteractiveDataPoint would define how this is used
    };
    
    switch (activeGraphType) {
      case 'trend-line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} stroke="#4A5568" />
              <XAxis dataKey="date" tick={{ fill: '#A0AEC0' }} stroke="#4A5568" />
              <YAxis tick={{ fill: '#A0AEC0' }} stroke="#4A5568" domain={['auto', 'auto']} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: 'rgba(30,41,59,0.8)', border: '1px solid #38bdf8', borderRadius: '0.5rem', boxShadow: '0 0 15px 0 rgba(56,189,248,0.5)' }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#7dd3fc', fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ color: '#A0AEC0' }} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#38bdf8" // Neon blue accent
                strokeWidth={2}
                dot={(props) => <InteractiveDataPoint {...props} {...interactivePointProps} />}
                activeDot={(props) => <InteractiveDataPoint {...props} {...interactivePointProps} active />}
                animationDuration={1000}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'dynamic-heatmap':
        // Placeholder for actual heatmap rendering
        return (
          <div className="h-[400px] flex items-center justify-center border border-dashed border-cyan-500/50 rounded-md bg-slate-800/30 p-4">
            <div className="text-center">
                <TableIcon className="mx-auto h-12 w-12 text-cyan-400 mb-2" />
                <p className="text-cyan-300">Dynamic Heatmap Visualization for {stockSymbol}</p>
                <p className="text-xs text-slate-400">(Conceptual: Would render interactive cells)</p>
                <div className="mt-4 grid grid-cols-5 gap-1 p-2 bg-slate-900 rounded">
                    {graphData.slice(0,10).map((point, idx) => (
                         <InteractiveDataPoint 
                            key={idx}
                            cx={(point.x ?? 0) * 20 + 10} // conceptual position
                            cy={(point.y ?? 0) * 20 + 10} // conceptual position
                            payload={point}
                            value={point.value}
                            {...interactivePointProps}
                            className={`w-10 h-10 rounded-sm flex items-center justify-center text-xs hover:ring-2 ring-cyan-400`}
                            style={{ backgroundColor: `rgba(0, 255, 255, ${ (point.value ?? 0) / 10})`}}
                         >
                            {point.value?.toFixed(1)}
                         </InteractiveDataPoint>
                    ))}
                </div>
            </div>
          </div>
        );
      case '3d-bar-chart':
        // Placeholder for actual 3D bar chart rendering
        return (
          <div className="h-[400px] flex items-center justify-center border border-dashed border-purple-500/50 rounded-md bg-slate-800/30 p-4">
            <div className="text-center">
                <BarChart3D className="mx-auto h-12 w-12 text-purple-400 mb-2" />
                <p className="text-purple-300">3D Bar Chart Visualization for {stockSymbol}</p>
                <p className="text-xs text-slate-400">(Conceptual: Would render interactive 3D bars)</p>
                <div className="mt-4 flex space-x-1 h-24 items-end p-2 bg-slate-900 rounded">
                    {graphData.slice(0,5).map((point, idx) => (
                        <InteractiveDataPoint 
                            key={idx}
                            x={(idx * 30)} // conceptual position
                            y={100 - (point.price ?? 0)/2} // conceptual height
                            width={20}
                            height={(point.price ?? 0)/2}
                            payload={point}
                            {...interactivePointProps}
                            className="bg-purple-500 hover:bg-purple-400 rounded-t-sm transition-all duration-150 flex items-end justify-center text-xs pb-1 text-white"
                            style={{ height: `${(point.price ?? 0)/2}px`, minHeight: '10px' }}
                         >
                           {point.price?.toFixed(0)}
                         </InteractiveDataPoint>
                    ))}
                </div>
            </div>
          </div>
        );
      default:
        return <p>Unknown graph type selected.</p>;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-700 text-slate-50 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-slate-700">
        <div>
          <CardTitle className="text-2xl font-bold text-cyan-400">
            {stockSymbol} - Advanced Analytics
          </CardTitle>
          <CardDescription className="text-slate-400">Interactive {activeGraphType.replace('-', ' ')}</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
            <Select onValueChange={handleGraphTypeChange} defaultValue={activeGraphType}>
                <SelectTrigger className="w-[180px] bg-slate-800 border-slate-600 text-slate-300 focus:ring-cyan-500">
                    <SelectValue placeholder="Select Graph Type" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600 text-slate-300">
                    <SelectItem value="trend-line" className="hover:bg-slate-700 focus:bg-slate-700">Trend Line</SelectItem>
                    <SelectItem value="dynamic-heatmap" className="hover:bg-slate-700 focus:bg-slate-700">Dynamic Heatmap</SelectItem>
                    <SelectItem value="3d-bar-chart" className="hover:bg-slate-700 focus:bg-slate-700">3D Bar Chart</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-end space-x-2 mb-4">
            <Button variant="outline" size="icon" onClick={handleZoomIn} className="text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-cyan-400" title="Zoom In">
                <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut} className="text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-cyan-400" title="Zoom Out">
                <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => handlePan('left')} className="text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-cyan-400" title="Pan Left">
                <Move className="h-4 w-4 transform -rotate-90" />
            </Button>
             <Button variant="outline" size="icon" onClick={() => handlePan('right')} className="text-slate-400 border-slate-600 hover:bg-slate-700 hover:text-cyan-400" title="Pan Right">
                <Move className="h-4 w-4 transform rotate-90" />
            </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeGraphType} // Ensures re-animation when graph type changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="min-h-[400px] relative" // Ensure container has height for loader
          >
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 z-10 rounded-md">
                <Loader2 className="h-12 w-12 animate-spin text-cyan-500" />
                <p className="mt-4 text-lg text-slate-300">Loading {activeGraphType.replace('-', ' ')}...</p>
              </div>
            ) : error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/30 text-red-300 p-4 rounded-md">
                <p className="font-semibold">Error!</p>
                <p>{error}</p>
                <Button variant="destructive" className="mt-4" onClick={() => window.location.reload()}>Retry Page</Button>
              </div>
            ) : (
              renderGraph()
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default AdvancedGraphContainer;

// Definition for InteractiveDataPoint (assuming its structure based on usage)
// This would normally be in its own file: src/components/InteractiveDataPoint.tsx
// For mlo's single-file generation, this is just a conceptual placeholder.
// It's assumed InteractiveDataPointProps is exported from its actual file.
/*
export interface InteractiveDataPointProps {
  cx?: number;
  cy?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: any; // data point from recharts
  value?: any;
  active?: boolean;
  onClick?: (payload: any) => void;
  onHover?: (payload: any, active: boolean) => void;
  label?: string;
  highlightColor?: string; // e.g. "neon-green", "neon-blue"
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const InteractiveDataPoint: React.FC<InteractiveDataPointProps> = (props) => {
  // Minimalistic example of what InteractiveDataPoint might do
  const { cx, cy, payload, active, onClick, onHover, highlightColor, className, style, children, ...rest } = props;

  const handleClick = () => {
    if (onClick && payload) onClick(payload);
  };

  const handleMouseEnter = () => {
    if (onHover && payload) onHover(payload, true);
  };

  const handleMouseLeave = () => {
    if (onHover && payload) onHover(payload, false);
  };

  // For LineChart dots
  if (cx && cy) {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={active ? 6 : 4}
          fill={active ? (highlightColor === 'neon-green' ? '#34d399' : '#38bdf8') : '#A0AEC0'}
          stroke={active ? (highlightColor === 'neon-green' ? '#10b981' : '#0ea5e9') : 'none'}
          strokeWidth={2}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer', transition: 'all 0.2s ease', ...style }}
          className={className}
          {...rest}
        />
        {active && payload && (
          <text x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="10px">
            {payload.price || payload.value}
          </text>
        )}
      </g>
    );
  }

  // For BarChart elements or custom heatmap cells (more abstract)
  return (
    <div 
        onClick={handleClick} 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            ...(active && { boxShadow: `0 0 8px 2px ${highlightColor === 'neon-green' ? '#34d399' : '#38bdf8'}` }),
            ...style
        }}
        {...rest}
    >
        {children}
    </div>
  );
};
*/
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GlassmorphicPanel from '@/components/GlassmorphicPanel'; // Assuming this path is correct as per instructions
import { SlidersHorizontal, ListChecks, Palette, ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

interface ControlSidebarProps {
  // Props can be added here if needed, e.g., for initial state or callbacks
}

const ControlSidebar: React.FC<ControlSidebarProps> = () => {
  console.log('ControlSidebar loaded');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <GlassmorphicPanel 
      className={`relative transition-all duration-300 ease-in-out h-full flex flex-col border-r border-slate-700/50
                  ${isCollapsed ? 'w-16' : 'w-72'} bg-slate-800/30 backdrop-blur-lg`}
    >
      <div className="flex items-center justify-between p-3 border-b border-slate-700/50">
        {!isCollapsed && <h2 className="text-lg font-semibold text-slate-100">Controls</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-400 hover:text-slate-100 hover:bg-slate-700/50">
          {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          <span className="sr-only">{isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}</span>
        </Button>
      </div>

      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-6">
          {/* Section: Graph Customization */}
          <div>
            <h3 className="mb-2 flex items-center text-sm font-medium text-slate-300">
              <SlidersHorizontal className={`h-4 w-4 mr-2 ${isCollapsed ? 'text-center w-full' : ''}`} />
              {!isCollapsed && 'Graph Options'}
            </h3>
            {!isCollapsed && (
              <div className="space-y-3 text-xs text-slate-400">
                <p>Graph type select (placeholder)</p>
                <p>Time range adjust (placeholder)</p>
                <p>Indicator settings (placeholder)</p>
              </div>
            )}
          </div>

          {/* Section: Tool Settings */}
          <div>
            <h3 className="mb-2 flex items-center text-sm font-medium text-slate-300">
              <Palette className={`h-4 w-4 mr-2 ${isCollapsed ? 'text-center w-full' : ''}`} />
              {!isCollapsed && 'Appearance'}
            </h3>
            {!isCollapsed && (
              <div className="space-y-3 text-xs text-slate-400">
                <p>Theme variant (placeholder)</p>
                <p>Chart colors (placeholder)</p>
              </div>
            )}
          </div>
          
          {/* Section: Quick Watchlist Navigation */}
          <div>
            <h3 className="mb-2 flex items-center text-sm font-medium text-slate-300">
              <ListChecks className={`h-4 w-4 mr-2 ${isCollapsed ? 'text-center w-full' : ''}`} />
              {!isCollapsed && 'Quick Watchlist'}
            </h3>
            {!isCollapsed && (
              <div className="space-y-2 text-xs text-slate-400">
                <p>Watchlist item 1 (placeholder)</p>
                <p>Watchlist item 2 (placeholder)</p>
                <Button variant="outline" size="sm" className="w-full mt-2 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-slate-100">
                  View All
                </Button>
              </div>
            )}
          </div>

           {/* Section: Layout Options */}
           <div>
            <h3 className="mb-2 flex items-center text-sm font-medium text-slate-300">
              <LayoutGrid className={`h-4 w-4 mr-2 ${isCollapsed ? 'text-center w-full' : ''}`} />
              {!isCollapsed && 'Layout Options'}
            </h3>
            {!isCollapsed && (
              <div className="space-y-3 text-xs text-slate-400">
                <p>Toggle panels (placeholder)</p>
                <p>Save layout (placeholder)</p>
              </div>
            )}
          </div>

        </div>
      </ScrollArea>
      
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700/50 mt-auto">
            <p className="text-xs text-slate-500 text-center">Advanced Controls Panel</p>
        </div>
      )}
    </GlassmorphicPanel>
  );
};

export default ControlSidebar;
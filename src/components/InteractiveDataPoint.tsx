import React from 'react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // TooltipProvider is assumed to be in App.tsx or a higher-level component

interface InteractiveDataPointProps {
  id: string | number; // Unique identifier for the data point, useful for keys and interactions
  cx: number; // x-coordinate for the center of the circle
  cy: number; // y-coordinate for the center of the circle
  radius?: number; // Radius of the circle
  color?: string; // Fill color of the circle
  neonGlowColor?: string; // Color for the neon glow effect on hover
  tooltipContent: React.ReactNode; // Content to display inside the tooltip
  onClick?: (id: string | number, data?: any) => void; // Callback function when the point is clicked
  animationDelay?: number; // Delay for staggered entrance animations
  data?: any; // Optional additional data associated with this point
}

const InteractiveDataPoint: React.FC<InteractiveDataPointProps> = ({
  id,
  cx,
  cy,
  radius = 5,
  color = 'rgba(0, 220, 255, 0.7)', // Default to a cyan-ish color, fitting neon theme
  neonGlowColor = '#0af', // Bright cyan for neon glow
  tooltipContent,
  onClick,
  animationDelay = 0,
  data,
}) => {
  console.log(`InteractiveDataPoint loaded for id: ${id}`);

  const pointVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: animationDelay,
        duration: 0.3,
      },
    },
    exit: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const handlePointClick = () => {
    if (onClick) {
      onClick(id, data);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius}
          fill={color}
          stroke={neonGlowColor} // Adding a subtle stroke to enhance base visibility
          strokeWidth={1}
          onClick={handlePointClick}
          variants={pointVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{
            scale: 1.5,
            filter: `drop-shadow(0 0 8px ${neonGlowColor}) drop-shadow(0 0 12px ${neonGlowColor})`,
            zIndex: 10, // Ensure hovered point is on top
            cursor: onClick ? 'pointer' : 'default',
          }}
          style={{
            // Ensure zIndex works if rendered within a stacking context (e.g. parent SVG has CSS transforms)
            // For SVG, z-index is controlled by render order, but framer-motion might handle this.
            // If not, parent might need to re-render points to bring hovered one to top.
            // For now, this style attribute is more of a hint.
          }}
          className="transition-all" // For any non-motion transitions if needed
        />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        className="bg-neutral-900 text-neutral-100 border border-neutral-700 rounded-md shadow-xl p-3 text-sm
                   dark:bg-black dark:text-slate-50 dark:border-slate-800
                   // Neon border effect for tooltip, subtle
                   ring-1 ring-offset-1 ring-offset-black ring-[${neonGlowColor}]/50
                   dark:ring-[${neonGlowColor}]/70"
      >
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};

export default InteractiveDataPoint;
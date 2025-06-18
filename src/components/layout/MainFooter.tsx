import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from 'lucide-react';

const MainFooter: React.FC = () => {
  console.log('MainFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 text-slate-400">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-cyan-500" />
            <span className="text-sm font-semibold text-slate-300">StockDash</span>
          </div>
          
          <div className="text-center md:text-left">
            <p className="text-xs">
              Financial data provided is for informational purposes only and should not be considered as investment advice.
            </p>
            <p className="text-xs mt-1">
              Consult with a qualified financial advisor before making any investment decisions.
            </p>
          </div>

          <nav className="flex gap-4 sm:gap-6 text-sm">
            <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
            <Link to="/support" className="hover:text-cyan-400 transition-colors">Support</Link>
            <Link to="/privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
          </nav>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-700 text-center">
          <p className="text-xs">
            &copy; {currentYear} StockDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
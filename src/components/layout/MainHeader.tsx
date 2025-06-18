import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LineChart, Search, User, Menu, Settings } from 'lucide-react';

const MainHeader: React.FC = () => {
  console.log('MainHeader loaded');

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-slate-300 ${
      isActive ? 'text-white font-semibold border-b-2 border-cyan-400' : 'text-slate-400'
    }`;

  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-3 py-2 rounded-md text-base font-medium ${
      isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  const navItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/watchlist', label: 'Watchlist' },
    { href: '/portfolio', label: 'Portfolio' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 text-slate-100">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 mr-6">
          <LineChart className="h-7 w-7 text-cyan-400" />
          <span className="font-bold text-xl tracking-tight">StockDash</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-3 md:gap-4">
          <div className="relative hidden sm:block w-full max-w-xs ml-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="search"
              placeholder="Search stocks..."
              className="w-full rounded-md bg-slate-800 pl-10 pr-4 py-2 text-sm text-slate-100 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700" asChild>
            <Link to="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
          
          {/* User profile placeholder */}
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700">
            <User className="h-5 w-5" />
            <span className="sr-only">User Profile</span>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 hover:bg-slate-700">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-slate-900 border-slate-700 p-6">
                <div className="flex flex-col gap-4">
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <LineChart className="h-7 w-7 text-cyan-400" />
                        <span className="font-bold text-xl tracking-tight text-slate-100">StockDash</span>
                    </Link>
                    <div className="relative w-full mb-4">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <Input
                        type="search"
                        placeholder="Search stocks..."
                        className="w-full rounded-md bg-slate-800 pl-10 pr-4 py-2 text-sm text-slate-100 border-slate-700 focus:ring-cyan-500 focus:border-cyan-500 placeholder-slate-500"
                        />
                    </div>
                    {navItems.map((item) => (
                        <NavLink key={item.href} to={item.href} className={mobileNavLinkClasses}>
                        {item.label}
                        </NavLink>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
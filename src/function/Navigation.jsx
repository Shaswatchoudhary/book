import React from 'react';
import { Book, ChevronDown, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md py-3 px-4 md:px-6 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-book-blue animate-glow" />
          <span className="text-2xl font-bold bg-gradient-to-r from-book-blue to-book-red bg-clip-text text-transparent">
            FlipReader
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="nav-link">Home</a>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link flex items-center" asChild>
              <button className="flex items-center">
                Features <ChevronDown className="ml-1 h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Page Flip</DropdownMenuItem>
              <DropdownMenuItem>Bookmarks</DropdownMenuItem>
              <DropdownMenuItem>Search</DropdownMenuItem>
              <DropdownMenuItem>Annotations</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <a href="#" className="nav-link">Templates</a>
          <a href="#" className="nav-link">Examples</a>
          <a href="#" className="nav-link">Pricing</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1.5 focus-within:ring-2 focus-within:ring-book-blue">
            <Search className="h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none text-sm px-2 w-32 focus:w-40 transition-all"
            />
          </div>
          
          <Button className="bg-book-blue hover:bg-book-blue/90 text-white rounded-full px-4 py-2 text-sm">
            Upload PDF
          </Button>
          
          <Button variant="ghost" className="md:hidden text-book-dark">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

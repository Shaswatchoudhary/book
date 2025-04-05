import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  Search,
  ZoomIn, 
  ZoomOut,
  RotateCw, 
  Share2, 
  Printer,
  Download,
  Maximize,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Flipbook = ({ pdfUrl = '/sample.pdf' }) => {
  const [numPages, setNumPages] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const bookRef = useRef(null);

  const playFlipSound = () => {
    const flipSound = new Audio('/flip-sound.mp3');
    flipSound.volume = 0.5;
    flipSound.play().catch(e => console.log('Audio play failed:', e));
  };

  const goToNextPage = () => {
    if (currentPage < numPages && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('right');
      playFlipSound();
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 500);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('left');
      playFlipSound();
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 500);
    }
  };

  const handleBookmarkClick = () => {
    if (bookmarks.includes(currentPage)) {
      setBookmarks(bookmarks.filter(page => page !== currentPage));
    } else {
      setBookmarks([...bookmarks, currentPage]);
    }
  };

  const handleDownloadClick = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      bookRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setNumPages(12);
    }, 1000);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const pagesToShow = [currentPage];
  if (currentPage < numPages) {
    pagesToShow.push(currentPage + 1);
  }

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div 
        ref={bookRef}
        className="relative mb-8 w-full max-w-4xl aspect-[1.6/1] bg-gradient-to-b from-gray-100 to-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 bg-gradient-to-b from-gray-300 via-gray-200 to-gray-300 z-10"></div>

        <div className="absolute inset-0 flex justify-center items-center">
          <div className={`relative book-page h-[90%] w-[45%] mx-1 ${isFlipping && flipDirection === 'left' ? 'animate-page-flip-left' : ''}`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white">
              <div className="relative w-full h-full bg-white rounded overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center" style={{ transform: `scale(${zoom/100})` }}>
                    <span className="text-5xl font-bold text-book-blue mb-6">{currentPage}</span>
                    <p className="text-center text-gray-500 px-6">
                      {currentPage % 2 === 1 ? 
                        "Experience the joy of reading with our interactive flipbook. Turn pages with a beautiful animation that simulates a real book." : 
                        "Upload your PDF documents and transform them into engaging, interactive publications that readers will love."}
                    </p>
                  </div>
                </div>
                <div className="page-overlay"></div>
              </div>
              <div className="absolute top-2 left-2 text-xs text-gray-400">
                Page {currentPage}
                {bookmarks.includes(currentPage) && (
                  <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
                    Bookmarked
                  </Badge>
                )}
              </div>
            </div>
            <div className="page-edge"></div>
          </div>

          <div className={`relative book-page h-[90%] w-[45%] mx-1 ${isFlipping && flipDirection === 'right' ? 'animate-page-flip-right' : ''}`}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-white">
              <div className="relative w-full h-full bg-white rounded overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex flex-col items-center justify-center" style={{ transform: `scale(${zoom/100})` }}>
                    <span className="text-5xl font-bold text-book-red mb-6">{currentPage < numPages ? currentPage + 1 : ''}</span>
                    <p className="text-center text-gray-500 px-6">
                      {currentPage < numPages ? (
                        (currentPage + 1) % 2 === 0 ? 
                        "Our realistic page-turning effect gives your digital publications the authentic feel of a physical book." : 
                        "Share your flipbooks easily with anyone, anywhere. Perfect for magazines, catalogs, reports, and more."
                      ) : "End of document"}
                    </p>
                  </div>
                </div>
                <div className="page-overlay"></div>
              </div>
              <div className="absolute top-2 right-2 text-xs text-gray-400">
                {currentPage < numPages ? `Page ${currentPage + 1}` : ''}
                {currentPage < numPages && bookmarks.includes(currentPage + 1) && (
                  <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-300">
                    Bookmarked
                  </Badge>
                )}
              </div>
            </div>
            <div className="page-edge"></div>
          </div>
        </div>

        <div className="absolute left-0 top-0 w-1/4 h-full cursor-pointer page-turning-effect z-20" onClick={goToPrevPage}></div>
        <div className="absolute right-0 top-0 w-1/4 h-full cursor-pointer page-turning-effect z-20" onClick={goToNextPage}></div>
        <div className="book-shadow"></div>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={goToPrevPage} disabled={currentPage <= 1 || isFlipping} className="text-book-dark hover:text-book-blue hover:bg-blue-50">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Page</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="mx-2 text-sm text-gray-600">
              Page <span className="font-medium">{currentPage}</span> of <span className="font-medium">{numPages}</span>
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={goToNextPage} disabled={currentPage >= numPages || isFlipping} className="text-book-dark hover:text-book-blue hover:bg-blue-50">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Page</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.max(prev - 10, 50))} className="text-book-dark hover:text-book-blue">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom Out</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="w-24 hidden sm:block">
              <Slider value={[zoom]} min={50} max={150} step={10} onValueChange={(val) => setZoom(val[0])} />
            </div>

            <div className="text-xs text-gray-500 w-10">{zoom}%</div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={() => setZoom(prev => Math.min(prev + 10, 150))} className="text-book-dark hover:text-book-blue">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom In</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-1 mt-2 sm:mt-0">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant={bookmarks.includes(currentPage) ? "secondary" : "ghost"} 
                    size="icon" 
                    onClick={handleBookmarkClick} 
                    className={`${bookmarks.includes(currentPage) ? 'bg-yellow-50 text-yellow-700' : 'text-book-dark hover:text-book-blue'}`}
                  >
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{bookmarks.includes(currentPage) ? "Remove Bookmark" : "Add Bookmark"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-book-dark hover:text-book-blue">
                  <Search className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search Document</DialogTitle>
                  <DialogDescription>
                    Enter a keyword to find in the document.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter search term..."
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Search</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-book-dark hover:text-book-blue">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Document</DialogTitle>
                  <DialogDescription>
                    Share this document with others.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center gap-2">
                    <input 
                      className="flex-1 p-2 border border-gray-300 rounded-md" 
                      value="https://example.com/shared-document/12345"
                      readOnly
                    />
                    <Button variant="outline">Copy</Button>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Close</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Drawer>
              <DrawerTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-book-dark hover:text-book-blue"
                  onClick={() => isDownloading || handleDownloadClick()}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Download Document</DrawerTitle>
                  <DrawerDescription>
                    {isDownloading ? "Preparing your document..." : "Your document is ready for download."}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  {isDownloading ? (
                    <div className="space-y-2">
                      <Progress value={downloadProgress} />
                      <p className="text-sm text-gray-500 text-center">{downloadProgress}% Complete</p>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-4">
                      <Button className="w-full" onClick={handleDownloadClick}>
                        Download PDF
                      </Button>
                      <Button variant="outline" className="w-full">
                        Download as EPUB
                      </Button>
                    </div>
                  )}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`text-book-dark hover:text-book-blue ${isFullscreen ? 'bg-blue-50' : ''}`}
                    onClick={toggleFullscreen}
                  >
                    <Maximize className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isFullscreen ? "Exit Full Screen" : "Full Screen"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" size="icon" className="text-book-dark hover:text-book-blue">
                  <Info className="h-4 w-4" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Document Information</h4>
                  <div className="text-sm">
                    <p><span className="font-medium">Title:</span> Sample Document</p>
                    <p><span className="font-medium">Pages:</span> {numPages}</p>
                    <p><span className="font-medium">Created:</span> April 1, 2025</p>
                    <p><span className="font-medium">Bookmarks:</span> {bookmarks.length}</p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>

        <div className="mt-4 border-t pt-2">
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {Array.from({length: Math.min(numPages, 8)}, (_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`flex-shrink-0 w-16 h-20 border rounded overflow-hidden transition-all relative ${currentPage === i + 1 ? 'border-book-blue shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="w-full h-full bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
                  <span className={`font-bold text-lg ${currentPage === i + 1 ? 'text-book-blue' : 'text-gray-500'}`}>
                    {i + 1}
                  </span>
                </div>
                {bookmarks.includes(i + 1) && (
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-8 border-r-8 border-yellow-400 border-l-transparent border-b-transparent"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flipbook;
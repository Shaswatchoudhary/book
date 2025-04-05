import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import Flipbook from "@/components/Flipbook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toaster";
import { Book, Upload, Library, BookOpen } from "lucide-react";

const Index = () => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [showFlipbook, setShowFlipbook] = useState(false);
  const { toast } = useToast();
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      setShowFlipbook(true);
      
      toast({
        title: "PDF Uploaded Successfully",
        description: "Your document is now ready to read!",
        duration: 3000,
      });
    } else if (file) {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        duration: 3000,
      });
    }
  };
  
  const handleDemoClick = () => {
    setPdfUrl('/sample.pdf');
    setShowFlipbook(true);
    
    toast({
      title: "Loading Demo Book",
      description: "A sample flipbook is being loaded for you to explore.",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      {!showFlipbook ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-3xl w-full text-center">
            <div className="mb-8">
              <Book className="h-24 w-24 text-book-blue animate-float mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-book-blue to-book-red bg-clip-text text-transparent">
                Turn Your PDFs into Interactive Flipbooks
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create beautiful, responsive digital publications with realistic page-turning effects
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8 transform hover:shadow-xl transition-all">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="w-full md:w-2/3">
                  <label 
                    htmlFor="pdf-upload" 
                    className="block w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center justify-center p-4"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-gray-500 font-medium">Drop your PDF here or click to browse</span>
                    <span className="text-gray-400 text-sm">Maximum file size: 20MB</span>
                    <Input 
                      id="pdf-upload" 
                      type="file" 
                      accept=".pdf" 
                      className="hidden" 
                      onChange={handleFileChange} 
                    />
                  </label>
                </div>
                
                <div className="text-center">
                  <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-gray-500 font-medium">OR</span>
                </div>
                
                <div>
                  <Button 
                    onClick={handleDemoClick}
                    className="btn-3d blue w-full md:w-auto"
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Try Demo Flipbook
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-book-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-book-dark">Realistic Page Turning</h3>
                <p className="text-gray-600">Enjoy smooth, realistic page-turning animations that mimic a real book.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <Library className="h-6 w-6 text-book-red" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-book-dark">Rich Features</h3>
                <p className="text-gray-600">Bookmarks, search, zooming and sharing options enhance the reading experience.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Book className="h-6 w-6 text-book-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-book-dark">Beautiful Design</h3>
                <p className="text-gray-600">Stunning visuals and animations make your publications stand out.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1">
          <Flipbook pdfUrl={pdfUrl || undefined} />
          
          <div className="text-center pb-8">
            <Button 
              variant="outline"
              onClick={() => setShowFlipbook(false)}
              className="hover:bg-gray-100"
            >
              Back to Upload
            </Button>
          </div>
        </div>
      )}
      
      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 FlipReader. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

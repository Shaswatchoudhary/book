import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, Upload, Library, BookOpen } from "lucide-react";
import Navigation from "@/function/Navigation";
import Flipbook from "@/function/Flipbook";

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
        title: "PDF Loaded",
        description: "Your PDF is ready to view.",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a valid PDF file.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!showFlipbook ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-8">
                <BookOpen className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h1 className="text-3xl font-bold mb-2">PDF Flipbook Reader</h1>
                <p className="text-gray-600">Upload your PDF to start reading</p>
              </div>
              <div className="border-2 border-dashed border-blue-200 rounded-lg p-8 text-center">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-12 h-12 text-blue-500 mb-4" />
                    <p className="text-blue-500 font-semibold mb-2">Drag & Drop PDF Here</p>
                    <p className="text-gray-500 text-sm">or click to browse</p>
                  </div>
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">Your PDF</h2>
                <Button
                  variant="outline"
                  onClick={() => {
                    URL.revokeObjectURL(pdfUrl);
                    setPdfUrl(null);
                    setShowFlipbook(false);
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Close
                </Button>
              </div>
              <Flipbook pdfUrl={pdfUrl} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
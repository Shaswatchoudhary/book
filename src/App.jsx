import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Flipbook from './function/Flipbook';
import { BookOpen, Upload, ArrowLeft, ArrowRight, X } from 'lucide-react';

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('classic');
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setIsLoading(true);
      const fileURL = URL.createObjectURL(file);
      
      // Simulate loading time for better UX
      setTimeout(() => {
        setPdfFile(fileURL);
        setIsLoading(false);
      }, 1000);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
  };

  const changeTheme = (theme) => {
    setCurrentTheme(theme);
  };

  const themes = {
    classic: {
      background: "bg-amber-50",
      bookCover: "bg-amber-800",
      pageColor: "bg-white",
      text: "text-amber-900"
    },
    modern: {
      background: "bg-slate-100",
      bookCover: "bg-blue-600",
      pageColor: "bg-white",
      text: "text-slate-800"
    },
    dark: {
      background: "bg-gray-900",
      bookCover: "bg-gray-800",
      pageColor: "bg-gray-200",
      text: "text-white"
    }
  };

  return (
    <div className={`min-h-screen ${themes[currentTheme].background} flex flex-col items-center p-6`}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        <header className="flex items-center justify-between mb-8">
          <motion.div 
            className="flex items-center gap-2" 
            whileHover={{ scale: 1.05 }}
          >
            <BookOpen size={28} className={themes[currentTheme].text} />
            <h1 className={`text-3xl font-bold ${themes[currentTheme].text}`}>PDF Flipbook</h1>
          </motion.div>
          
          {/* Theme selector */}
          <div className="flex gap-2">
            <button 
              onClick={() => changeTheme('classic')}
              className={`w-6 h-6 rounded-full bg-amber-800 ${currentTheme === 'classic' ? 'ring-2 ring-black' : ''}`}
            />
            <button 
              onClick={() => changeTheme('modern')}
              className={`w-6 h-6 rounded-full bg-blue-600 ${currentTheme === 'modern' ? 'ring-2 ring-black' : ''}`}
            />
            <button 
              onClick={() => changeTheme('dark')}
              className={`w-6 h-6 rounded-full bg-gray-800 ${currentTheme === 'dark' ? 'ring-2 ring-white' : ''}`}
            />
          </div>
        </header>

        {!pdfFile ? (
          <motion.div 
            className={`border-4 border-dashed ${themes[currentTheme].text} border-opacity-20 rounded-lg p-12 flex flex-col items-center justify-center`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div 
              className="relative group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="file"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                accept="application/pdf"
              />
              <div className={`flex flex-col items-center gap-4 ${themes[currentTheme].text}`}>
                <motion.div 
                  initial={{ y: 0 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Upload size={64} />
                </motion.div>
                <p className="text-xl font-medium">Upload your PDF</p>
                <p className="text-sm opacity-70">Click or drag file here</p>
              </div>
            </motion.div>

            {/* Sample preview */}
            <motion.div 
              className="mt-16 relative perspective" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className={`text-center mb-4 ${themes[currentTheme].text}`}>Preview how your document will look:</p>
              <div className="flex justify-center">
                <div className="relative w-64 h-80">
                  {/* Book cover */}
                  <motion.div 
                    className={`absolute w-full h-full ${themes[currentTheme].bookCover} rounded shadow-lg`}
                    animate={{ rotateY: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  />
                  {/* Pages */}
                  <motion.div 
                    className={`absolute w-full h-full ${themes[currentTheme].pageColor} rounded -right-1 -bottom-1`}
                  />
                  <motion.div 
                    className={`absolute w-full h-full ${themes[currentTheme].pageColor} rounded -right-2 -bottom-2`}
                  />
                  <motion.div 
                    className={`absolute w-full h-full flex items-center justify-center ${themes[currentTheme].pageColor} rounded -right-3 -bottom-3`}
                  >
                    <p className="text-gray-400 text-center">Your<br />Content<br />Here</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
          >
            {isLoading ? (
              <div className="w-full h-96 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <motion.div 
                  className="absolute -top-12 right-0 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <button 
                    onClick={handleRemovePdf} 
                    className={`flex items-center gap-2 px-4 py-2 rounded-full ${themes[currentTheme].bookCover} text-white hover:opacity-90 transition-opacity`}
                  >
                    <X size={16} />
                    <span>Close Book</span>
                  </button>
                </motion.div>
                
                <div className="relative">
                  <Flipbook 
                    pdfUrl={pdfFile} 
                    theme={currentTheme} 
                    themeColors={themes[currentTheme]} 
                  />
                  
                  {/* Navigation controls */}
                  <div className="flex justify-center gap-8 mt-6">
                    <motion.button 
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${themes[currentTheme].bookCover} text-white`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowLeft size={20} />
                    </motion.button>
                    
                    <motion.button 
                      className={`flex items-center justify-center w-12 h-12 rounded-full ${themes[currentTheme].bookCover} text-white`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight size={20} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
      
      {/* Features highlight */}
      <motion.div 
        className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl ${themes[currentTheme].text}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-center">
          <motion.div 
            className="flex justify-center mb-4"
            whileHover={{ rotate: 10 }}
          >
            <div className={`w-16 h-16 rounded-full ${themes[currentTheme].bookCover} text-white flex items-center justify-center`}>
              <BookOpen size={24} />
            </div>
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">Realistic Page Turning</h3>
          <p className="opacity-70">Experience fluid, realistic page turning animations just like a physical book.</p>
        </div>
        
        <div className="text-center">
          <motion.div 
            className="flex justify-center mb-4"
            whileHover={{ scale: 1.1 }}
          >
            <div className={`w-16 h-16 rounded-full ${themes[currentTheme].bookCover} text-white flex items-center justify-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/>
                <path d="M12 12v9"/>
                <path d="m16 16-4-4-4 4"/>
              </svg>
            </div>
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">Multiple Themes</h3>
          <p className="opacity-70">Choose from classic, modern, or dark themes to match your reading preference.</p>
        </div>
        
        <div className="text-center">
          <motion.div 
            className="flex justify-center mb-4"
            whileHover={{ y: -5 }}
          >
            <div className={`w-16 h-16 rounded-full ${themes[currentTheme].bookCover} text-white flex items-center justify-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m15 9-6 6"/>
                <path d="m9 9 6 6"/>
              </svg>
            </div>
          </motion.div>
          <h3 className="text-lg font-semibold mb-2">Interactive Controls</h3>
          <p className="opacity-70">Easily navigate through pages with intuitive controls and gestures.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default App;
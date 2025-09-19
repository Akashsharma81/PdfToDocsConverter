
import { FileText, Upload, Download, Star } from 'lucide-react';
const Navbar= ({
  onStartConverting,
  onViewHistory,
}: {
  onStartConverting: () => void;
  onViewHistory: () => void;
}) => {

  return (
    <div className=" pb-4" style={{
      background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)'
    }}>
      {/* Header */}
      <header className="border-b border-gray-200 backdrop-blur-sm " style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',position:'sticky',top:'0',zIndex:'50'
      }}>
        <div className="container mx-auto px-6 py-4 max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)'
                }}
              >
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  PdfConverter 
                </h1>
                <p className="text-sm text-gray-600">Professional Document Conversion</p>
              </div>
            </div>
           
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center ">
          <div className="max-w-4xl mx-auto">
            {/* Hero Image Placeholder */}


            <h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-hero mt-4 mb-4"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 30%, #4f46e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Convert Documents with Ease
            </h1>
            <p className="text-md text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your PDFs to DOCX files and vice versa with our professional-grade converter. 
              Fast, secure, and reliable document conversion at your fingertips.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 mt-4">
              <button 
              onClick={onStartConverting}
                className="px-8 py-4 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)'
                }}
           
              >
                <Upload className="w-5 h-5 mr-2" />
                Start Converting
              </button>
              <button 
               onClick={onViewHistory}
               style={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)'
                }}
                className="px-8 py-4 border-2 border-gray-300 text-white rounded-xl font-semibold hover:scale-105 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 flex items-center justify-center"
              >
                <Download className="w-5 h-5 mr-2" />
                View history
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-semibold text-gray-800">4.9/5</span> Rating
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div>
                <span className="font-semibold text-gray-800">50,000+</span> Files Converted
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
              <div>
                <span className="font-semibold text-gray-800">99.9%</span> Uptime
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Navbar;
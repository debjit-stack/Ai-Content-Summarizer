// import { Brain, Sparkles } from 'lucide-react';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-sm border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-3">
//             <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
//               <Brain className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
//                 <span>AI Content Summarizer</span>
//                 <Sparkles className="w-4 h-4 text-yellow-500" />
//               </h1>
//               <p className="text-sm text-gray-500">Intelligent content summarization</p>
//             </div>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-4">
//             <div className="text-sm text-gray-600">
//               Powered by <span className="font-semibold text-blue-600">Gemini AI</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import { Brain, Sparkles, Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="glass-card border-b border-theme sticky top-0 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-primary shadow-glow animate-float">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-success rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-theme-foreground flex items-center space-x-2">
                <span className="text-gradient">AI Content Summarizer</span>
                <Sparkles className="w-5 h-5 text-yellow-500 animate-bounce-in" />
              </h1>
              <p className="text-sm text-theme-muted animate-fade-in">
                Intelligent content summarization
              </p>
            </div>
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-3">
              <span className="hidden sm:block text-sm text-theme-muted">
                Theme
              </span>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`theme-toggle ${darkMode ? 'dark' : ''} hover-glow`}
                aria-label="Toggle theme"
              >
                <div className="theme-toggle-thumb flex items-center justify-center">
                  {darkMode ? (
                    <Moon className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Sun className="w-3 h-3 text-yellow-500" />
                  )}
                </div>
              </button>
            </div>

            {/* Powered By
            <div className="hidden md:flex items-center space-x-2 glass px-4 py-2 rounded-lg">
              <span className="text-sm text-theme-muted">Powered by</span>
              <span className="text-sm font-semibold text-gradient">Gemini AI</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div> */}

            {/* Status Indicator */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1 glass rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-theme-muted">Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
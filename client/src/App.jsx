// import { useState } from 'react';
// import { Provider } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// import { FileText, History, Menu, X } from 'lucide-react';
// import { store } from './store/index.js';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Summarizer from './features/summarizer/Summarizer.jsx';
// import HistoryComponent from './features/summarizer/History.jsx';

// function App() {
//   const [activeTab, setActiveTab] = useState('summarizer');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const navigation = [
//     {
//       id: 'summarizer',
//       name: 'Create Summary',
//       icon: FileText,
//       component: Summarizer
//     },
//     {
//       id: 'history',
//       name: 'History',
//       icon: History,
//       component: HistoryComponent
//     }
//   ];

//   const ActiveComponent = navigation.find(nav => nav.id === activeTab)?.component || Summarizer;

//   return (
//     <Provider store={store}>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Header />
        
//         <div className="flex-1 flex">
//           {/* Mobile sidebar backdrop */}
//           {sidebarOpen && (
//             <div 
//               className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//               onClick={() => setSidebarOpen(false)}
//             />
//           )}

//           {/* Sidebar */}
//           <div className={`
//             fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
//             ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
//           `}>
//             <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
//               <span className="text-lg font-semibold text-gray-900">Menu</span>
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="p-2 text-gray-400 hover:text-gray-600"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <nav className="p-4">
//               <ul className="space-y-2">
//                 {navigation.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <li key={item.id}>
//                       <button
//                         onClick={() => {
//                           setActiveTab(item.id);
//                           setSidebarOpen(false);
//                         }}
//                         className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
//                           activeTab === item.id
//                             ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
//                             : 'text-gray-700 hover:bg-gray-100'
//                         }`}
//                       >
//                         <Icon className="w-5 h-5" />
//                         <span className="font-medium">{item.name}</span>
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>

//             <div className="absolute bottom-4 left-4 right-4">
//               <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-xs text-blue-700 font-medium mb-1">
//                   💡 Pro Tip
//                 </p>
//                 <p className="text-xs text-blue-600">
//                   Use tags to organize your summaries and make them easier to find later.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Main content */}
//           <div className="flex-1 flex flex-col">
//             {/* Mobile menu button */}
//             <div className="lg:hidden p-4 border-b border-gray-200 bg-white">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
//               >
//                 <Menu className="w-5 h-5" />
//                 <span>Menu</span>
//               </button>
//             </div>

//             {/* Page content */}
//             <main className="flex-1 overflow-auto">
//               <div className="py-6">
//                 <ActiveComponent />
//               </div>
//             </main>
//           </div>
//         </div>

//         <Footer />
        
//         {/* Toast notifications */}
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: '#363636',
//               color: '#fff',
//             },
//             success: {
//               iconTheme: {
//                 primary: '#10B981',
//                 secondary: '#fff',
//               },
//             },
//             error: {
//               iconTheme: {
//                 primary: '#EF4444',
//                 secondary: '#fff',
//               },
//             },
//           }}
//         />
//       </div>
//     </Provider>
//   );
// }

// export default App;

// // export default function App() {
// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <h1 className="text-4xl font-bold text-blue-600">✅ Tailwind is Working!</h1>
// //     </div>
// //   )
// // }


// import { useState, useEffect } from 'react';
// import { Provider } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// import { FileText, History, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
// import { store } from './store/index.js';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Summarizer from './features/summarizer/Summarizer.jsx';
// import HistoryComponent from './features/summarizer/History.jsx';
// import './index.css'  // This line must be present

// function App() {
//   const [activeTab, setActiveTab] = useState('summarizer');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(() => {
//     // Check for saved theme preference or default to light mode
//     const saved = localStorage.getItem('theme');
//     return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
//   });

//   // Apply theme on mount and changes
//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.setAttribute('data-theme', 'dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.removeAttribute('data-theme');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const navigation = [
//     {
//       id: 'summarizer',
//       name: 'Create Summary',
//       icon: FileText,
//       component: Summarizer
//     },
//     {
//       id: 'history',
//       name: 'History',
//       icon: History,
//       component: HistoryComponent
//     }
//   ];

//   const ActiveComponent = navigation.find(nav => nav.id === activeTab)?.component || Summarizer;

//   return (
//     <Provider store={store}>
//       <div className="min-h-screen bg-theme-background flex flex-col transition-colors duration-300">
//         <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
//         <div className="flex-1 flex">
//           {/* Mobile sidebar backdrop */}
//           {sidebarOpen && (
//             <div 
//               className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden animate-fade-in"
//               onClick={() => setSidebarOpen(false)}
//             />
//           )}

//           {/* Sidebar */}
//           <div className={`
//             sidebar glass-card
//             ${sidebarOpen ? 'open' : ''}
//           `}>
//             {/* Mobile Header */}
//             <div className="flex items-center justify-between p-6 border-b border-theme lg:hidden">
//               <div className="flex items-center space-x-3">
//                 <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
//                   <FileText className="w-4 h-4 text-white" />
//                 </div>
//                 <span className="text-lg font-bold text-theme-foreground">Menu</span>
//               </div>
//               <button
//                 onClick={() => setSidebarOpen(false)}
//                 className="p-2 text-theme-muted hover:text-theme-foreground transition-colors rounded-lg hover:bg-theme-card"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Navigation */}
//             <nav className="p-6">
//               <ul className="space-y-3">
//                 {navigation.map((item) => {
//                   const Icon = item.icon;
//                   return (
//                     <li key={item.id}>
//                       <button
//                         onClick={() => {
//                           setActiveTab(item.id);
//                           setSidebarOpen(false);
//                         }}
//                         className={`nav-item w-full ${
//                           activeTab === item.id ? 'active' : ''
//                         }`}
//                       >
//                         <Icon className="w-5 h-5" />
//                         <span className="font-medium">{item.name}</span>
//                         {activeTab === item.id && (
//                           <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
//                         )}
//                       </button>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </nav>

//             {/* Theme Toggle */}
//             <div className="px-6 py-4">
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-sm font-medium text-theme-foreground">Theme</span>
//                 <button
//                   onClick={() => setDarkMode(!darkMode)}
//                   className={`theme-toggle ${darkMode ? 'dark' : ''}`}
//                   aria-label="Toggle theme"
//                 >
//                   <div className="theme-toggle-thumb flex items-center justify-center">
//                     {darkMode ? (
//                       <Moon className="w-3 h-3 text-blue-500" />
//                     ) : (
//                       <Sun className="w-3 h-3 text-yellow-500" />
//                     )}
//                   </div>
//                 </button>
//               </div>
//             </div>

//             {/* Pro Tip */}
//             <div className="absolute bottom-6 left-6 right-6">
//               <div className="glass-card p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
//                 <p className="text-xs font-bold text-blue-700 mb-2 flex items-center space-x-1">
//                   <Sparkles className="w-3 h-3" />
//                   <span>Pro Tip</span>
//                 </p>
//                 <p className="text-xs text-blue-600 leading-relaxed">
//                   Use tags to organize your summaries and make them easier to find later.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Main content */}
//           <div className="flex-1 flex flex-col">
//             {/* Mobile menu button */}
//             <div className="lg:hidden p-4 border-b border-theme bg-theme-card">
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="flex items-center space-x-2 px-4 py-2 rounded-lg text-theme-muted hover:text-theme-foreground hover:bg-theme-background transition-all duration-200"
//               >
//                 <Menu className="w-5 h-5" />
//                 <span className="font-medium">Menu</span>
//               </button>
//             </div>

//             {/* Page content */}
//             <main className="flex-1 overflow-auto bg-theme-background">
//               <div className="py-8 animate-fade-in">
//                 <ActiveComponent />
//               </div>
//             </main>
//           </div>
//         </div>

//         <Footer />
        
//         {/* Toast notifications with theme support */}
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 4000,
//             style: {
//               background: darkMode ? '#1e293b' : '#ffffff',
//               color: darkMode ? '#f8fafc' : '#0f172a',
//               border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
//               boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
//             },
//             success: {
//               iconTheme: {
//                 primary: '#22c55e',
//                 secondary: darkMode ? '#1e293b' : '#ffffff',
//               },
//             },
//             error: {
//               iconTheme: {
//                 primary: '#ef4444',
//                 secondary: darkMode ? '#1e293b' : '#ffffff',
//               },
//             },
//           }}
//         />
//       </div>
//     </Provider>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { FileText, History, Sun, Moon, Sparkles } from 'lucide-react';
import { store } from './store/index.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Summarizer from './features/summarizer/Summarizer.jsx';
import HistoryComponent from './features/summarizer/History.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('summarizer');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const navigation = [
    { id: 'summarizer', name: 'Create Summary', icon: FileText, component: Summarizer },
    { id: 'history', name: 'History', icon: History, component: HistoryComponent }
  ];

  const ActiveComponent = navigation.find(nav => nav.id === activeTab)?.component || Summarizer;

  return (
    <Provider store={store}>
      {/* --- Main container is now a full-height flex column --- */}
      <div className="h-screen bg-theme-background flex flex-col transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        {/* --- Content container allows sections to scroll independently --- */}
        <div className="flex-1 flex overflow-hidden">
          {/* --- SIDEBAR (Fixed with its own scrollbar) --- */}
          <aside className="w-64 flex-shrink-0 glass-card border-r border-theme hidden lg:flex lg:flex-col overflow-y-auto">
            <nav className="p-6 flex-1">
              <ul className="space-y-3">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveTab(item.id)}
                        className={`nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                        {activeTab === item.id && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-6 mt-auto"> {/* Use mt-auto to push to bottom */}
              <div className="glass-card p-4 border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <p className="text-xs font-bold text-blue-700 mb-2 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Pro Tip</span>
                </p>
                <p className="text-xs text-blue-600 leading-relaxed">
                  Use tags to organize your summaries and make them easier to find later.
                </p>
              </div>
            </div>
          </aside>

          {/* --- MAIN CONTENT (Scrollable) --- */}
          <main className="flex-1 overflow-y-auto">
            <div className="py-8 px-6 animate-fade-in">
              <ActiveComponent />
            </div>
          </main>
        </div>
        <Footer /> 
      </div>
      <Toaster
          position="top-right"
          // ... (Toaster options remain the same)
      />
    </Provider>
  );
}

export default App;
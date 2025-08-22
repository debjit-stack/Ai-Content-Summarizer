import { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { FileText, History, Menu, X, Sparkles } from 'lucide-react';
import { store } from './store/index.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Summarizer from './features/summarizer/Summarizer.jsx';
import HistoryComponent from './features/summarizer/History.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('summarizer');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Reusable sidebar content to avoid duplication
  const SidebarContent = () => (
    <>
      <nav className="p-6 flex-1">
        <ul className="space-y-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false); // Close sidebar on mobile after click
                  }}
                  className={`nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                  {activeTab === item.id && <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-6 mt-auto">
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
    </>
  );

  return (
    <Provider store={store}>
      <div className="h-screen bg-theme-background flex flex-col transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* --- Static Sidebar for Desktop --- */}
          <aside className="w-64 flex-shrink-0 glass-card border-r border-theme hidden lg:flex lg:flex-col overflow-y-auto">
            <SidebarContent />
          </aside>

          {/* --- Mobile Menu Button & Sidebar --- */}
          <div className="lg:hidden">
            {/* Menu Button */}
            <div className="fixed top-20 left-4 z-30">
               <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg glass-card shadow-lg"
                  aria-label="Open menu"
                >
                  <Menu className="w-6 h-6 text-theme-foreground" />
                </button>
            </div>
            {/* Backdrop */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setSidebarOpen(false)}></div>}
            {/* Mobile Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 z-50 glass-card border-r border-theme flex flex-col transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <button onClick={() => setSidebarOpen(false)} className="absolute top-4 right-4 p-2 text-theme-muted hover:text-theme-foreground" aria-label="Close menu"><X/></button>
              <SidebarContent />
            </aside>
          </div>

          {/* --- Main Content (Scrollable) --- */}
          <main className="flex-1 overflow-y-auto">
            <div className="py-8 px-4 sm:px-6 lg:px-8 animate-fade-in">
              <ActiveComponent />
            </div>
          </main>
        </div>

        <Footer />
      </div>
      <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: darkMode ? '#1e293b' : '#ffffff',
              color: darkMode ? '#f8fafc' : '#0f172a',
              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
            },
            success: { iconTheme: { primary: '#22c55e', secondary: 'white' } },
            error: { iconTheme: { primary: '#ef4444', secondary: 'white' } },
          }}
      />
    </Provider>
  );
}

export default App;

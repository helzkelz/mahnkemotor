import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import { ContentDisplay } from './components/ContentDisplay';
import AiPage from './components/AiPage';
import { CONTENT_PAGES, NAV_STRUCTURE } from './constants';
import { PageType } from './types';

const App: React.FC = () => {
  const [activePageId, setActivePageId] = useState<string>('home');
  const [activePageType, setActivePageType] = useState<PageType>(PageType.HOME);

  const handleNavClick = (pageId: string, pageType: PageType) => {
    setActivePageId(pageId);
    setActivePageType(pageType);
  };

  const activeContent = useMemo(() => {
    if (activePageType === PageType.CONTENT) {
      return CONTENT_PAGES.find(p => p.id === activePageId);
    }
    return null;
  }, [activePageId, activePageType]);

  const renderContent = () => {
    switch (activePageType) {
      case PageType.HOME:
        return <HomePage onNavigate={handleNavClick} />;
      case PageType.AI:
        return <AiPage />;
      case PageType.CONTENT:
        if (activeContent) {
          return <ContentDisplay content={activeContent} />;
        }
        return <div className="p-8 text-red-500">Error: Content not found.</div>;
      default:
        return <HomePage onNavigate={handleNavClick} />;
    }
  };

  return (
    <div className="flex h-screen bg-black text-green-400 font-mono">
      <Sidebar 
        navStructure={NAV_STRUCTURE} 
        activePageId={activePageId} 
        onNavClick={handleNavClick} 
      />
      <main className="flex-1 overflow-y-auto bg-[#0A0A0A] border-l-2 border-green-900/50">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
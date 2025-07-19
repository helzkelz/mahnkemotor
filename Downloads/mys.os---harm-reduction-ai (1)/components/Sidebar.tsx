import React from 'react';
import { NavCategory, PageType } from '../types';

interface SidebarProps {
  navStructure: NavCategory[];
  activePageId: string;
  onNavClick: (pageId: string, pageType: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navStructure, activePageId, onNavClick }) => {
  return (
    <aside className="w-64 bg-black text-green-400 p-4 flex flex-col h-full">
      <h1 className="text-2xl font-bold mb-2 text-center border-b-2 border-green-900/50 pb-2">
        MYS.OS
      </h1>
      <p className="text-xs text-green-700 text-center mb-6">v0.9 BLACKLINE</p>
      
      <nav className="flex-grow">
        {navStructure.map((category, catIndex) => (
          <div key={catIndex} className="mb-6">
            <h2 className="text-sm text-green-600 uppercase tracking-widest mb-2 border-b border-green-900/30">
              {category.label}
            </h2>
            <ul>
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <button
                    onClick={() => onNavClick(item.pageId, item.type)}
                    className={`w-full text-left p-2 rounded-md transition-all duration-200 text-sm ${
                      activePageId === item.pageId
                        ? 'bg-green-400 text-black font-bold'
                        : 'hover:bg-green-900/50 hover:text-green-300'
                    }`}
                  >
                    {`> ${item.label}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <div className="text-center text-xs text-green-800 mt-auto">
        <p>HELENKELLA.COM</p>
        <p>"Knowledge is armor."</p>
      </div>
    </aside>
  );
};

export default Sidebar;
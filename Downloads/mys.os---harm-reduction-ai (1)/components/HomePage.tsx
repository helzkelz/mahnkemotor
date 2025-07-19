import React from 'react';
import { PageType } from '../types';

interface HomePageProps {
  onNavigate: (pageId: string, pageType: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const NavLink: React.FC<{ pageId: string; pageType: PageType; children: React.ReactNode }> = ({ pageId, pageType, children }) => (
    <button onClick={() => onNavigate(pageId, pageType)} className="text-green-400 hover:text-white hover:bg-green-900/50 p-1 rounded transition-colors duration-200">
      {children}
    </button>
  );

  return (
    <div className="p-8 text-green-400 animate-fadeIn">
      <div className="border-2 border-green-900/50 p-6 bg-black/30">
        <h1 className="text-4xl font-bold mb-2 text-white">
          <span className="animate-pulse">🧠</span> MYS.OS — Applied Psychopharmacology
        </h1>
        <p className="text-lg text-green-300">
          "Where harm reduction, enhancement, and acknowledgement converge."
        </p>
        <div className="my-6 border-t border-green-900/50"></div>
        <p className="mb-6 text-green-300/90">
          <span className="text-white font-bold">HELENKELLA.COM</span> is an open-source intelligence framework for navigating psychoactive landscapes. We provide uncensored, data-driven protocols for those who engage with high-risk compounds. This is a space for radical self-responsibility, moving beyond moral judgment to pure, functional knowledge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-green-900/50 p-4 bg-black/20">
            <h2 className="text-xl text-white font-bold mb-3">💊 Substance Intel</h2>
            <ul className="space-y-1 list-inside list-disc marker:text-green-600">
              <li><NavLink pageId="cocaine" pageType={PageType.CONTENT}>Cocaine – SNOWJACK</NavLink></li>
              <li><NavLink pageId="mdma" pageType={PageType.CONTENT}>MDMA – CRYSTALBRACE</NavLink></li>
              <li><NavLink pageId="ketamine" pageType={PageType.CONTENT}>Ketamine – GHOSTTANK</NavLink></li>
              <li><NavLink pageId="lsd" pageType={PageType.CONTENT}>LSD – FRACTALCORE</NavLink></li>
            </ul>
          </div>

          <div className="border border-green-900/50 p-4 bg-black/20">
            <h2 className="text-xl text-white font-bold mb-3">🛠️ Protocol Manuals</h2>
            <ul className="space-y-1 list-inside list-disc marker:text-green-600">
              <li><NavLink pageId="test-kits" pageType={PageType.CONTENT}>Reagent & Fentanyl Testing</NavLink></li>
              <li><NavLink pageId="emergency" pageType={PageType.CONTENT}>Overdose Response</NavLink></li>
              <li><NavLink pageId="stacking" pageType={PageType.CONTENT}>Stacking & Synergy</NavLink></li>
            </ul>
          </div>
          
          <div className="border border-green-900/50 p-4 bg-black/20">
            <h2 className="text-xl text-white font-bold mb-3">🔮 AI OPS INTERFACE</h2>
             <p className="text-sm mb-3 text-green-300/80">Engage HOLLOWPOINT for real-time intel, synergy analysis, and risk mitigation.</p>
             <NavLink pageId="ai" pageType={PageType.AI}>[LAUNCH AI INTERFACE]</NavLink>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-green-900/50 text-center text-green-600/70 text-sm">
            <p>Objective: To arm the individual with the knowledge required to navigate altered states with precision and control. Acknowledge risk. Mitigate harm. Optimize outcome.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
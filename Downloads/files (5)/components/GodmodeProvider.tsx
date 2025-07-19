import React, { createContext, useContext, useEffect } from 'react';
import { useStore } from '../store';
import { personaThemes } from '../themes/personaThemes';
import { useAgentBus } from '../utils/agentClient';

const GodmodeContext = createContext({});

export function GodmodeProvider({ children }) {
  const { persona, session, consent, careStatus, setCareStatus } = useStore();
  const theme = personaThemes[persona] || personaThemes['default'];

  useAgentBus({ setCareStatus }); // Subscribes to live agent/care events

  return (
    <GodmodeContext.Provider value={{ persona, session, consent, careStatus, theme }}>
      <div style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: theme.fontFamily,
        minHeight: '100vh',
        transition: 'background 0.7s, color 0.7s, font-family 0.5s'
      }}>
        {children}
      </div>
    </GodmodeContext.Provider>
  );
}
export const useGodmode = () => useContext(GodmodeContext);
import React, { createContext, useContext, useEffect } from 'react';
import { useStore } from '../store';
import { personaThemes } from '../themes/personaThemes';
import { subscribeToStatus, subscribeToCare } from '../utils/agentClient';

const GodmodeContext = createContext({});

export function GodmodeContextProvider({ children }) {
  const { persona, session, consent, featureUnlocks, setCareStatus } = useStore();
  const theme = personaThemes[persona] || personaThemes['default'];

  useEffect(() => {
    // Subscribe to ritual status and care events
    const unsubStatus = subscribeToStatus((status) => {
      // handle status updates (e.g., show live ritual feedback)
    });
    const unsubCare = subscribeToCare((care) => {
      setCareStatus(care);
      // handle care events (overwhelm, aftercare, consent check-in)
    });
    return () => {
      unsubStatus();
      unsubCare();
    };
  }, []);

  return (
    <GodmodeContext.Provider value={{
      persona,
      session,
      consent,
      featureUnlocks,
      theme,
    }}>
      <div style={{
        background: theme.bg,
        color: theme.text,
        fontFamily: theme.fontFamily,
        minHeight: '100vh'
      }}>
        {children}
      </div>
    </GodmodeContext.Provider>
  );
}

export const useGodmode = () => useContext(GodmodeContext);
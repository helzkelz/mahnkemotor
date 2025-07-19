import { useEffect } from 'react';

// Example: Subscribes to agent/daemon events (using WebSocket or SSE)
export function useAgentBus({ setCareStatus }) {
  useEffect(() => {
    const ws = new WebSocket('wss://your-godmode-agent-bus');
    ws.onmessage = (msg) => {
      const evt = JSON.parse(msg.data);
      if (evt.type === 'careStatusUpdate') setCareStatus(evt.payload);
      // handle more event types...
    };
    return () => ws.close();
  }, [setCareStatus]);
}
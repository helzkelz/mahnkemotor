// PHASE 2 — THE THRESHOLD (Persona Portal)
// Animated grid of persona glyphs. Selection locks in persona and advances.
// Requires supporting files: store.ts, config/personas.json, icons/svg.

import { useStore } from '../store';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import personas from '../config/personas.json';

export default function PersonaPortal() {
  const { setPersona } = useStore();
  const router = useRouter();

  const handleSelectPersona = (personaId: string) => {
    setPersona(personaId);
    // Animate selection, then route
    setTimeout(() => router.push('/dashboard'), 600);
  };

  return (
    <div className="portal-grid" style={{
      minHeight: '100vh',
      background: '#0e0e0e',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '2rem',
      alignItems: 'center',
      justifyItems: 'center',
      padding: '4rem 2rem'
    }}>
      {personas.map(p => (
        <motion.div
          key={p.id}
          className={`persona-glyph persona-${p.id}`}
          onClick={() => handleSelectPersona(p.id)}
          whileHover={{ scale: 1.13, rotate: 1, filter: 'brightness(1.3)' }}
          whileTap={{ scale: 0.94, rotate: -2 }}
          style={{
            cursor: 'pointer',
            position: 'relative',
            padding: '1.5rem',
            borderRadius: '2rem',
            background: 'rgba(40,40,40,0.1)',
            boxShadow: '0 2px 16px #0008'
          }}
        >
          {/* Swap for animated SVG/icon */}
          <img src={p.icon} alt={p.name} style={{ width: 64, height: 64 }} />
          <motion.div
            className="tooltip"
            initial={{ opacity: 0, y: 15 }}
            whileHover={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '110%',
              transform: 'translateX(-50%)',
              background: '#222c',
              color: '#fff',
              padding: '0.6rem 1.2rem',
              borderRadius: '1rem',
              fontSize: '1rem',
              pointerEvents: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            <b>{p.name}</b>: {p.description}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
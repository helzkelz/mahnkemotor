import { motion, AnimatePresence } from 'framer-motion';

export default function RitualTransition({ show, onEnd }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: 1.02 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.95 }}
          style={{
            position: 'fixed', inset: 0, background: 'radial-gradient(circle, #e5025b 0%, #18081b 100%)',
            zIndex: 20000, display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onAnimationComplete={onEnd}
        >
          <svg width="160" height="160" viewBox="0 0 160 160">
            {/* Animated sigil */}
            <circle cx="80" cy="80" r="70" stroke="#fff" strokeWidth="4" fill="none" />
            <circle cx="80" cy="80" r="30" stroke="#e5025b" strokeWidth="8" fill="none" />
            {/* ...add more SVG ritual marks */}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
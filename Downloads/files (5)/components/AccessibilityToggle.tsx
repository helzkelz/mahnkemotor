import { useStore } from '../store';

export default function AccessibilityToggle() {
  const { overwhelmShield, setOverwhelmShield } = useStore();
  return (
    <button
      style={{
        position: 'fixed', bottom: 16, left: 16, zIndex: 10000,
        background: overwhelmShield ? '#39ff14' : '#333', color: '#111',
        border: 'none', borderRadius: 12, padding: '10px 22px', fontWeight: 700
      }}
      onClick={() => setOverwhelmShield(!overwhelmShield)}
    >
      {overwhelmShield ? "Overwhelm Shield: ON" : "Overwhelm Shield: OFF"}
    </button>
  );
}
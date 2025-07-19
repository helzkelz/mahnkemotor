import { useGodmode } from './GodmodeProvider';

export default function LiveDaemonStatus() {
  const { careStatus } = useGodmode();
  return (
    <div style={{
      position: 'fixed',
      top: 10, right: 10, zIndex: 10000,
      background: '#20202aee', color: '#fff', borderRadius: 12, padding: '8px 20px',
      boxShadow: '0 2px 12px #0008', fontSize: 16
    }}>
      <b>Active Daemons:</b>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {careStatus.activeDaemons.map(d => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
}
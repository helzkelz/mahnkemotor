import { useGodmode } from './GodmodeProvider';

export default function ConsentPanel() {
  const { consent, careStatus } = useGodmode();
  return (
    <div style={{
      position: 'fixed', bottom: 0, right: 0, zIndex: 9999,
      background: '#1a1e22f8', color: '#fff', borderTopLeftRadius: 18, padding: '12px 24px',
      boxShadow: '0 -2px 14px #0005'
    }}>
      <h4>Consent & Safety</h4>
      <p>{consent ? 'You are in control. Consent is active.' : 'Consent required for rituals.'}</p>
      <p>Status: {careStatus.overwhelm ? "Overwhelm detected — aftercare recommended." : "All clear."}</p>
      {/* Ritualized consent/aftercare buttons or info */}
    </div>
  );
}
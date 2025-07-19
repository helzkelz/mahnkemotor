import { useState } from 'react';
export default function ConsentCheckIn({ context, onUpdate }) {
  const [consented, setConsented] = useState(false);
  return (
    <div>
      <p>Ready to continue with <b>{context}</b>?</p>
      <button onClick={() => { setConsented(true); onUpdate(true); }}>Yes</button>
      <button onClick={() => { setConsented(false); onUpdate(false); }}>Pause</button>
    </div>
  );
}
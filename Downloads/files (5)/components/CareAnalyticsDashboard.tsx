import { useEffect, useState } from 'react';
export default function CareAnalyticsDashboard() {
  const [careStats, setCareStats] = useState({});
  useEffect(() => {
    // Fetch stats from FRACTALMAPPER/SENTINEL
    fetch('/api/care-stats').then(r => r.json()).then(setCareStats);
  }, []);
  return (
    <div>
      <h3>Care Analytics</h3>
      <pre>{JSON.stringify(careStats, null, 2)}</pre>
    </div>
  );
}
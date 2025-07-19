import { useStore } from '../store';

export default function Onboarding() {
  const { setIntent } = useStore();
  const options = [
    { id: "create", label: "I'm here to create something new." },
    { id: "ritual", label: "I want to experience a ritual." },
    { id: "aftercare", label: "I need aftercare/resources." },
    { id: "chaos", label: "I'm here for chaos, satire, or critique." },
  ];
  return (
    <div className="onboarding-perspective">
      <h2>What brings you here?</h2>
      <ul>
        {options.map(o => (
          <li key={o.id}>
            <button onClick={() => setIntent(o.id)}>{o.label}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
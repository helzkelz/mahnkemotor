import { useStore } from "../store";

export default function AftercarePanel() {
  const { persona } = useStore();
  if (!persona) return null;

  let msg = null;
  if (persona === "cozycore") msg = "Need a break? Cozycore Aftercare: guided relaxation and peer support.";
  if (persona === "chaos-muppet") msg = "Chaos can be overwhelming—remember to check in with yourself. Aftercare is always available.";
  if (persona === "creative-wizard") msg = "Creative burnout is real. Ritual over grind—rest and reflect when needed.";
  if (persona === "satirium-agent") msg = "Satire can cut deep. Aftercare and boundaries are sacred here.";

  return (
    <div style={{
      position: "fixed", right: 20, bottom: 20, zIndex: 9999,
      background: "#181818ee", color: "#39ff14", padding: "1.2em 2.2em",
      borderRadius: 20, fontWeight: 600, boxShadow: "0 2px 10px #000a"
    }}>
      {msg}
    </div>
  );
}
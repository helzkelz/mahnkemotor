import { useStore } from "../store";

export default function PersonaBanner() {
  const { persona } = useStore();
  if (!persona) return null;

  let banner = null;
  if (persona === "creative-wizard") banner = "🪄 You are a Creative Wizard. Let your ideas mutate.";
  if (persona === "chaos-muppet") banner = "🎭 Embrace chaos. Rituals await.";
  if (persona === "cozycore") banner = "☕ Cozycore active. Safety and comfort prioritized.";
  if (persona === "satirium-agent") banner = "🦹 Satirium Agent: Satire and critique, weaponized (with consent).";

  return (
    <div style={{
      background: "#222c",
      color: "#e5025b",
      padding: "1em 2em",
      marginBottom: 24,
      borderRadius: 16,
      fontWeight: 700,
      fontSize: "1.1em",
      textAlign: "center",
    }}>
      {banner}
    </div>
  );
}
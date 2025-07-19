import { useStore } from "../store";

export default function Dashboard() {
  const { persona, intent } = useStore();

  if (!persona || !intent) {
    if (typeof window !== "undefined") window.location.href = "/onboarding";
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0e0e0e", color: "#fff", padding: 48 }}>
      <h1>
        {persona === "creative-wizard" && "Creative Wizard Dashboard"}
        {persona === "chaos-muppet" && "Chaos Muppet Dashboard"}
        {persona === "cozycore" && "Cozycore Sanctuary"}
        {persona === "satirium-agent" && "Satirium Agent Control Room"}
      </h1>
      <p>
        {intent === "create" && "Summon new projects, zines, or artifacts."}
        {intent === "ritual" && "Browse or join live rituals and experiences."}
        {intent === "aftercare" && "Access self-care, community, and mental health tools."}
        {intent === "satire" && "Explore the Satirium, roast, critique, and meme with consent."}
      </p>
      {/* Drop in persona/adaptive UI modules or links here */}
    </div>
  );
}
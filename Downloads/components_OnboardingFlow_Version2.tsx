import { useState } from "react";
import { useStore } from "../store";

// Example options, adapt as needed for your personas/intents
const perspectiveOptions = [
  {
    id: "create",
    label: "I'm here to create something new.",
    desc: "Summon tools, rituals, and collab flows—no follower grind, just pure invention.",
    persona: "creative-wizard",
  },
  {
    id: "ritual",
    label: "I want to experience a ritual.",
    desc: "Step into curated experiences, zines, or chaos sprints tailored for your neurotype.",
    persona: "chaos-muppet",
  },
  {
    id: "aftercare",
    label: "I need aftercare/resources.",
    desc: "Access safe spaces, recovery tools, and peer support. No judgment, just care.",
    persona: "cozycore",
  },
  {
    id: "satire",
    label: "I'm here for satire, critique, or mischief.",
    desc: "The Satirium branch welcomes your wit and subversion. Anonymity optional.",
    persona: "satirium-agent",
  },
];

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const { setPersona, setIntent } = useStore();

  // Step 0: Welcome
  if (step === 0)
    return (
      <div className="onboard-welcome">
        <h1>Welcome to HelenKella OS</h1>
        <p>
          No follower counts. No popularity contest.<br />
          Just rituals, sovereignty, and your unique intent.
        </p>
        <button onClick={() => setStep(1)}>Begin</button>
      </div>
    );

  // Step 1: Perspective selection
  if (step === 1)
    return (
      <div className="onboard-perspective">
        <h2>What brings you here?</h2>
        <ul>
          {perspectiveOptions.map((opt) => (
            <li key={opt.id} style={{ marginBottom: 16 }}>
              <button
                className={`persona-btn persona-${opt.persona}`}
                style={{
                  display: "block",
                  width: "100%",
                  border: selected === opt.id ? "3px solid #e5025b" : "1px solid #444",
                  background: selected === opt.id ? "#18081b" : "#222",
                  color: "#fff",
                  borderRadius: 18,
                  padding: "1.4em 2.2em",
                  fontWeight: 700,
                  fontSize: "1.2em",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                onClick={() => setSelected(opt.id)}
              >
                <div style={{ fontSize: "1.1em", marginBottom: 3 }}>{opt.label}</div>
                <div style={{ fontSize: "0.95em", color: "#aaa" }}>{opt.desc}</div>
              </button>
            </li>
          ))}
        </ul>
        <button
          disabled={!selected}
          onClick={() => setStep(2)}
          style={{
            marginTop: 24,
            background: "#e5025b",
            color: "#fff",
            borderRadius: 10,
            padding: "0.8em 2em",
            fontWeight: 800,
            fontSize: "1.1em",
            border: "none",
            opacity: selected ? 1 : 0.4,
            cursor: selected ? "pointer" : "not-allowed",
          }}
        >
          Continue
        </button>
      </div>
    );

  // Step 2: Persona intro/ritual micro-initiation
  if (step === 2) {
    const opt = perspectiveOptions.find((o) => o.id === selected);
    // Lock user intent/persona in global state
    setIntent(opt.id);
    setPersona(opt.persona);

    return (
      <div className={`onboard-persona persona-${opt.persona}`}>
        <h2>
          {opt.persona === "creative-wizard" && "You are a Creative Wizard."}
          {opt.persona === "chaos-muppet" && "You are a Chaos Muppet."}
          {opt.persona === "cozycore" && "You are Cozycore."}
          {opt.persona === "satirium-agent" && "You are a Satirium Agent."}
        </h2>
        <p style={{ fontSize: "1.08em", margin: "1em 0" }}>
          {opt.desc}
        </p>
        <div style={{ margin: "2em 0" }}>
          {/* Optionally, run a micro-ritual: animated SVG, confetti, audio, etc */}
          <span style={{ fontSize: 42, display: "inline-block" }}>
            {opt.persona === "creative-wizard" && "🪄"}
            {opt.persona === "chaos-muppet" && "🎭"}
            {opt.persona === "cozycore" && "☕"}
            {opt.persona === "satirium-agent" && "🦹"}
          </span>
        </div>
        <button
          onClick={() => {
            if (onComplete) onComplete(opt);
            else setStep(3);
          }}
          style={{
            background: "#39ff14",
            color: "#141414",
            borderRadius: 10,
            padding: "0.9em 2.1em",
            fontWeight: 800,
            fontSize: "1.15em",
            border: "none",
          }}
        >
          Enter Godmode
        </button>
      </div>
    );
  }

  // Step 3: Final (fallback if no onComplete)
  return (
    <div className="onboard-done">
      <h2>You're in. Ritual complete.</h2>
      <p>
        Welcome to your perspective-driven dashboard. <br />
        No metrics. Only intent, care, and transformation.
      </p>
    </div>
  );
}
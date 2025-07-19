import OnboardingFlow from "../components/OnboardingFlow";

export default function OnboardingPage() {
  // On completion, route to dashboard or main entry
  const handleComplete = () => {
    window.location.href = "/dashboard";
  };
  return (
    <div style={{ minHeight: "100vh", background: "#181818", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <OnboardingFlow onComplete={handleComplete} />
    </div>
  );
}
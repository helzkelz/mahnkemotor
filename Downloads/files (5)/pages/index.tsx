import { useEffect } from "react";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  useEffect(() => {
    // Immediately route to onboarding for first-timers
    router.replace("/onboarding");
  }, []);
  return null;
}
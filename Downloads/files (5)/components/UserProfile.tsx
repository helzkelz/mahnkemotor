export default function UserProfile({ user }) {
  // Do NOT display followers, likes, or counts.
  return (
    <div>
      <h2>Welcome, {user.personaName}</h2>
      <p>Archetype: {user.archetype}</p>
      <p>{user.introText}</p>
      {/* Show private ritual stats if desired */}
      <p>Your Rituals: {user.ritualsCompleted}</p>
    </div>
  );
}
import MissionControl from '../components/MissionControl';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Godmode Operator Dashboard</h1>
      <MissionControl />
    </main>
  );
}
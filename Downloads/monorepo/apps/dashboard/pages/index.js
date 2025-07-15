import MissionControl from '../components/MissionControl';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Godmode Operator Dashboard</h1>
        <nav className="space-x-4">
          <Link href="/sop" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors">
            🚦 Production SOP
          </Link>
          <Link href="/sop-interactive" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-medium transition-colors">
            📝 Interactive SOP
          </Link>
        </nav>
      </div>
      <MissionControl />
    </main>
  );
}

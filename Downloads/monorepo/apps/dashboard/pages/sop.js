import { ProductionGoLiveSOP } from '../../../packages/ui';
import Link from 'next/link';

export default function SOPPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold">Production Go-Live SOP</h1>
            </div>
            <Link href="/sop-interactive" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium transition-colors">
              📝 Interactive Version
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto">
        <ProductionGoLiveSOP />
      </div>
    </main>
  );
}

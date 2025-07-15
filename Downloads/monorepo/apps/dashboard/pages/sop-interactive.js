import { useState } from 'react';
import { ProductionGoLiveSOPEnhanced } from '../../../packages/ui';
import Link from 'next/link';

export default function InteractiveSOPPage() {
  const [progress, setProgress] = useState(0);

  const handleProgress = (newProgress) => {
    setProgress(newProgress);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold">Interactive Production SOP</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Progress:</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto">
        <ProductionGoLiveSOPEnhanced
          interactive={true}
          onProgress={handleProgress}
          initialState={{
            // Start with some items unchecked for demonstration
            'domain-daemon': false,
            'alerts-tested': false,
            'backup-tested': false,
            'payment-flow': false,
            'zero-downtime': false,
          }}
        />
      </div>
    </main>
  );
}

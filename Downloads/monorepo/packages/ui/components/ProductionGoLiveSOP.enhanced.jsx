import React, { useState, useEffect } from 'react';

const SOPItem = ({ 
  children, 
  completed = true, 
  onToggle, 
  id, 
  interactive = false 
}) => (
  <li 
    className={`flex items-start gap-2 ${
      completed ? 'text-green-700' : 'text-gray-700'
    } ${interactive ? 'cursor-pointer hover:bg-gray-50 p-2 rounded' : ''}`}
    onClick={interactive ? onToggle : undefined}
    data-testid={id}
  >
    <span className={`text-lg ${completed ? 'text-green-500' : 'text-gray-400'}`}>
      {completed ? '✅' : '⏳'}
    </span>
    <span>{children}</span>
  </li>
);

const ProductionGoLiveSOPEnhanced = ({
  interactive = false,
  onProgress,
  initialState = {}
}) => {
  const [checkedItems, setCheckedItems] = useState({
    'domain-daemon': true,
    'cloudflare-secrets': true,
    'domain-routing': true,
    'secrets-manager': true,
    'ssl-enforced': true,
    'privacy-policy': true,
    'structured-logging': true,
    'alerts-tested': true,
    'backup-tested': true,
    'payment-flow': true,
    'ritual-visibility': true,
    'auth-protected': true,
    'onboarding-works': true,
    'zero-downtime': true,
    'cache-purge': true,
    'runbooks': true,
    'emergency-sop': true,
    ...initialState
  });

  const totalItems = Object.keys(checkedItems).length;
  const completedItems = Object.values(checkedItems).filter(Boolean).length;
  const progress = Math.round((completedItems / totalItems) * 100);

  useEffect(() => {
    if (onProgress) {
      onProgress(progress);
    }
  }, [progress, onProgress]);

  const toggleItem = (id) => {
    if (interactive) {
      setCheckedItems(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-4xl">🚦</span>
          Godmode OS Production Go-Live SOP
        </h1>
        {interactive && (
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium text-gray-600">
                {completedItems}/{totalItems} ({progress}%)
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Domain & Cloudflare */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            1. Domain & Cloudflare
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="domain-daemon"
              completed={checkedItems['domain-daemon']}
              onToggle={() => toggleItem('domain-daemon')}
              interactive={interactive}
            >
              <strong>domainOpsDaemon@1</strong> implemented and on a scheduler (see{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                /packages/agents/domainOpsDaemon@1.js
              </code>
              ).
            </SOPItem>
            <SOPItem
              id="cloudflare-secrets"
              completed={checkedItems['cloudflare-secrets']}
              onToggle={() => toggleItem('cloudflare-secrets')}
              interactive={interactive}
            >
              All Cloudflare API tokens/zone IDs are encrypted secrets.
            </SOPItem>
            <SOPItem
              id="domain-routing"
              completed={checkedItems['domain-routing']}
              onToggle={() => toggleItem('domain-routing')}
              interactive={interactive}
            >
              Wildcard and custom domains resolve and route (test:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                curl -I https://{'{custom}'}.mysconduct.com
              </code>
              ).
            </SOPItem>
          </ul>
        </section>

        {/* Secrets, Compliance, Security */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            2. Secrets, Compliance, Security
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="secrets-manager"
              completed={checkedItems['secrets-manager']}
              onToggle={() => toggleItem('secrets-manager')}
              interactive={interactive}
            >
              All secrets stored in secrets manager, not in{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env</code> or source.
            </SOPItem>
            <SOPItem
              id="ssl-enforced"
              completed={checkedItems['ssl-enforced']}
              onToggle={() => toggleItem('ssl-enforced')}
              interactive={interactive}
            >
              SSL enforced everywhere (Cloudflare Full Strict, app auto-redirects HTTP→HTTPS, HSTS).
            </SOPItem>
            <SOPItem
              id="privacy-policy"
              completed={checkedItems['privacy-policy']}
              onToggle={() => toggleItem('privacy-policy')}
              interactive={interactive}
            >
              Privacy Policy & ToS linked in all public UIs.
            </SOPItem>
          </ul>
        </section>

        {/* Monitoring & Recovery */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            3. Monitoring & Recovery
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="structured-logging"
              completed={checkedItems['structured-logging']}
              onToggle={() => toggleItem('structured-logging')}
              interactive={interactive}
            >
              Structured logging active and off-host backups scheduled.
            </SOPItem>
            <SOPItem
              id="alerts-tested"
              completed={checkedItems['alerts-tested']}
              onToggle={() => toggleItem('alerts-tested')}
              interactive={interactive}
            >
              Discord/Email/Operator alerts tested.
            </SOPItem>
            <SOPItem
              id="backup-tested"
              completed={checkedItems['backup-tested']}
              onToggle={() => toggleItem('backup-tested')}
              interactive={interactive}
            >
              DB and Redis backup/restore tested.
            </SOPItem>
          </ul>
        </section>

        {/* Real-World Ritual Test */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            4. Real-World Ritual Test
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="payment-flow"
              completed={checkedItems['payment-flow']}
              onToggle={() => toggleItem('payment-flow')}
              interactive={interactive}
            >
              Payment→license→drop→notification flow run in prod with real Stripe/Discord.
            </SOPItem>
            <SOPItem
              id="ritual-visibility"
              completed={checkedItems['ritual-visibility']}
              onToggle={() => toggleItem('ritual-visibility')}
              interactive={interactive}
            >
              Ritual event chain visible in dashboard and ritual ledger.
            </SOPItem>
          </ul>
        </section>

        {/* Operator & User Access */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            5. Operator & User Access
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="auth-protected"
              completed={checkedItems['auth-protected']}
              onToggle={() => toggleItem('auth-protected')}
              interactive={interactive}
            >
              Dashboard/admin behind auth.
            </SOPItem>
            <SOPItem
              id="onboarding-works"
              completed={checkedItems['onboarding-works']}
              onToggle={() => toggleItem('onboarding-works')}
              interactive={interactive}
            >
              Franchise/partner onboarding works (including domain).
            </SOPItem>
          </ul>
        </section>

        {/* Deploy & Cache */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            6. Deploy & Cache
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="zero-downtime"
              completed={checkedItems['zero-downtime']}
              onToggle={() => toggleItem('zero-downtime')}
              interactive={interactive}
            >
              Zero-downtime deploy (rolling/blue-green or host supports live update).
            </SOPItem>
            <SOPItem
              id="cache-purge"
              completed={checkedItems['cache-purge']}
              onToggle={() => toggleItem('cache-purge')}
              interactive={interactive}
            >
              Cloudflare cache purge on deploy.
            </SOPItem>
          </ul>
        </section>

        {/* Docs & SOPs */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            7. Docs & SOPs
          </h2>
          <ul className="space-y-3">
            <SOPItem
              id="runbooks"
              completed={checkedItems['runbooks']}
              onToggle={() => toggleItem('runbooks')}
              interactive={interactive}
            >
              All runbooks and operator docs in{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">/docs/</code>.
            </SOPItem>
            <SOPItem
              id="emergency-sop"
              completed={checkedItems['emergency-sop']}
              onToggle={() => toggleItem('emergency-sop')}
              interactive={interactive}
            >
              Offboarding/emergency SOP in place.
            </SOPItem>
          </ul>
        </section>

        {/* Operator Ritual */}
        <section className={`mt-8 p-4 border-l-4 ${
          progress === 100 ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-500'
        }`}>
          <h3 className={`text-lg font-semibold mb-2 ${
            progress === 100 ? 'text-green-800' : 'text-blue-800'
          }`}>
            {progress === 100 ? '🎉 Ready for Production!' : 'Operator Ritual'}
          </h3>
          <p className={progress === 100 ? 'text-green-700' : 'text-blue-700'}>
            {progress === 100 ? (
              <>
                All checks complete! Drop and run{' '}
                <code className="bg-green-100 px-2 py-1 rounded text-sm">
                  activate-production.mission
                </code>{' '}
                to fully enable all daemons and open system to live traffic.
              </>
            ) : (
              <>
                Complete all checklist items above, then drop and run{' '}
                <code className="bg-blue-100 px-2 py-1 rounded text-sm">
                  activate-production.mission
                </code>{' '}
                to fully enable all daemons and open system to live traffic.
              </>
            )}
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProductionGoLiveSOPEnhanced;

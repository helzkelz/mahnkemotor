import React from 'react';

const SOPItem = ({ children, completed = true }) => (
  <li className={`flex items-start gap-2 ${completed ? 'text-green-700' : 'text-gray-700'}`}>
    <span className={`text-lg ${completed ? 'text-green-500' : 'text-gray-400'}`}>
      {completed ? '✅' : '⏳'}
    </span>
    <span>{children}</span>
  </li>
);

const ProductionGoLiveSOP = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <span className="text-4xl">🚦</span>
          Godmode OS Production Go-Live SOP
        </h1>
      </div>

      <div className="space-y-8">
        {/* Domain & Cloudflare */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
            1. Domain & Cloudflare
          </h2>
          <ul className="space-y-3">
            <SOPItem>
              <strong>domainOpsDaemon@1</strong> implemented and on a scheduler (see{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                /packages/agents/domainOpsDaemon@1.js
              </code>
              ).
            </SOPItem>
            <SOPItem>
              All Cloudflare API tokens/zone IDs are encrypted secrets.
            </SOPItem>
            <SOPItem>
              Wildcard and custom domains resolve and route (test:{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                curl -I https://custom.mysconduct.com
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
            <SOPItem>
              All secrets stored in secrets manager, not in{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">.env</code> or source.
            </SOPItem>
            <SOPItem>
              SSL enforced everywhere (Cloudflare Full Strict, app auto-redirects HTTP→HTTPS, HSTS).
            </SOPItem>
            <SOPItem>
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
            <SOPItem>
              Structured logging active and off-host backups scheduled.
            </SOPItem>
            <SOPItem>
              Discord/Email/Operator alerts tested.
            </SOPItem>
            <SOPItem>
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
            <SOPItem>
              Payment→license→drop→notification flow run in prod with real Stripe/Discord.
            </SOPItem>
            <SOPItem>
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
            <SOPItem>
              Dashboard/admin behind auth.
            </SOPItem>
            <SOPItem>
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
            <SOPItem>
              Zero-downtime deploy (rolling/blue-green or host supports live update).
            </SOPItem>
            <SOPItem>
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
            <SOPItem>
              All runbooks and operator docs in{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">/docs/</code>.
            </SOPItem>
            <SOPItem>
              Offboarding/emergency SOP in place.
            </SOPItem>
          </ul>
        </section>

        {/* Operator Ritual */}
        <section className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Operator Ritual
          </h3>
          <p className="text-blue-700">
            Drop and run{' '}
            <code className="bg-blue-100 px-2 py-1 rounded text-sm">
              activate-production.mission
            </code>{' '}
            to fully enable all daemons and open system to live traffic.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ProductionGoLiveSOP;


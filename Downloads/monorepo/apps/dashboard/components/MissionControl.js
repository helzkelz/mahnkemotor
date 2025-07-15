import useSWR from 'swr';
import clsx from 'clsx';

const fetcher = url => fetch(url).then(res => res.json());

export default function MissionControl() {
  const { data, error } = useSWR('/api/missions', fetcher, { refreshInterval: 4000 });

  if (error) return <div className="text-red-500">Failed to load missions</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">Active Missions</h2>
      <ul className="divide-y divide-gray-700">
        {data.missions.map(m => (
          <li key={m.id} className={clsx("py-3", m.status === "error" && "bg-red-900/30")}>
            <div className="flex justify-between">
              <span className="font-mono">{m.slug}</span>
              <span
                className={clsx(
                  "ml-4 px-2 py-1 rounded text-xs",
                  m.status === "success" && "bg-green-600",
                  m.status === "error" && "bg-red-600",
                  m.status === "pending" && "bg-yellow-600"
                )}
              >
                {m.status}
              </span>
            </div>
            <div className="text-gray-400 text-sm">{m.mission_goal}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
import React, { useState } from 'react';

export default function SummonRitual() {
  const [drop, setDrop] = useState(null);

  const summon = async () => {
    const res = await fetch('/drops/index.json');
    const all = await res.json();
    const random = all[Math.floor(Math.random() * all.length)];
    setDrop(random);
  };

  return (
    <div className="p-8 text-center">
      <button
        onClick={summon}
        className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 text-lg font-bold"
      >
        🔮 Summon a Ritual Drop
      </button>

      {drop && (
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-inner max-w-xl mx-auto border-l-4 border-pink-500 text-left">
          <h2 className="text-xl font-bold">{drop.title}</h2>
          <p className="text-gray-700 mb-2">{drop.summary}</p>
          <a
            href={drop.link}
            className="bg-pink-600 text-white px-4 py-2 rounded-full font-bold inline-block mt-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Drop →
          </a>
        </div>
      )}
    </div>
  );
}
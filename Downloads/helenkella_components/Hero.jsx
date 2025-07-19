import React from 'react';

export default function Hero() {
  return (
    <div className="text-center mt-8">
      <img
        src="/helenkella-banner.png"
        alt="HelenKella.com"
        className="w-full max-w-md mx-auto rounded-lg shadow-xl"
      />
      <h1 className="text-4xl font-extrabold mt-4">HelenKella.com</h1>
      <p className="mt-2 text-lg text-gray-700 max-w-lg mx-auto">
        <strong>Loud. Honest. Weird. Yours.</strong><br />
        Ritual tooling for misfits, side-hustlers, and creators who refuse burnout.
      </p>
    </div>
  );
}
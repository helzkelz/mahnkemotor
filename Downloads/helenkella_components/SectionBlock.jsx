import React from 'react';

export default function SectionBlock({ title, children, color }) {
  return (
    <div className={`border-2 ${color} rounded-2xl p-6 bg-white shadow-inner font-medium`}>
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
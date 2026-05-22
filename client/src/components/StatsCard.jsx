// src/components/StatsCard.jsx
import React from 'react';

export default function StatsCard({ icon, label, value, unit = '', color = 'green' }) {
  const colorClasses = {
    green: 'bg-green-50 text-green-700 border-green-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  };

  return (
    <div className={`p-6 rounded-lg border ${colorClasses[color] || colorClasses.green}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75 mb-1">{label}</p>
          <p className="text-3xl font-bold">
            {value}
            {unit && <span className="text-lg ml-1">{unit}</span>}
          </p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

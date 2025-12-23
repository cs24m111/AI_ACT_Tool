import React from 'react';

function ScoreBadge({ score, size = 'md' }) {
  // Determine color based on score
  const getColor = (score) => {
    if (score >= 80) return 'green';
    if (score >= 60) return 'yellow';
    return 'red';
  };

  const color = getColor(score);

  const sizeClasses = {
    sm: 'w-16 h-16 text-lg',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-32 h-32 text-3xl',
  };

  const colorClasses = {
    green: 'bg-green-100 text-green-700 border-green-300',
    yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    red: 'bg-red-100 text-red-700 border-red-300',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${colorClasses[color]}
        rounded-full border-4 flex items-center justify-center font-bold
        shadow-lg
      `}
    >
      {Math.round(score)}
    </div>
  );
}

export default ScoreBadge;

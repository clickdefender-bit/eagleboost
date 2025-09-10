import React from 'react';

export const NoFiltersBlock: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-200 drop-shadow-lg">
          No Filters.
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300 drop-shadow-lg">
          Just Real Results.
        </span>
      </h2>
      <p className="text-blue-200 text-base sm:text-lg font-semibold text-center">
        What Real Men Are Saying About EAGLEBOOST
      </p>
    </div>
  );
};
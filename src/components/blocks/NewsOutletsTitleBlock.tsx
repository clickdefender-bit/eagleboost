import React from 'react';

export const NewsOutletsTitleBlock: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 drop-shadow-lg">
          As Seen In
        </span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 drop-shadow-lg">
          Major News Outlets
        </span>
      </h2>
      <p className="text-blue-200 text-lg font-semibold mb-4">
        Leading Health Publications Cover EAGLEBOOST
      </p>
      <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm sm:text-base font-semibold">
        <span className="text-xl">👆</span>
        <span className="text-center">Drag to navigate between news articles</span>
      </div>
    </div>
  );
};
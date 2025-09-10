import React from 'react';

export const TransformLifeTitleBlock: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto text-center px-4">
      <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 drop-shadow-lg">
          Ready to Transform Your Life?
        </span>
      </h2>
      <p className="text-blue-200 text-lg font-semibold mb-2">
        Choose your EAGLEBOOST package below
      </p>
      <p className="text-blue-300 text-base font-medium">
        Don't miss this opportunity to transform your health and confidence
      </p>
    </div>
  );
};
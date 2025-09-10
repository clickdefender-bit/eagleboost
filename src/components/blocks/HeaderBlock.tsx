import React from 'react';
import { useContentSection } from '../../hooks/useContent';

export const HeaderBlock: React.FC = () => {
  const doctors = useContentSection('doctors');

  return (
    <div className="w-full max-w-sm mx-auto text-center px-4 mb-8">
      <h2 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
        {doctors.title.split('.').map((part, index) => (
          <React.Fragment key={index}>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r drop-shadow-lg ${
              index === 0 ? 'from-blue-300 to-cyan-200' : 'from-yellow-300 to-orange-300'
            }`}>
              {part.trim()}{index === 0 ? '.' : ''}
            </span>
            {index === 0 && <br />}
          </React.Fragment>
        ))}
      </h2>
      <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-xl p-3 mb-4 border border-yellow-400/30">
        <p className="text-white text-xl font-bold tracking-wide">
          {doctors.subtitle}
        </p>
      </div>
      <div className="flex items-center justify-center gap-3 text-cyan-300 text-base font-semibold">
        <div className="animate-bounce">👇</div>
        <span className="text-center">
          {doctors.dragInstruction}
        </span>
      </div>
    </div>
  );
};
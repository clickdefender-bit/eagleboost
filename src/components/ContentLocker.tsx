import React from 'react';
import { Lock, Clock, Play } from 'lucide-react';
import { useVideoTimer } from '../utils/videoTimer';
import { useContentSection } from '../hooks/useContent';
import { useTracking } from './TrackingProvider';

interface ContentLockerProps {
  children: React.ReactNode;
  className?: string;
}

export const ContentLocker: React.FC<ContentLockerProps> = ({ children, className = '' }) => {
  const { isContentUnlocked, timeRemainingFormatted, timeRemaining } = useVideoTimer();
  const pageTimer = useContentSection('pageTimer');
  const { trackClick } = useTracking();

  const handleLockedContentClick = () => {
    trackClick('locked_content_click', {
      utm_content: 'content_locked',
      utm_term: `time_remaining_${timeRemaining}s`
    });
  };

  // If timer is disabled (both minutes and seconds are 0) or content is unlocked, show children
  const timerDisabled = !pageTimer.enabled || (pageTimer.unlockTimeMinutes === 0 && pageTimer.unlockTimeSeconds === 0);
  if (timerDisabled || isContentUnlocked) {
    return <div className={className}>{children}</div>;
  }

  // Show locked content
  return (
    <div className={`${className} relative`}>
      {/* Locked Overlay */}
      <div className="absolute inset-0 z-50 bg-gradient-to-br from-blue-900/95 via-blue-800/95 to-indigo-900/95 backdrop-blur-sm rounded-3xl flex items-center justify-center">
        <div 
          className="text-center p-8 max-w-sm mx-auto cursor-pointer hover:scale-105 transition-transform duration-300"
          onClick={handleLockedContentClick}
        >
          {/* Lock Icon */}
          <div className="mb-6 relative">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <Clock className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Locked Message */}
          <h3 className="text-white font-bold text-xl mb-4 leading-tight">
            {pageTimer.lockedTitle}
          </h3>
          
          <p className="text-blue-200 text-base mb-6 leading-relaxed">
            {pageTimer.lockedMessage.replace(/\{\{time\}\}/g, `${pageTimer.unlockTimeMinutes}:${pageTimer.unlockTimeSeconds.toString().padStart(2, '0')}`)}
          </p>

          {/* Timer Display */}
          <div className="bg-black/30 rounded-2xl p-4 mb-6 border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Time Remaining</span>
            </div>
            <div className="text-3xl font-black text-yellow-400 tracking-wider">
              {timeRemainingFormatted}
            </div>
          </div>

          {/* Watch Video Instruction */}
          <div className="flex items-center justify-center gap-2 text-cyan-300 text-sm font-semibold">
            <Play className="w-4 h-4" />
            <span>{pageTimer.lockedSubtitle}</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-1000 ease-out"
              style={{ 
                width: `${Math.max(0, 100 - (timeRemaining / (pageTimer.unlockTimeMinutes * 60 + pageTimer.unlockTimeSeconds)) * 100)}%` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Blurred Content Behind */}
      <div className="filter blur-sm opacity-30 pointer-events-none">
        {children}
      </div>
    </div>
  );
};
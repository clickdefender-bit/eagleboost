import React from 'react';
import { Play } from 'lucide-react';
import { useTracking } from './TrackingProvider';
import { useContentSection } from '../hooks/useContent';

interface TopBannerProps {
  className?: string;
}

export const TopBanner: React.FC<TopBannerProps> = ({ className = '' }) => {
  const { trackClick } = useTracking();
  const topBanner = useContentSection('topBanner');
  
  console.log('🎯 TopBanner render with title:', topBanner.title);

  const handleWatchBelowClick = () => {
    trackClick('watch_below_button', {
      utm_content: 'watch_below_cta',
      utm_term: 'baking_soda_cures_impotence',
      utm_campaign: 'video_cta'
    });
  };

  return (
    <div className={`w-full max-w-sm mx-auto text-center ${className}`}>
      <h1 className="text-4xl font-black mb-6 leading-tight text-blue-300">
        {topBanner.title}
      </h1>
      
      <p className="text-blue-200 text-lg font-medium mb-4">
        {topBanner.subtitle}
      </p>
      
      <button
        onClick={handleWatchBelowClick}
        className="text-blue-300 font-bold text-sm hover:text-blue-100 transition-colors duration-300 flex items-center justify-center gap-2 mx-auto"
      >
        <Play className="w-4 h-4" fill="currentColor" />
        <span className="uppercase tracking-wide">
          {topBanner.buttonText}
        </span>
      </button>
    </div>
  );
};
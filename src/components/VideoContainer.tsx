import React from 'react';
import { Volume2, AlertTriangle, Clock, Lock } from 'lucide-react';
import { useTracking } from './TrackingProvider';
import { useContentSection } from '../hooks/useContent';

interface VideoContainerProps {
  className?: string;
}

export const VideoContainer: React.FC<VideoContainerProps> = ({ className = '' }) => {
  const { trackClick, trackVideoInteraction } = useTracking();
  const video = useContentSection('video');

  const handleVideoClick = () => {
    trackClick('video_container', {
      utm_content: 'video_placeholder',
      utm_term: 'main_video_click'
    });
    
    trackVideoInteraction('click', {
      utm_content: 'video_placeholder'
    });
  };

  return (
    <div className={`relative ${className}`}>
      {/* Container principal do vídeo - proporção 9:16 */}
      <div 
        className="relative w-full max-w-sm mx-auto rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-blue-500/20 hover:scale-105"
        style={{ aspectRatio: '9/16' }}
        onClick={handleVideoClick}
      >
        {/* VTURB Embed ou Placeholder */}
        {video.embedCode ? (
          <div 
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: video.embedCode }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <div className="text-6xl mb-4">🎥</div>
              <h3 className="text-xl font-bold mb-2">Vídeo VTURB</h3>
              <p className="text-sm opacity-80">Configure o embed no admin</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Blocos informativos */}
      <div className="mt-4 space-y-3 max-w-sm mx-auto">
        {/* Bloco de som */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <Volume2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-blue-800 font-semibold text-sm mb-1">
              {video.soundWarning}
            </h3>
            <p className="text-blue-600 text-sm">
              This video contains important audio information
            </p>
          </div>
        </div>
        
        {/* Bloco de urgência */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-red-800 font-semibold text-sm mb-1">
              {video.urgencyWarning}
            </h3>
            <p className="text-red-600 text-sm">
              Watch now before it's removed from the internet
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};
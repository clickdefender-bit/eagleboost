import React, { useState } from 'react';
import { Play, X } from 'lucide-react';
import { VTURBPlayer } from './VTURBPlayer';

interface VTURBVideoEmbedProps {
  embedCode: string;
  aspectRatio: '16:9' | '9:16';
  thumbnailUrl?: string;
  title?: string;
  className?: string;
  autoPlay?: boolean;
}

export const VTURBVideoEmbed: React.FC<VTURBVideoEmbedProps> = ({
  embedCode,
  aspectRatio,
  thumbnailUrl,
  title = 'Vídeo',
  className = '',
  autoPlay = false
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!embedCode) {
    return (
      <div className={`bg-slate-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center text-slate-500 p-4">
          <div className="text-2xl mb-2">🎥</div>
          <p className="text-sm">Vídeo VTURB não configurado</p>
        </div>
      </div>
    );
  }

  const handlePlayClick = () => {
    setIsPlaying(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsPlaying(false);
  };

  if (autoPlay) {
    return (
      <div className={className}>
        <VTURBPlayer 
          embedCode={embedCode}
          aspectRatio={aspectRatio}
          className="w-full h-full rounded-lg"
        />
      </div>
    );
  }

  if (isPlaying && isModalOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
        <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-20 bg-black bg-opacity-70 rounded-full p-3"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full h-full flex items-center justify-center">
            <VTURBPlayer 
              embedCode={embedCode}
              aspectRatio={aspectRatio}
              className="w-full h-full"
              style={{
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative cursor-pointer group ${className}`} onClick={handlePlayClick}>
      {/* Thumbnail ou placeholder */}
      {thumbnailUrl ? (
        <img 
          src={thumbnailUrl} 
          alt={title}
          className="w-full h-full object-cover rounded-lg"
          style={{ aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9' }}
        />
      ) : (
        <div 
          className="w-full bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center"
          style={{ aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9' }}
        >
          <div className="text-center text-white">
            <div className="text-4xl mb-2">🎥</div>
            <p className="text-sm font-medium">{title}</p>
          </div>
        </div>
      )}
      
      {/* Overlay com botão play */}
      <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300">
        <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:bg-opacity-100 group-hover:scale-110 transition-all duration-300">
          <Play className="w-8 h-8 text-blue-600 ml-1" fill="currentColor" />
        </div>
      </div>
      
      {/* Badge VTURB */}
      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
        VTURB
      </div>
    </div>
  );
};

export default VTURBVideoEmbed;
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

  // Sempre renderiza o VTURBPlayer quando há embedCode
  return (
    <div className={className}>
      <VTURBPlayer 
        embedCode={embedCode}
        aspectRatio={aspectRatio}
        className="w-full h-full rounded-lg"
        onLoad={() => console.log('VTURB Player carregado')}
        onError={(error) => console.error('Erro no VTURB Player:', error)}
      />
    </div>
  );
};

export default VTURBVideoEmbed;
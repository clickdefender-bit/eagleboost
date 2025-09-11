import React, { useEffect, useRef, useState } from 'react';

interface VTURBPlayerProps {
  embedCode: string;
  aspectRatio: '16:9' | '9:16';
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

export const VTURBPlayer: React.FC<VTURBPlayerProps> = ({ 
  embedCode, 
  aspectRatio,
  className = '', 
  style = {},
  onLoad,
  onError 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!embedCode || !containerRef.current) return;

    const container = containerRef.current;
    
    try {
      // Limpa o container
      container.innerHTML = '';
      
      // Insere o embed code diretamente
      container.innerHTML = embedCode;
      
      // Processa scripts do container
      const scripts = container.querySelectorAll('script');
      let scriptIndex = 0;
      
      const loadNextScript = () => {
        if (scriptIndex >= scripts.length) {
          onLoad?.();
          return;
        }
        
        const script = scripts[scriptIndex];
        const scriptSrc = script.src;
        const scriptContent = script.textContent || script.innerHTML;
        
        scriptIndex++;
        
        if (scriptSrc) {
          // Script externo
          if (!scriptLoadedRef.current.has(scriptSrc)) {
            const newScript = document.createElement('script');
            newScript.src = scriptSrc;
            newScript.async = false; // Carregamento sequencial
            
            newScript.onload = () => {
              scriptLoadedRef.current.add(scriptSrc);
              // Aguarda um pouco antes de carregar o próximo
              setTimeout(loadNextScript, 100);
            };
            
            newScript.onerror = () => {
              const error = new Error(`Falha ao carregar script VTURB: ${scriptSrc}`);
              onError?.(error);
              loadNextScript(); // Continua mesmo com erro
            };
            
            document.head.appendChild(newScript);
          } else {
            loadNextScript();
          }
        } else if (scriptContent) {
          // Script inline - executa diretamente
          try {
            const newScript = document.createElement('script');
            newScript.textContent = scriptContent;
            document.body.appendChild(newScript);
            document.body.removeChild(newScript);
          } catch (e) {
            console.error('Erro ao executar script inline:', e);
          }
          setTimeout(loadNextScript, 50);
        } else {
          loadNextScript();
        }
      };
      
      // Inicia o carregamento dos scripts
      loadNextScript();
      
    } catch (error) {
      console.error('Erro ao processar embed VTURB:', error);
      onError?.(error as Error);
    }
  }, [embedCode, onLoad, onError]);

  if (!embedCode) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}
        style={style}
      >
        <div className="text-center text-white p-6">
          <div className="text-6xl mb-4">🎥</div>
          <h3 className="text-xl font-bold mb-2">Vídeo VTURB</h3>
          <p className="text-sm opacity-80">Configure o embed no admin</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <div 
        ref={containerRef}
        className="w-full h-full" 
        style={{ 
          aspectRatio: aspectRatio === '9:16' ? '9/16' : '16/9',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default VTURBPlayer;
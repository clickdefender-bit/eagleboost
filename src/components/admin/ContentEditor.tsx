import React, { useState, useEffect } from 'react';
import { Save, Download, Upload, RotateCcw, Edit3, Plus, Trash2 } from 'lucide-react';
import { contentManager, SiteContent } from '../../utils/contentManager';

export const ContentEditor: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(contentManager.getContent());
  const [activeSection, setActiveSection] = useState<string>('topBanner');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    const handleContentUpdate = (event: CustomEvent) => {
      setContent(event.detail);
      setHasChanges(false);
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    return () => window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
  }, []);

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    setContent(newContent);
    setHasChanges(true);
  };

  const handleArrayChange = (path: string, index: number, field: string, value: any) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        current[keys[i]][index][field] = value;
      } else {
        current = current[keys[i]];
      }
    }
    
    setContent(newContent);
    setHasChanges(true);
  };

  const addArrayItem = (path: string, template: any) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        const newId = Math.max(...current[keys[i]].map((item: any) => item.id || 0)) + 1;
        current[keys[i]].push({ ...template, id: newId });
      } else {
        current = current[keys[i]];
      }
    }
    
    setContent(newContent);
    setHasChanges(true);
  };

  const removeArrayItem = (path: string, index: number) => {
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1) {
        current[keys[i]].splice(index, 1);
      } else {
        current = current[keys[i]];
      }
    }
    
    setContent(newContent);
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    try {
      console.log('💾 Admin: Saving content with title:', content.topBanner.title);
      contentManager.updateContent(content);
      
      setSaveStatus('saved');
      setHasChanges(false);
      setTimeout(() => setSaveStatus('idle'), 2000);
      
      console.log('✅ Admin: Content saved successfully');
    } catch (error) {
      console.error('❌ Admin: Error saving content:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }
  };

  const handleExport = () => {
    const dataStr = contentManager.exportContent();
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `site_content_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (contentManager.importContent(content)) {
          setContent(contentManager.getContent());
          setHasChanges(false);
          alert('Conteúdo importado com sucesso!');
        } else {
          alert('Erro ao importar conteúdo. Verifique o formato do arquivo.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetar = () => {
    if (confirm('Tem certeza que deseja resetar todo o conteúdo para o padrão?')) {
      contentManager.resetToDefault();
      setContent(contentManager.getContent());
      setHasChanges(false);
    }
  };

  const sections = [
    { id: 'topBanner', name: 'Top Banner', icon: '🎯' },
    { id: 'video', name: 'Vídeo', icon: '🎥' },
    { id: 'contentBlocker', name: 'Bloqueio de Conteúdo', icon: '🔒' },
    { id: 'mainOffer', name: 'Oferta Principal', icon: '💊' },
    { id: 'alternativeOffers', name: 'Ofertas Alternativas', icon: '📦' },
    { id: 'doctors', name: 'Médicos', icon: '👨‍⚕️' },
    { id: 'testimonials', name: 'Depoimentos', icon: '💬' },
    { id: 'news', name: 'Notícias', icon: '📰' },
    { id: 'guarantee', name: 'Garantia', icon: '🛡️' },
    { id: 'faq', name: 'FAQ', icon: '❓' },
    { id: 'footer', name: 'Rodapé', icon: '📄' }
  ];

  const renderInput = (label: string, path: string, type: 'text' | 'textarea' | 'url' = 'text') => {
    const keys = path.split('.');
    let value: any = content;
    for (const key of keys) {
      value = value[key];
    }

    // Handle number inputs for timer fields
    const isNumberField = path.includes('unlockTime');
    const inputType = isNumberField ? 'number' : type;
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value || ''}
            onChange={(e) => handleInputChange(path, isNumberField ? parseInt(e.target.value) || 0 : e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-vertical min-h-[80px]"
            rows={3}
          />
        ) : (
          <input
            type={inputType}
            value={value || ''}
            onChange={(e) => handleInputChange(path, isNumberField ? parseInt(e.target.value) || 0 : e.target.value)}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
            placeholder={isNumberField ? "0" : ""}
          />
        )}
      </div>
    );
  };

  const renderArrayEditor = (title: string, path: string, items: any[], template: any, fields: Array<{key: string, label: string, type?: string}>) => {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          <button
            onClick={() => addArrayItem(path, template)}
            className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
        
        {items.map((item, index) => (
          <div key={item.id || index} className="bg-slate-700 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white font-medium">Item {index + 1}</span>
              <button
                onClick={() => removeArrayItem(path, index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            {fields.map(field => (
              <div key={field.key} className="mb-3">
                <label className="block text-sm font-medium text-slate-300 mb-1">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={item[field.key] || ''}
                    onChange={(e) => handleArrayChange(path, index, field.key, e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-vertical min-h-[60px]"
                    rows={2}
                  />
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={item[field.key] || ''}
                    onChange={(e) => handleArrayChange(path, index, field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'topBanner':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Top Banner</h3>
            {renderInput('Título', 'topBanner.title')}
            {renderInput('Subtítulo', 'topBanner.subtitle', 'textarea')}
            {renderInput('Texto do Botão', 'topBanner.buttonText')}
          </div>
        );

      case 'video':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Configurações do Vídeo</h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Código Embed da VTURB
              </label>
              <textarea
                value={content.video.embedCode || ''}
                onChange={(e) => handleInputChange('video.embedCode', e.target.value)}
                placeholder='Cole aqui o código embed da VTURB, exemplo:
<vturb-smartplayer id="vid-68c1baf2d111494b6113b2dc" style="display: block; margin: 0 auto; width: 100%;"></vturb-smartplayer>
<script type="text/javascript">
var s=document.createElement("script");
s.src="https://scripts.converteai.net/d37be28a-dfe1-4a86-98a2-9c82944967ec/players/68c1baf2d111494b6113b2dc/v4/player.js";
s.async=!0,document.head.appendChild(s);
</script>'
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-vertical min-h-[120px] font-mono text-sm"
                rows={6}
              />
              <p className="text-slate-400 text-xs mt-2">
                💡 Dica: Copie o código embed completo da VTURB e cole aqui. O vídeo aparecerá automaticamente na página principal.
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Proporção do Vídeo
              </label>
              <select
                value={content.video.aspectRatio}
                onChange={(e) => handleInputChange('video.aspectRatio', e.target.value as '16:9' | '9:16')}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="9:16">9:16 (Vertical - Mobile)</option>
                <option value="16:9">16:9 (Horizontal - Desktop)</option>
              </select>
              <p className="text-slate-400 text-xs mt-2">
                💡 Escolha a proporção que melhor se adapta ao seu vídeo. 9:16 é ideal para vídeos verticais (mobile), 16:9 para vídeos horizontais (desktop).
              </p>
            </div>
            
            {renderInput('Aviso de Som', 'video.soundWarning')}
            {renderInput('Aviso de Urgência', 'video.urgencyWarning', 'textarea')}
          </div>
        );

      case 'contentBlocker':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Bloqueio de Conteúdo</h3>
            <p className="text-slate-400 mb-6">
              Configure o sistema de bloqueio que esconde o conteúdo por um tempo determinado após o vídeo.
            </p>
            
            <div className="mb-4">
              <label className="flex items-center gap-3 text-white">
                <input
                  type="checkbox"
                  checked={content.contentBlocker.enabled}
                  onChange={(e) => handleInputChange('contentBlocker.enabled', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium">Ativar bloqueio de conteúdo</span>
              </label>
            </div>
            
            {content.contentBlocker.enabled && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Timer
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Minutos</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="1"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="0"
                        value={Math.floor(content.contentBlocker.unlockTimeMinutes)}
                        onChange={(e) => {
                          const minutes = parseInt(e.target.value) || 0;
                          const seconds = Math.floor((content.contentBlocker.unlockTimeMinutes % 1) * 60);
                          handleInputChange('contentBlocker.unlockTimeMinutes', minutes + (seconds / 60));
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Segundos</label>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="1"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                        placeholder="0"
                        value={Math.floor((content.contentBlocker.unlockTimeMinutes % 1) * 60)}
                        onChange={(e) => {
                          const seconds = parseInt(e.target.value) || 0;
                          const minutes = Math.floor(content.contentBlocker.unlockTimeMinutes);
                          handleInputChange('contentBlocker.unlockTimeMinutes', minutes + (seconds / 60));
                        }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-700 rounded-lg p-4 mt-4">
                  <h4 className="text-white font-medium mb-2">ℹ️ Como funciona:</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Defina quantos minutos o conteúdo ficará oculto</li>
                    <li>• Após o tempo, o conteúdo aparece automaticamente</li>
                    <li>• Usuário vê apenas o vídeo, sem saber do bloqueio</li>
                    <li>• Sistema completamente invisível</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        );

      case 'mainOffer':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Oferta Principal</h3>
            {renderInput('Nome do Produto', 'mainOffer.productName')}
            {renderInput('Nome do Pacote', 'mainOffer.packageName')}
            {renderInput('Imagem do Produto', 'mainOffer.productImage', 'url')}
            {renderInput('Economia', 'mainOffer.savings')}
            {renderInput('Texto do Botão', 'mainOffer.buttonText')}
            {renderInput('URL do Botão', 'mainOffer.buttonUrl', 'url')}
            {renderInput('Preço por Frasco', 'mainOffer.pricePerBottle')}
            {renderInput('Preço Total', 'mainOffer.totalPrice')}
            
            <h4 className="text-lg font-semibold text-white mb-4 mt-6">Badges</h4>
            {renderInput('Garantia', 'mainOffer.badges.guarantee')}
            {renderInput('Frete', 'mainOffer.badges.shipping')}
            {renderInput('Segurança', 'mainOffer.badges.security')}
          </div>
        );

      case 'alternativeOffers':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Ofertas Alternativas</h3>
            
            <h4 className="text-lg font-semibold text-white mb-4">Oferta 1</h4>
            {renderInput('Imagem do Produto', 'alternativeOffers.offer1.productImage', 'url')}
            {renderInput('Nome do Pacote', 'alternativeOffers.offer1.packageName')}
            {renderInput('Economia', 'alternativeOffers.offer1.savings')}
            {renderInput('Preço por Frasco', 'alternativeOffers.offer1.pricePerBottle')}
            {renderInput('Preço Total', 'alternativeOffers.offer1.totalPrice')}
            {renderInput('Frete', 'alternativeOffers.offer1.shipping')}
            {renderInput('URL do Botão', 'alternativeOffers.offer1.buttonUrl', 'url')}
            
            <h4 className="text-lg font-semibold text-white mb-4 mt-6">Oferta 2</h4>
            {renderInput('Imagem do Produto', 'alternativeOffers.offer2.productImage', 'url')}
            {renderInput('Nome do Pacote', 'alternativeOffers.offer2.packageName')}
            {renderInput('Economia', 'alternativeOffers.offer2.savings')}
            {renderInput('Preço por Frasco', 'alternativeOffers.offer2.pricePerBottle')}
            {renderInput('Preço Total', 'alternativeOffers.offer2.totalPrice')}
            {renderInput('Frete', 'alternativeOffers.offer2.shipping')}
            {renderInput('URL do Botão', 'alternativeOffers.offer2.buttonUrl', 'url')}
          </div>
        );

      case 'doctors':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Seção de Médicos</h3>
            {renderInput('Título', 'doctors.title')}
            {renderInput('Subtítulo', 'doctors.subtitle')}
            {renderInput('Instrução de Navegação', 'doctors.dragInstruction')}
            
            {renderArrayEditor(
              'Médicos',
              'doctors.doctors',
              content.doctors.doctors,
              {
                name: '',
                title: '',
                institution: '',
                photo: '',
                recommendation: '',
                videoEmbed: ''
              },
              [
                { key: 'name', label: 'Nome' },
                { key: 'title', label: 'Título' },
                { key: 'institution', label: 'Instituição' },
                { key: 'photo', label: 'Foto (URL)', type: 'url' },
                { key: 'recommendation', label: 'Recomendação', type: 'textarea' },
                { key: 'videoEmbed', label: 'Embed do Vídeo VTURB', type: 'textarea' }
              ]
            )}
          </div>
        );

      case 'testimonials':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Depoimentos</h3>
            {renderInput('Título', 'testimonials.title')}
            {renderInput('Subtítulo', 'testimonials.subtitle')}
            
            {renderArrayEditor(
              'Clientes',
              'testimonials.customers',
              content.testimonials.customers,
              {
                name: '',
                location: '',
                photo: '',
                testimonial: '',
                rating: 5,
                videoEmbed: ''
              },
              [
                { key: 'name', label: 'Nome' },
                { key: 'location', label: 'Localização' },
                { key: 'photo', label: 'Foto (URL)', type: 'url' },
                { key: 'testimonial', label: 'Depoimento', type: 'textarea' },
                { key: 'rating', label: 'Avaliação (1-5)', type: 'number' },
                { key: 'videoEmbed', label: 'Embed do Vídeo VTURB', type: 'textarea' }
              ]
            )}
          </div>
        );

      case 'news':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Notícias</h3>
            {renderInput('Título', 'news.title')}
            {renderInput('Subtítulo', 'news.subtitle')}
            {renderInput('Instrução de Navegação', 'news.dragInstruction')}
            
            {renderArrayEditor(
              'Artigos',
              'news.articles',
              content.news.articles,
              {
                outlet: '',
                logo: '',
                redirectUrl: '',
                title: '',
                description: '',
                videoEmbed: ''
              },
              [
                { key: 'outlet', label: 'Veículo' },
                { key: 'logo', label: 'Logo (URL)', type: 'url' },
                { key: 'redirectUrl', label: 'URL de Redirecionamento', type: 'url' },
                { key: 'title', label: 'Título', type: 'textarea' },
                { key: 'description', label: 'Descrição', type: 'textarea' },
                { key: 'videoEmbed', label: 'Embed do Vídeo VTURB', type: 'textarea' }
              ]
            )}
          </div>
        );

      case 'guarantee':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Garantia</h3>
            {renderInput('Dias de Garantia', 'guarantee.days')}
            {renderInput('Título', 'guarantee.title')}
            {renderInput('Subtítulo', 'guarantee.subtitle')}
            {renderInput('Nome da Marca', 'guarantee.brandName')}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Descrições</label>
              {content.guarantee.description.map((desc, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <textarea
                    value={desc}
                    onChange={(e) => {
                      const newDescriptions = [...content.guarantee.description];
                      newDescriptions[index] = e.target.value;
                      handleInputChange('guarantee.description', newDescriptions);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-vertical min-h-[60px]"
                    rows={2}
                  />
                  <button
                    onClick={() => {
                      const newDescriptions = content.guarantee.description.filter((_, i) => i !== index);
                      handleInputChange('guarantee.description', newDescriptions);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newDescriptions = [...content.guarantee.description, ''];
                  handleInputChange('guarantee.description', newDescriptions);
                }}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                Adicionar Parágrafo
              </button>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">FAQ</h3>
            {renderInput('Título', 'faq.title')}
            
            {renderArrayEditor(
              'Perguntas',
              'faq.items',
              content.faq.items,
              {
                question: '',
                answer: '',
                hasBadge: false,
                badgeText: ''
              },
              [
                { key: 'question', label: 'Pergunta', type: 'textarea' },
                { key: 'answer', label: 'Resposta', type: 'textarea' },
                { key: 'badgeText', label: 'Texto do Badge (opcional)' }
              ]
            )}
          </div>
        );

      case 'customCTAs':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Botões CTA Personalizados</h3>
            
            {/* Doctor Trust CTA */}
            <div className="bg-slate-700 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">CTA - Confiança dos Médicos</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={content.customCTAs.doctorTrustCTA.enabled}
                    onChange={(e) => handleInputChange('customCTAs.doctorTrustCTA.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Texto do Botão</label>
                  <textarea
                    value={content.customCTAs.doctorTrustCTA.text}
                    onChange={(e) => handleInputChange('customCTAs.doctorTrustCTA.text', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-vertical min-h-[60px]"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Ícone (Emoji)</label>
                  <input
                    type="text"
                    value={content.customCTAs.doctorTrustCTA.icon}
                    onChange={(e) => handleInputChange('customCTAs.doctorTrustCTA.icon', e.target.value)}
                    placeholder="👨‍⚕️"
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cor de Fundo (Gradient)</label>
                  <select
                    value={content.customCTAs.doctorTrustCTA.backgroundColor}
                    onChange={(e) => handleInputChange('customCTAs.doctorTrustCTA.backgroundColor', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="from-blue-500 to-blue-600">Azul</option>
                    <option value="from-green-400 to-green-500">Verde</option>
                    <option value="from-red-500 to-red-600">Vermelho</option>
                    <option value="from-purple-500 to-purple-600">Roxo</option>
                    <option value="from-orange-400 to-orange-500">Laranja</option>
                    <option value="from-yellow-400 to-yellow-500">Amarelo</option>
                    <option value="from-pink-500 to-pink-600">Rosa</option>
                    <option value="from-indigo-500 to-indigo-600">Índigo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cor do Texto</label>
                  <select
                    value={content.customCTAs.doctorTrustCTA.textColor}
                    onChange={(e) => handleInputChange('customCTAs.doctorTrustCTA.textColor', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="text-white">Branco</option>
                    <option value="text-black">Preto</option>
                    <option value="text-gray-800">Cinza Escuro</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">URL de Redirecionamento</label>
                <input
                  type="url"
                  value={content.customCTAs.doctorTrustCTA.url}
                  onChange={(e) => handleInputChange('customCTAs.doctorTrustCTA.url', e.target.value)}
                  placeholder="https://checkout.eagleboost.com/doctor-trust"
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                />
                <p className="text-xs text-slate-400 mt-1">Deixe vazio para usar a URL da oferta principal</p>
              </div>
            </div>
            
            {/* Success Story CTA */}
            <div className="bg-slate-700 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">CTA - História de Sucesso</h4>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={content.customCTAs.successStoryCTA.enabled}
                    onChange={(e) => handleInputChange('customCTAs.successStoryCTA.enabled', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Texto do Botão</label>
                  <textarea
                    value={content.customCTAs.successStoryCTA.text}
                    onChange={(e) => handleInputChange('customCTAs.successStoryCTA.text', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-vertical min-h-[60px]"
                    rows={2}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Ícone (Emoji)</label>
                  <input
                    type="text"
                    value={content.customCTAs.successStoryCTA.icon}
                    onChange={(e) => handleInputChange('customCTAs.successStoryCTA.icon', e.target.value)}
                    placeholder="🚀"
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cor de Fundo (Gradient)</label>
                  <select
                    value={content.customCTAs.successStoryCTA.backgroundColor}
                    onChange={(e) => handleInputChange('customCTAs.successStoryCTA.backgroundColor', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="from-blue-500 to-blue-600">Azul</option>
                    <option value="from-green-400 to-green-500">Verde</option>
                    <option value="from-red-500 to-red-600">Vermelho</option>
                    <option value="from-purple-500 to-purple-600">Roxo</option>
                    <option value="from-orange-400 to-orange-500">Laranja</option>
                    <option value="from-yellow-400 to-yellow-500">Amarelo</option>
                    <option value="from-pink-500 to-pink-600">Rosa</option>
                    <option value="from-indigo-500 to-indigo-600">Índigo</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Cor do Texto</label>
                  <select
                    value={content.customCTAs.successStoryCTA.textColor}
                    onChange={(e) => handleInputChange('customCTAs.successStoryCTA.textColor', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  >
                    <option value="text-white">Branco</option>
                    <option value="text-black">Preto</option>
                    <option value="text-gray-800">Cinza Escuro</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-300 mb-2">URL de Redirecionamento</label>
                <input
                  type="url"
                  value={content.customCTAs.successStoryCTA.url}
                  onChange={(e) => handleInputChange('customCTAs.successStoryCTA.url', e.target.value)}
                  placeholder="https://checkout.eagleboost.com/success-story"
                  className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                />
                <p className="text-xs text-slate-400 mt-1">Deixe vazio para usar a URL da oferta principal</p>
              </div>
            </div>
            
            {/* Preview Section */}
            <div className="bg-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Visualização dos Botões</h4>
              <div className="space-y-4">
                {content.customCTAs.doctorTrustCTA.enabled && (
                  <div className="max-w-sm mx-auto">
                    <button className={`w-full bg-gradient-to-r ${content.customCTAs.doctorTrustCTA.backgroundColor} ${content.customCTAs.doctorTrustCTA.textColor} font-bold text-lg py-5 px-6 rounded-2xl shadow-xl transition-all duration-300`}>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{content.customCTAs.doctorTrustCTA.icon}</span>
                        <span className="text-center leading-tight text-sm">
                          {content.customCTAs.doctorTrustCTA.text}
                        </span>
                      </div>
                    </button>
                  </div>
                )}
                
                {content.customCTAs.successStoryCTA.enabled && (
                  <div className="max-w-sm mx-auto">
                    <button className={`w-full bg-gradient-to-r ${content.customCTAs.successStoryCTA.backgroundColor} ${content.customCTAs.successStoryCTA.textColor} font-bold text-lg py-5 px-6 rounded-2xl shadow-xl transition-all duration-300`}>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">{content.customCTAs.successStoryCTA.icon}</span>
                        <span className="text-center leading-tight text-sm">
                          {content.customCTAs.successStoryCTA.text}
                        </span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Rodapé</h3>
            {renderInput('Nome da Marca', 'footer.brandName')}
            {renderInput('Copyright', 'footer.copyright')}
            {renderInput('Disclaimer', 'footer.disclaimer', 'textarea')}
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Links</label>
              {content.footer.links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => {
                      const newLinks = [...content.footer.links];
                      newLinks[index] = e.target.value;
                      handleInputChange('footer.links', newLinks);
                    }}
                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  />
                  <button
                    onClick={() => {
                      const newLinks = content.footer.links.filter((_, i) => i !== index);
                      handleInputChange('footer.links', newLinks);
                    }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newLinks = [...content.footer.links, ''];
                  handleInputChange('footer.links', newLinks);
                }}
                className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                Adicionar Link
              </button>
            </div>
          </div>
        );

      default:
        return <div className="text-white">Selecione uma seção para editar</div>;
    }
  };

  return (
    <div className="space-y-6 text-white bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Editor de Conteúdo</h1>
          <p className="text-slate-400">Edite todo o conteúdo do site principal</p>
        </div>
        
        <div className="flex items-center gap-4">
          {hasChanges && (
            <span className="text-yellow-400 text-sm">● Alterações não salvas</span>
          )}
          
          <button
            onClick={handleSave}
            disabled={!hasChanges || saveStatus === 'saving'}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              hasChanges 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            {saveStatus === 'saving' ? 'Salvando...' : 
             saveStatus === 'saved' ? 'Salvo!' : 
             saveStatus === 'error' ? 'Erro!' : 'Salvar'}
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          
          <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer">
            <Upload className="w-4 h-4" />
            Importar
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          
          <button
            onClick={handleResetar}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <RotateCcw className="w-4 h-4" />
            Resetar
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 rounded-xl p-4 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Seções</h3>
          <div className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <span className="text-lg">{section.icon}</span>
                <span className="text-sm">{section.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="flex-1 bg-slate-800 rounded-xl p-6 border border-slate-700">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};
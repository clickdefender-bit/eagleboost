import React, { useState, useRef, useEffect } from 'react';
import { Save, Key, Globe, Bell, Shield, FileText, Image, Upload, CheckCircle, AlertCircle, RotateCw } from 'lucide-react';
import { MetadataService, PageMetadata } from '../../services/metadataService';
import { useAdminConfig, adminConfigManager } from '../../utils/adminConfigManager';
import { adminSyncService } from '../../utils/adminSyncService';

export const Settings: React.FC = () => {
  const { config, updateConfig, resetConfig, exportConfig, importConfig, getStats } = useAdminConfig();
  const [isUploading, setIsUploading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [syncStatus, setSyncStatus] = useState(adminSyncService.getStatus());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Atualiza status de sincronização periodicamente
    const interval = setInterval(() => {
      setSyncStatus(adminSyncService.getStatus());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      // Salva metadata usando o serviço existente
      const metadata: PageMetadata = {
        pageTitle: config.pageTitle,
        pageDescription: config.pageDescription,
        faviconUrl: config.faviconUrl
      };
      
      MetadataService.saveMetadata(metadata);
      
      // As configurações já são salvas automaticamente pelo adminConfigManager
      // Força uma sincronização para garantir que tudo está atualizado
      adminSyncService.forcSync();
      
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
      
      console.log('✅ Configurações salvas e sincronizadas com sucesso');
    } catch (error) {
      console.error('❌ Erro ao salvar configurações:', error);
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleFaviconUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const faviconUrl = await MetadataService.uploadFavicon(file);
      updateConfig({ faviconUrl });
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Erro ao fazer upload do favicon');
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleConfigImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const success = importConfig(content);
        
        if (success) {
          alert('Configurações importadas com sucesso!');
        } else {
          alert('Erro ao importar configurações. Verifique o formato do arquivo.');
        }
      } catch (error) {
        alert('Erro ao ler o arquivo de configurações.');
      }
    };
    reader.readAsText(file);
  };
  
  const handleConfigExport = () => {
    const configJson = exportConfig();
    const blob = new Blob([configJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `eagleboost-config-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
  };
  
  const handleResetConfig = () => {
    if (confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão? Esta ação não pode ser desfeita.')) {
      resetConfig();
      alert('Configurações resetadas com sucesso!');
    }
  };
  
  const handleForceSync = () => {
    adminSyncService.forcSync();
    setSyncStatus(adminSyncService.getStatus());
    alert('Sincronização forçada executada!');
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };
  
  const triggerConfigImport = () => {
    importInputRef.current?.click();
  };
  
  const stats = getStats();
  
  const getSaveStatusIcon = () => {
    switch (saveStatus) {
      case 'saving': return <RotateCw className="w-4 h-4 animate-spin text-blue-400" />;
      case 'saved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Save className="w-4 h-4" />;
    }
  };
  
  const getSaveStatusText = () => {
    switch (saveStatus) {
      case 'saving': return 'Salvando...';
      case 'saved': return 'Salvo!';
      case 'error': return 'Erro ao salvar';
      default: return 'Salvar Configurações';
    }
  };

  return (
    <div className="space-y-8 text-white bg-slate-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Configurações</h1>
        <p className="text-slate-400">Configure seu painel administrativo e configurações de rastreamento</p>
      </div>

      {/* General Settings */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-white">Configurações Gerais</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nome do Site
            </label>
            <input
              type="text"
              value={config.siteName}
              onChange={(e) => updateConfig({ siteName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              URL do Site
            </label>
            <input
              type="url"
              value={config.siteUrl}
              onChange={(e) => updateConfig({ siteUrl: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Fuso Horário
            </label>
            <select
              value={config.timezone}
              onChange={(e) => updateConfig({ timezone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      {/* API Settings */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-green-600" />
          <h3 className="text-lg font-semibold text-white">Configurações de API</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Chave da API
            </label>
            <div className="flex gap-2">
              <input
                type="password"
                value={config.apiKey}
                readOnly
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-400"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Regenerar
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Use esta chave para acessar a API do EAGLEBOOST Analytics
            </p>
          </div>
        </div>
      </div>

      {/* Tracking Settings */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-white">Configurações de Rastreamento</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">Habilitar Rastreamento</h4>
              <p className="text-sm text-slate-400">Collect visitor analytics and behavior data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.trackingEnabled}
                onChange={(e) => updateConfig({ trackingEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Data Retention (days)
            </label>
            <select
              value={config.dataRetention}
              onChange={(e) => updateConfig({ dataRetention: e.target.value })}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
            >
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Page Metadata Settings */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-orange-600" />
          <h3 className="text-lg font-semibold text-white">Metadados da Página</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Título da Página
            </label>
            <input
              type="text"
              value={config.pageTitle}
              onChange={(e) => updateConfig({ pageTitle: e.target.value })}
              placeholder="Digite o título que aparecerá na aba do navegador"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
            />
            <p className="text-xs text-slate-400 mt-1">
              Este título aparecerá na aba do navegador e nos resultados de busca
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Descrição da Página
            </label>
            <textarea
              value={config.pageDescription}
              onChange={(e) => updateConfig({ pageDescription: e.target.value })}
              placeholder="Descrição que aparecerá nos mecanismos de busca"
              rows={3}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 resize-none"
            />
            <p className="text-xs text-slate-400 mt-1">
              Meta descrição para SEO (recomendado: 150-160 caracteres)
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Favicon URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={config.faviconUrl}
                onChange={(e) => updateConfig({ faviconUrl: e.target.value })}
                placeholder="/favicon.ico ou URL completa"
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
              <input
                 ref={fileInputRef}
                 type="file"
                 accept=".ico,.png,.svg,.jpg,.jpeg,.gif"
                 onChange={handleFaviconUpload}
                 className="hidden"
               />
               <button 
                 onClick={triggerFileUpload}
                 disabled={isUploading}
                 className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-400 flex items-center gap-2"
               >
                 {isUploading ? (
                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                 ) : (
                   <Upload className="w-4 h-4" />
                 )}
                 {isUploading ? 'Enviando...' : 'Upload'}
               </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ícone que aparece na aba do navegador (formato .ico, .png ou .svg)
            </p>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-yellow-600" />
          <h3 className="text-lg font-semibold text-white">Notifications</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">Email Notifications</h4>
              <p className="text-sm text-slate-400">Receive daily reports and alerts via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.emailNotifications}
                onChange={(e) => updateConfig({ emailNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Slack Webhook URL
            </label>
            <input
              type="url"
              value={config.slackWebhook}
              onChange={(e) => updateConfig({ slackWebhook: e.target.value })}
              placeholder="https://hooks.slack.com/services/..."
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
            />
            <p className="text-xs text-slate-400 mt-1">
              Receive real-time notifications in your Slack channel
            </p>
          </div>
        </div>
      </div>

      {/* Seção de Gerenciamento de Configurações */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-white">Gerenciamento de Configurações</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Status de Sincronização */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Status de Sincronização</h4>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                syncStatus.isActive ? 'bg-green-400' : 'bg-red-400'
              }`}></div>
              <span className="text-sm text-white">
                {syncStatus.isActive ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
               Última sincronização: {new Date(syncStatus.lastSyncTime).toLocaleString('pt-BR')}
             </p>
            <button
              onClick={handleForceSync}
              className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Forçar Sincronização
            </button>
          </div>
          
          {/* Estatísticas */}
          <div className="bg-slate-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Estatísticas</h4>
            <div className="space-y-1 text-xs text-slate-400">
               <div>Listeners ativos: {stats.listenersCount}</div>
               <div>Última atualização: {new Date(stats.lastUpdated).toLocaleString('pt-BR')}</div>
               <div>Versão: {stats.configVersion}</div>
               <div>Auto-sync: {stats.autoSyncEnabled ? 'Ativo' : 'Inativo'}</div>
               <div>Backup: {stats.backupEnabled ? 'Ativo' : 'Inativo'}</div>
             </div>
          </div>
        </div>
        
        {/* Botões de Ação */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleConfigExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
          >
            <FileText className="w-4 h-4" />
            Exportar Configurações
          </button>
          
          <button
            onClick={triggerConfigImport}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-sm"
          >
            <Upload className="w-4 h-4" />
            Importar Configurações
          </button>
          
          <button
            onClick={handleResetConfig}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            Resetar Configurações
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saveStatus === 'saving'}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
            saveStatus === 'saving' 
              ? 'bg-blue-500 cursor-not-allowed' 
              : saveStatus === 'saved'
              ? 'bg-green-600 hover:bg-green-700'
              : saveStatus === 'error'
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {getSaveStatusIcon()}
          {getSaveStatusText()}
        </button>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={importInputRef}
        type="file"
        accept=".json"
        onChange={handleConfigImport}
        className="hidden"
      />
    </div>
  );
};
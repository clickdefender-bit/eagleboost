import { useState, useEffect } from 'react';

// Interface para as credenciais de autenticação
interface AdminCredentials {
  username: string;
  password: string;
}

// Credenciais padrão (você pode alterar conforme necessário)
const DEFAULT_CREDENTIALS: AdminCredentials = {
  username: 'admin',
  password: 'eagleboost123'
};

class AuthService {
  private storageKey = 'admin_auth';
  private tokenKey = 'admin_token';
  private credentials: AdminCredentials;

  constructor() {
    this.credentials = this.loadCredentials();
  }

  // Carrega credenciais do localStorage ou usa padrão
  private loadCredentials(): AdminCredentials {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored) as AdminCredentials;
      }
    } catch (error) {
      console.warn('Falha ao carregar credenciais:', error);
    }
    
    // Se não existir, salva as credenciais padrão
    this.saveCredentials(DEFAULT_CREDENTIALS);
    return DEFAULT_CREDENTIALS;
  }

  // Salva credenciais no localStorage
  private saveCredentials(credentials: AdminCredentials): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(credentials));
    } catch (error) {
      console.error('Falha ao salvar credenciais:', error);
    }
  }

  // Verifica se as credenciais são válidas
  public login(username: string, password: string): boolean {
    if (username === this.credentials.username && password === this.credentials.password) {
      // Gera um token simples (em produção, use algo mais seguro)
      const token = `${username}_${Date.now()}`;
      localStorage.setItem(this.tokenKey, token);
      return true;
    }
    return false;
  }

  // Verifica se o usuário está autenticado
  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  // Faz logout do usuário
  public logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Atualiza as credenciais
  public updateCredentials(username: string, password: string): void {
    const newCredentials = { username, password };
    this.credentials = newCredentials;
    this.saveCredentials(newCredentials);
  }
}

// Instância global do serviço de autenticação
export const authService = new AuthService();

// Hook para usar o serviço de autenticação em componentes React
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    // Verifica autenticação quando o componente monta
    checkAuth();

    // Adiciona listener para mudanças de armazenamento (para sincronizar entre abas)
    window.addEventListener('storage', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return {
    isAuthenticated,
    login: (username: string, password: string) => {
      const result = authService.login(username, password);
      setIsAuthenticated(result);
      return result;
    },
    logout: () => {
      authService.logout();
      setIsAuthenticated(false);
    },
    updateCredentials: authService.updateCredentials.bind(authService)
  };
};
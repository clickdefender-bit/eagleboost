import React from 'react';

// Sistema de Timer baseado no vídeo principal
interface TimerConfig {
  enabled: boolean;
  unlockTimeMinutes: number;
  unlockTimeSeconds: number;
  totalUnlockSeconds: number;
}

interface TimerState {
  isUnlocked: boolean;
  currentTime: number;
  timeRemaining: number;
}

class VideoTimer {
  private config: TimerConfig | null = null;
  private state: TimerState = {
    isUnlocked: false,
    currentTime: 0,
    timeRemaining: 0
  };
  private listeners: Array<(state: TimerState) => void> = [];
  private interval: NodeJS.Timeout | null = null;
  private startTime: number = 0;

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    // Listen for timer configuration from page timer
    window.addEventListener('pageTimerConfig', (event: CustomEvent) => {
      this.config = event.detail;
      this.resetTimer();
    });

    // Listen for video interactions
    window.addEventListener('videoPlay', () => {
      this.startTimer();
    });

    window.addEventListener('videoPause', () => {
      this.pauseTimer();
    });

    // Auto-start timer when page loads (simulating video start)
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.startTimer();
      }, 2000); // Start after 2 seconds
    });
  }

  private resetTimer() {
    if (!this.config || !this.config.enabled || (this.config.unlockTimeMinutes === 0 && this.config.unlockTimeSeconds === 0)) {
      this.state.isUnlocked = true;
      this.notifyListeners();
      return;
    }

    this.state = {
      isUnlocked: false,
      currentTime: 0,
      timeRemaining: this.config.totalUnlockSeconds
    };
    
    this.notifyListeners();
  }

  private startTimer() {
    if (!this.config || !this.config.enabled || this.state.isUnlocked) {
      return;
    }

    this.startTime = Date.now() - (this.state.currentTime * 1000);
    
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private pauseTimer() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private updateTimer() {
    if (!this.config || this.state.isUnlocked) {
      return;
    }

    const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
    this.state.currentTime = elapsed;
    this.state.timeRemaining = Math.max(0, this.config.totalUnlockSeconds - elapsed);

    if (this.state.timeRemaining <= 0) {
      this.state.isUnlocked = true;
      this.pauseTimer();
      
      // Dispatch unlock event
      window.dispatchEvent(new CustomEvent('contentUnlocked'));
    }

    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (state: TimerState) => void): () => void {
    this.listeners.push(listener);
    
    // Immediately notify with current state
    listener(this.state);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  public getState(): TimerState {
    return { ...this.state };
  }

  public forceUnlock(): void {
    this.state.isUnlocked = true;
    this.pauseTimer();
    this.notifyListeners();
    window.dispatchEvent(new CustomEvent('contentUnlocked'));
  }

  public isContentUnlocked(): boolean {
    if (!this.config || !this.config.enabled) {
      return true;
    }
    return this.state.isUnlocked;
  }

  public getTimeRemaining(): string {
    const minutes = Math.floor(this.state.timeRemaining / 60);
    const seconds = this.state.timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Global instance
export const videoTimer = new VideoTimer();

// React hook for using the timer
export const useVideoTimer = () => {
  const [timerState, setTimerState] = React.useState<TimerState>(videoTimer.getState());

  React.useEffect(() => {
    const unsubscribe = videoTimer.subscribe(setTimerState);
    return unsubscribe;
  }, []);

  return {
    ...timerState,
    timeRemainingFormatted: videoTimer.getTimeRemaining(),
    forceUnlock: () => videoTimer.forceUnlock(),
    isContentUnlocked: videoTimer.isContentUnlocked()
  };
};

export type { TimerState, TimerConfig };